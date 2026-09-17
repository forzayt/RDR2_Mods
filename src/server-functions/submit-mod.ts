import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  title: z.string().trim().min(3).max(100),
  category: z.enum(["Weapons", "Horses", "Towns", "Landscapes", "Characters"]),
  version: z.string().trim().min(1).max(30),
  summary: z.string().trim().min(10).max(140),
  description: z.string().trim().min(20).max(10_000),
  repositoryUrl: z.string().trim().url().max(300),
  thumbnailUrl: z.string().trim().url().max(1_000),
});

function parseGithubRepository(value: string) {
  const url = new URL(value);
  const parts = url.pathname.replace(/\/$/, "").split("/").filter(Boolean);

  if (url.protocol !== "https:" || url.hostname !== "github.com" || parts.length !== 2) {
    throw new Error("Enter a direct GitHub repository URL.");
  }

  return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
}

function validateThumbnailUrl(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:") {
    throw new Error("The thumbnail must use a public HTTPS URL.");
  }
}

export const submitModIssue = createServerFn({ method: "POST" })
  .validator(submissionSchema)
  .handler(async ({ data }) => {
    const token = process.env.GITHUB_SUBMISSION_TOKEN;
    const targetOwner = process.env.GITHUB_TARGET_OWNER;
    const targetRepo = process.env.GITHUB_TARGET_REPO;

    if (!token || !targetOwner || !targetRepo) {
      throw new Error("GitHub submission is not configured yet.");
    }

    const source = parseGithubRepository(data.repositoryUrl);
    validateThumbnailUrl(data.thumbnailUrl);

    const headers = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "saddle-market-mod-submissions",
    };

    const repositoryResponse = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(source.owner)}/${encodeURIComponent(source.repo)}`,
      { headers },
    );

    if (repositoryResponse.status === 404) {
      throw new Error("That GitHub repository does not exist or is not publicly accessible.");
    }
    if (!repositoryResponse.ok) {
      throw new Error("GitHub could not validate the mod repository. Please try again.");
    }

    const issueBody = [
      "## Mod submission",
      "",
      `- **Title:** ${data.title}`,
      `- **Category:** ${data.category}`,
      `- **Version:** ${data.version}`,
      `- **Repository:** ${data.repositoryUrl}`,
      `- **Thumbnail:** ${data.thumbnailUrl}`,
      "",
      "### Summary",
      data.summary,
      "",
      "### Description",
      data.description,
      "",
      "---",
      "Submitted through the Saddle Market upload form.",
    ].join("\n");

    const issueResponse = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/issues`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ title: `[Mod submission] ${data.title}`, body: issueBody }),
      },
    );

    if (!issueResponse.ok) {
      if (issueResponse.status === 401 || issueResponse.status === 403) {
        throw new Error("The GitHub submission token is missing the Issues: write permission.");
      }
      throw new Error("GitHub could not create the submission issue. Please try again.");
    }

    const issue = (await issueResponse.json()) as { html_url: string; number: number };
    return { issueUrl: issue.html_url, issueNumber: issue.number };
  });
