import { createFileRoute } from "@tanstack/react-router";
import { Check, Moon, Search, SlidersHorizontal, Sun } from "lucide-react";
import { useMemo, useState } from "react";

import featuredImage from "@/assets/featured-ridge.jpg";
import bridgeImage from "@/assets/mod-bridge.jpg";
import canyonImage from "@/assets/mod-canyon.jpg";
import dusterImage from "@/assets/mod-duster.jpg";
import mareImage from "@/assets/mod-mare.jpg";
import revolverImage from "@/assets/mod-revolver.jpg";
import riflesImage from "@/assets/mod-rifles.jpg";
import stallionImage from "@/assets/mod-stallion.jpg";
import townImage from "@/assets/mod-town.jpg";
import { Button } from "@/components/ui/button";
import mods from "@/data/mods.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saddle Market | RDR2 Mods" },
      { name: "description", content: "Discover the best community-made mods for Red Dead Redemption 2." },
      { property: "og:title", content: "Saddle Market | RDR2 Mods" },
      { property: "og:description", content: "Discover the best community-made mods for Red Dead Redemption 2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const images: Record<string, string> = {
  revolver: revolverImage,
  mare: mareImage,
  town: townImage,
  duster: dusterImage,
  canyon: canyonImage,
  rifles: riflesImage,
  bridge: bridgeImage,
  stallion: stallionImage,
};

const categories = ["All", "Weapons", "Horses", "Towns", "Landscapes", "Characters"];

const formatDownloads = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}k` : `${value}`;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit" }).format(new Date(`${value}T12:00:00`));

function Index() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"downloads" | "newest" | "rating">("downloads");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const visibleMods = useMemo(() => {
    return mods
      .filter((mod) => category === "All" || mod.category === category)
      .filter((mod) => !verifiedOnly || mod.verified)
      .filter((mod) => `${mod.title} ${mod.author} ${mod.category}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => {
        if (sort === "newest") return b.updated.localeCompare(a.updated);
        if (sort === "rating") return b.rating - a.rating;
        return b.downloads - a.downloads;
      });
  }, [category, query, sort, verifiedOnly]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <header className="sticky top-0 z-30 border-b border-border bg-surface-glass backdrop-blur-xl">
          <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:flex sm:px-6">
            <a href="#catalog" className="font-display text-2xl text-foreground">
              SADDLE<span className="text-primary">·</span>MARKET
            </a>
            <nav className="hidden items-center gap-5 font-cond text-sm uppercase text-muted-foreground lg:flex">
              {categories.slice(1).map((item) => (
                <button key={item} onClick={() => setCategory(item)} className="cursor-pointer hover:text-primary">{item}</button>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
              <label className="hidden h-9 items-center gap-2 rounded-full bg-surface-glass px-3 ring-1 ring-border md:flex">
                <Search className="size-4 text-muted-foreground" aria-hidden="true" />
                <input aria-label="Search mods" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search mods" className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </label>
              <Button variant="ghost" size="icon" onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to day mode" : "Switch to night mode"} title={dark ? "Day mode" : "Night mode"}>
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 sm:pt-6">
          <section className="rise relative min-h-[410px] overflow-hidden rounded-xl ring-1 ring-border sm:min-h-[420px]">
            <img src={featuredImage} alt="A lone rider overlooking a river valley at sunset" width={1600} height={720} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-hero/90 via-hero/15 to-transparent" />
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
            <div className="flex flex-col gap-3 border-b border-border pb-4 lg:flex-row lg:items-center">
              <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
                {categories.map((item) => (
                  <Button key={item} size="compact" variant={category === item ? "active" : "ghost"} onClick={() => setCategory(item)}>{item}</Button>
                ))}
              </div>
              <div className="flex items-center gap-2 lg:ml-auto">
                <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />
                <select aria-label="Sort mods" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="h-8 rounded-full bg-surface-glass px-3 font-cond text-xs uppercase text-foreground ring-1 ring-border outline-none">
                  <option value="downloads">Most downloaded</option><option value="newest">Newest</option><option value="rating">Top rated</option>
                </select>
                <Button size="compact" variant={verifiedOnly ? "active" : "ghost"} onClick={() => setVerifiedOnly((value) => !value)}>
                  {verifiedOnly && <Check className="size-3.5" />} Verified
                </Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {visibleMods.map((mod, index) => (
                <article key={mod.id} className="rise group min-w-0" style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                    <img src={images[mod.image]} alt={`${mod.title} mod preview`} width={912} height={736} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-3 px-0.5">
                    <div className="flex items-center gap-2 font-cond text-xs uppercase text-primary">
                      <span>{mod.category}</span>{mod.verified && <span className="inline-flex items-center gap-1 text-muted-foreground"><Check className="size-3" /> Verified</span>}
                    </div>
                    <h2 className="mt-0.5 truncate font-display text-2xl text-foreground">{mod.title}</h2>
                    <p className="mt-1 truncate font-cond text-sm uppercase text-muted-foreground">by {mod.author}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span className="text-brass">★ {mod.rating}</span><span>{formatDownloads(mod.downloads)} downloads</span><span>{formatDate(mod.updated)}</span></div>
                    <div className="mt-2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </div>
                </article>
              ))}
            </div>
            {visibleMods.length === 0 && <div className="py-20 text-center"><p className="font-display text-3xl">No mods found</p><p className="mt-1 text-sm text-muted-foreground">Try another search or category.</p></div>}
          </section>

          <footer className="mt-16 flex flex-col gap-2 border-t border-border pt-5 font-cond text-sm uppercase text-muted-foreground sm:flex-row sm:items-center">
            <span className="font-display text-xl text-foreground">SADDLE<span className="text-primary">·</span>MARKET</span>
            <span>Community-made RDR2 mods</span><span className="sm:ml-auto">Catalog powered by local JSON</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
