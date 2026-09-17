import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const submissionSchema = z.object({
  title: z.string().trim().min(3).max(100),
  summary: z.string().trim().min(10).max(140),
  description: z.string().trim().min(20).max(10_000),
  repositoryUrl: z.string().trim().url().max(300),
  thumbnailDataUrl: z.string().max(7_100_000),
});

function parseGithubRepository(value: string) {
  const url = new URL(value);
  const parts = url.pathname.replace(/\/$/, "").split("/").filter(Boolean);

  if (url.protocol !== "https:" || url.hostname !== "github.com" || parts.length !== 2) {
    throw new Error("Enter a direct GitHub repository URL.");
  }

  return { owner: parts[0], repo: parts[1].replace(/\.git$/, "") };
}

function parseThumbnail(value: string) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(value);
  if (!match) throw new Error("Upload a JPG, PNG, or WebP thumbnail.");

  const [, mimeType, content] = match;
  const bytes = Buffer.from(content, "base64");
  if (bytes.length === 0 || bytes.length > 5 * 1024 * 1024) {
    throw new Error("The thumbnail must be smaller than 5 MB.");
  }

  const isJpeg = mimeType === "image/jpeg" && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = mimeType === "image/png" && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const isWebp = mimeType === "image/webp" && bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
  if (!isJpeg && !isPng && !isWebp) throw new Error("The thumbnail file content is not a valid image.");

  const extension = mimeType === "image/jpeg" ? "jpg" : mimeType.split("/")[1];
  return { content, extension };
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
    const thumbnail = parseThumbnail(data.thumbnailDataUrl);

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

    const targetRepositoryResponse = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}`,
      { headers },
    );
    if (!targetRepositoryResponse.ok) {
      throw new Error("GitHub could not access the configured submissions repository.");
    }

    const targetRepository = (await targetRepositoryResponse.json()) as { default_branch: string };
    const assetBranch = "submission-assets";
    const assetRefUrl = `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/git/ref/heads/${assetBranch}`;
    const assetRefResponse = await fetch(assetRefUrl, { headers });

    if (assetRefResponse.status === 404) {
      const defaultRefResponse = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/git/ref/heads/${encodeURIComponent(targetRepository.default_branch)}`,
        { headers },
      );
      if (!defaultRefResponse.ok) throw new Error("GitHub could not prepare thumbnail storage.");

      const defaultRef = (await defaultRefResponse.json()) as { object: { sha: string } };
      const createRefResponse = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/git/refs`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ ref: `refs/heads/${assetBranch}`, sha: defaultRef.object.sha }),
        },
      );
      if (!createRefResponse.ok && createRefResponse.status !== 422) {
        throw new Error("GitHub could not create thumbnail storage. Check the Contents permission.");
      }
    } else if (!assetRefResponse.ok) {
      throw new Error("GitHub could not access thumbnail storage.");
    }

    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "mod";
    const assetPath = `submission-thumbnails/${slug}-${crypto.randomUUID()}.${thumbnail.extension}`;
    const uploadResponse = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/contents/${assetPath}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify({
          message: `Add thumbnail for ${data.title}`,
          content: thumbnail.content,
          branch: assetBranch,
        }),
      },
    );
    if (!uploadResponse.ok) {
      if (uploadResponse.status === 401 || uploadResponse.status === 403) {
        throw new Error("The GitHub token needs the Contents: write permission to upload thumbnails.");
      }
      throw new Error("GitHub could not upload the thumbnail. Please try again.");
    }

    const thumbnailUrl = `https://raw.githubusercontent.com/${encodeURIComponent(targetOwner)}/${encodeURIComponent(targetRepo)}/${assetBranch}/${assetPath}`;

    const issueBody = [
      "## Mod submission",
      "",
      `![${data.title} thumbnail](${thumbnailUrl})`,
      "",
      `- **Title:** ${data.title}`,
      `- **Repository:** ${data.repositoryUrl}`,
      `- **Thumbnail:** ${thumbnailUrl}`,
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
