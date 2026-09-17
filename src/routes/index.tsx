import { Link, createFileRoute } from "@tanstack/react-router";
import Hls from "hls.js";
import { Download, Moon, Search, Star, Sun, Upload, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Navbar } from "@/components/Navbar";

const featuredVideoUrl = "https://rumble.com/hls-vod/vXOI5btQ6rU/playlist.m3u8";
import { Button } from "@/components/ui/button";
import mods from "@/data/mods.json";

const getEstimatedDownloads = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const count = Math.abs(hash % 4800) + 120;
  return count > 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RDR2 Mods" },
      { name: "description", content: "Discover the best community-made mods for Red Dead Redemption 2." },
      { property: "og:title", content: "RDR2 Mods" },
      { property: "og:description", content: "Discover the best community-made mods for Red Dead Redemption 2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/** Extract GitHub username from a github.com URL */
const getGitHubUser = (url: string) => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
};

/** Extract owner/repo from a github.com URL */
const getGitHubRepo = (url: string): string | null => {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
    return null;
  } catch {
    return null;
  }
};

import { getGithubStarsBatch } from "@/server-functions/get-stars";

function Index() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});

  // Fetch GitHub star counts for all mods
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(featuredVideoUrl);
      hls.attachMedia(video);
      return () => {
        hls.destroy();
      };
    }

    // Safari natively supports HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = featuredVideoUrl;
    }
  }, []);

  const visibleMods = useMemo(() => {
    if (!query.trim()) return mods;
    const q = query.toLowerCase();
    return mods.filter(
      (mod) =>
        mod.title.toLowerCase().includes(q) ||
        (mod.tag && mod.tag.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar
          query={query}
          onQueryChange={setQuery}
          dark={dark}
          onToggleDark={() => setDark((value) => !value)}
        />

        <main className="mx-auto max-w-[1920px] px-4 pb-20 pt-5 sm:px-6 sm:pt-6">
          <section className="rise relative min-h-[460px] overflow-hidden rounded-3xl ring-1 ring-border shadow-2xl flex items-center justify-center text-center sm:min-h-[520px]">
            <video
              ref={videoRef}
              muted
              loop
              preload="auto"
              playsInline
              autoPlay
              className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
            />
            <button
              onClick={() => {
                setMuted((m) => {
                  const next = !m;
                  if (videoRef.current) videoRef.current.muted = next;
                  return next;
                });
              }}
              aria-label={muted ? "Unmute video" : "Mute video"}
              title={muted ? "Unmute" : "Mute"}
              className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-all hover:bg-black/75 active:scale-[0.96]"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/65 backdrop-blur-[1px]" />
            
            <div className="relative z-10 flex max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
              <h1 className="font-display text-5xl leading-tight tracking-wide text-white sm:text-6xl md:text-7xl">
                The Best Place for <span className="text-primary font-bold">RDR2 Mods</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Discover community-created scripts, single-player enhancements, and RedM mods to elevate your Red Dead Redemption 2 experience.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="default" className="rounded-full px-6 shadow-lg shadow-primary/25 active:scale-[0.96]">
                  <a href="#catalog">Browse Catalog</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white px-6 active:scale-[0.96]">
                  <Link to="/upload">Upload Mod</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="catalog" className="mt-6 scroll-mt-24">
            <div className="mb-4 flex items-center gap-3 md:hidden">
              <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-surface-glass px-4 ring-1 ring-border">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <input aria-label="Search mods" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mods" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleMods.map((mod, index) => {
                const user = getGitHubUser(mod.url) || "creator";
                const stars = starCounts[mod.url];
                const downloads = getEstimatedDownloads(mod.title);

                return (
                  <a
                    key={`${mod.title}-${index}`}
                    href={mod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rise group flex flex-col justify-between transition-all duration-300 active:scale-[0.99]"
                    style={{ animationDelay: `${Math.min(index * 30, 200)}ms` }}
                  >
                    <div>
                      {/* Frameless 16:9 Thumbnail Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border/50 group-hover:ring-primary/60 transition-all shadow-sm group-hover:shadow-md">
                        <img
                          src={
                            mod.thumbnail ||
                            `https://github.com/${user}.png?size=400`
                          }
                          alt={`${mod.title} preview`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />

                        {/* Overlay Stats Bar Bottom */}
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 py-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                          <span className="flex items-center gap-1 text-amber-300">
                            <Star className="size-3.5 fill-amber-300 text-amber-300" />
                            {stars != null ? stars : "4.9"}
                          </span>
                          <span className="flex items-center gap-1 text-white/90">
                            <Download className="size-3.5 text-white/80" />
                            {downloads}
                          </span>
                        </div>
                      </div>

                      {/* Card Title & Version */}
                      <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
                        <h3 className="min-w-0 font-display text-xl leading-tight text-foreground truncate group-hover:text-primary transition-colors">
                          {mod.title}
                        </h3>
                        <span className="shrink-0 rounded bg-muted/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground uppercase">
                          v1.0
                        </span>
                      </div>

                      {/* Author Credit */}
                      <div className="mt-1 flex items-center justify-between px-0.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={`https://github.com/${user}.png?size=40`}
                            alt={user}
                            className="size-4 rounded-full ring-1 ring-border"
                          />
                          <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                            @{user}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
            {visibleMods.length === 0 && <div className="py-20 text-center"><p className="font-display text-3xl">No mods found</p><p className="mt-1 text-sm text-muted-foreground">Try another search or category.</p></div>}
          </section>

          <footer className="mt-16 flex flex-col gap-2 border-t border-border pt-5 font-cond text-sm uppercase text-muted-foreground sm:flex-row sm:items-center">
            <span className="font-display text-xl text-foreground">RDR2<span className="text-primary">·</span>Mods</span>
            <span>Community-made RDR2 mods</span><span className="sm:ml-auto">Catalog powered by community</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
