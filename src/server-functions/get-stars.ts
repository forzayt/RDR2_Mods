import { createServerFn } from "@tanstack/react-start";

export const getGithubStarsBatch = createServerFn({ method: "POST" })
  .validator((data: { repoUrls: string[] }) => data)
  .handler(async ({ data }) => {
    const results: Record<string, number> = {};

    await Promise.allSettled(
      data.repoUrls.map(async (url) => {
        try {
          const parts = new URL(url).pathname.replace(/\/$/, "").split("/").filter(Boolean);
          if (parts.length < 2) return;
          const owner = parts[0];
          const repo = parts[1]?.replace(/\.git$/, "");

          if (!owner || !repo) return;

          // 1. Try REST API
          const headers: Record<string, string> = {
            "User-Agent": "RDR2-Mods-Catalog/1.0",
            Accept: "application/vnd.github+json",
          };
          if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
          }

          const apiRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
          if (apiRes.ok) {
            const json = (await apiRes.json()) as { stargazers_count?: number };
            if (typeof json.stargazers_count === "number") {
              results[url] = json.stargazers_count;
              return;
            }
          }

          // 2. Fallback: Parse GitHub HTML page stargazerCount
          const htmlRes = await fetch(`https://github.com/${owner}/${repo}`, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          });
          if (htmlRes.ok) {
            const htmlText = await htmlRes.text();
            const match = htmlText.match(/"stargazerCount":\s*([0-9]+)/);
            if (match && match[1]) {
              results[url] = parseInt(match[1], 10);
            }
          }
        } catch {
          /* ignore error for individual repo */
        }
      })
    );

    return { starCounts: results };
  });
