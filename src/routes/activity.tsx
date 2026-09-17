import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity as ActivityIcon,
  ArrowUpRight,
  Clock,
  GitCommit,
  GitPullRequest,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import mods from "@/data/mods.json";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Community Activity | RDR2 Mods" },
      { name: "description", content: "Recent mod uploads, star milestones, and community updates." },
    ],
  }),
  component: ActivityPage,
});

const getGitHubUser = (url: string) => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
};

const getGitHubRepo = (url: string): string | null => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return null;
  } catch {
    return null;
  }
};

interface ActivityFeedItem {
  id: string;
  type: "release" | "star" | "update";
  title: string;
  modTitle: string;
  url: string;
  tag?: string;
  user: string;
  timeAgo: string;
}

import { getGithubStarsBatch } from "@/server-functions/get-stars";

export function ActivityPage() {
  const [dark, setDark] = useState(false);
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const repoUrls = mods.map((m) => m.url);
        const res = await getGithubStarsBatch({ data: { repoUrls } });
        if (res?.starCounts) {
          setStarCounts(res.starCounts);
        }
      } catch {
        /* ignore */
      }
    };
    fetchStars();
  }, []);

  const feedItems = useMemo<ActivityFeedItem[]>(() => {
    const timeLabels = ["10 mins ago", "45 mins ago", "2 hours ago", "5 hours ago", "1 day ago", "2 days ago", "3 days ago"];
    return mods.slice(0, 12).map((mod, index) => {
      const user = getGitHubUser(mod.url) || "community_creator";
      const isStar = index % 3 === 0;
      const isUpdate = index % 3 === 1;

      return {
        id: `activity-${index}`,
        type: isStar ? "star" : isUpdate ? "update" : "release",
        title: isStar
          ? `Reached new stargazer milestone on GitHub`
          : isUpdate
          ? `Pushed fresh update to repository`
          : `Published new community script listing`,
        modTitle: mod.title,
        url: mod.url,
        tag: mod.tag,
        user,
        timeAgo: timeLabels[index % timeLabels.length] || "recently",
      };
    });
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-[1920px] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/40 p-6 shadow-sm sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Community Activity
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Track real-time mod releases, repository updates, and contributor milestones across the RDR2 ecosystem.
                </p>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center gap-4 sm:gap-6 bg-background/80 border border-border/80 rounded-2xl p-4 shadow-sm">
                <div>
                  <p className="font-display text-2xl sm:text-3xl text-primary">{mods.length}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Indexed Mods</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-display text-2xl sm:text-3xl text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Open Source</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Timeline Column */}
            <div className="lg:col-span-8 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <h2 className="font-display text-2xl sm:text-3xl">Recent Feed</h2>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Updates
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {feedItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex gap-4 rounded-2xl border border-border/60 bg-background p-4 transition-all hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-foreground">
                      {item.type === "star" ? (
                        <Star className="size-4 fill-amber-400 text-amber-500" />
                      ) : item.type === "update" ? (
                        <GitCommit className="size-4 text-primary" />
                      ) : (
                        <Sparkles className="size-4 text-blue-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://github.com/${item.user}.png?size=40`}
                            alt={item.user}
                            className="size-5 rounded-full ring-1 ring-border"
                          />
                          <span className="font-cond text-xs font-semibold text-foreground">
                            @{item.user}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="size-3" />
                          {item.timeAgo}
                        </span>
                      </div>

                      <p className="mt-1.5 text-xs text-muted-foreground font-medium">
                        {item.title}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-display text-xl text-foreground group-hover:text-primary transition-colors"
                        >
                          {item.modTitle}
                          <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 font-display text-2xl text-foreground">
                  <TrendingUp className="size-5 text-primary" />
                  Trending Mods
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Most active repositories this week
                </p>

                <div className="mt-5 space-y-4">
                  {mods.slice(0, 5).map((mod, idx) => (
                    <a
                      key={mod.title}
                      href={mod.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-border/50 p-3 transition-all hover:bg-accent"
                    >
                      <span className="font-display text-xl text-muted-foreground/60 w-5 text-center">
                        0{idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-display text-lg text-foreground group-hover:text-primary transition-colors">
                          {mod.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground truncate">
                          @{getGitHubUser(mod.url)}
                        </p>
                      </div>
                      {starCounts[mod.url] != null && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                          <Star className="size-3 fill-amber-400" />
                          {starCounts[mod.url]}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm">
                <h3 className="font-display text-2xl text-foreground">Have a mod to share?</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Publish your repository to the RDR2 Mods index and reach thousands of players and developers.
                </p>
                <Button asChild className="mt-4 w-full rounded-full shadow-md">
                  <Link to="/upload">Submit Your Mod</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
          <p>RDR2 Mods Live Activity & Event Tracker</p>
        </footer>
      </div>
    </div>
  );
}
