import { Link, createFileRoute } from "@tanstack/react-router";
import { Moon, Search, Sun, Upload } from "lucide-react";
import { useMemo, useState } from "react";

const featuredVideoUrl = "https://rumble.com/hls-vod/vXOI5btQ6rU/playlist.m3u8";
import { Button } from "@/components/ui/button";
import mods from "@/data/mods.json";

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

function Index() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");

  const visibleMods = useMemo(() => {
    if (!query.trim()) return mods;
    const q = query.toLowerCase();
    return mods.filter(
      (mod) =>
        mod.title.toLowerCase().includes(q) ||
        mod.summary.toLowerCase().includes(q) ||
        mod.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <header className="sticky top-0 z-30 border-b border-border bg-surface-glass backdrop-blur-xl">
          <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:flex sm:px-6">
            <a href="#catalog" className="font-display text-2xl text-foreground">
              RDR2<span className="text-primary">·</span>Mods
            </a>
            <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
              <label className="hidden h-9 items-center gap-2 rounded-full bg-surface-glass px-3 ring-1 ring-border md:flex">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <input aria-label="Search mods" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mods" className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
              <Button asChild size="compact" className="transition-[color,background-color,transform] active:scale-[0.96]">
                <Link to="/upload" aria-label="Upload mod">
                  <Upload className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Upload mod</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to day mode" : "Switch to night mode"} title={dark ? "Day mode" : "Night mode"}>
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 sm:pt-6">
          <section className="rise relative min-h-[410px] overflow-hidden rounded-xl ring-1 ring-border sm:min-h-[420px]">
            <video
                
                loop
                preload="auto"
                playsInline
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source
                  src={featuredVideoUrl}
                  type="video/mp4"
                />
              </video>
            <div className="absolute inset-0 bg-gradient-to-t from-hero/80 via-hero/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:p-7">
              <div className="max-w-2xl min-w-0">
                <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase text-primary-foreground">Featured</span>
                <h1 className="mt-2 font-display text-5xl leading-none text-hero-foreground sm:text-6xl">The Ridge Line</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-hero-foreground/85 sm:text-base">A sweeping landscape overhaul with volumetric dawn light, redrawn ridgelines, and a rebuilt river valley.</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-cond text-sm uppercase text-hero-foreground/70">
                  <span className="text-hero-foreground">by Meridian Forge</span><span>★ 4.9</span><span>184.3k downloads</span><span>Updated Feb 09</span>
                </div>
              </div>
              <Button variant="paper">View mod</Button>
            </div>
          </section>

          <section id="catalog" className="mt-6 scroll-mt-24">
            <div className="mb-4 flex items-center gap-3 md:hidden">
              <label className="flex h-10 flex-1 items-center gap-2 rounded-full bg-surface-glass px-4 ring-1 ring-border">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <input aria-label="Search mods" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mods" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {visibleMods.map((mod, index) => (
                <a
                  key={`${mod.title}-${index}`}
                  href={mod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rise group block min-w-0"
                  style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                    <img
                      src={mod.thumbnail}
                      alt={`${mod.title} mod preview`}
                      width={912}
                      height={736}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-3 px-0.5">
                    <div className="flex items-center gap-2">
                      <h2 className="min-w-0 truncate font-display text-2xl text-foreground">{mod.title}</h2>
                      {(() => {
                        const user = getGitHubUser(mod.url);
                        if (!user) return null;
                        return (
                          <div className="ml-auto flex shrink-0 items-center gap-1.5">
                            <img
                              src={`https://github.com/${user}.png?size=40`}
                              alt={user}
                              width={20}
                              height={20}
                              loading="lazy"
                              className="size-5 rounded-full ring-1 ring-border"
                            />
                            <span className="font-cond text-xs text-muted-foreground">@{user}</span>
                          </div>
                        );
                      })()}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{mod.summary}</p>
                    <div className="mt-2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </div>
                </a>
              ))}
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
