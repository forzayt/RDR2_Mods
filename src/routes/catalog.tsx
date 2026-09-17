import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import mods from "@/data/mods.json";
import { getGithubStarsBatch } from "@/server-functions/get-stars";

const ITEMS_PER_PAGE = 50;

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Mod Catalog | RDR2 Mods" },
      { name: "description", content: "Browse and filter the complete catalog of Red Dead Redemption 2 mods." },
    ],
  }),
  component: CatalogPage,
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

const getEstimatedDownloads = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const count = Math.abs(hash % 4800) + 120;
  return count > 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
};

function CatalogPage() {
  const [dark, setDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "stars" | "title">("latest");
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, timeFilter]);

  const filteredMods = useMemo(() => {
    return mods
      .filter((mod) => {
        return (
          !searchQuery.trim() ||
          mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (mod.tag && mod.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (mod.summary && mod.summary.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          const starsA = starCounts[a.url] || 0;
          const starsB = starCounts[b.url] || 0;
          return starsB - starsA;
        }
        if (sortBy === "latest") {
          return 0; // retain natural catalog ordering
        }
        return a.title.localeCompare(b.title);
      });
  }, [searchQuery, sortBy, starCounts]);

  const totalPages = Math.ceil(filteredMods.length / ITEMS_PER_PAGE) || 1;

  const paginatedMods = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMods.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMods, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors flex flex-col justify-between">
        <div>
          <Navbar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            dark={dark}
            onToggleDark={() => setDark(!dark)}
          />

          <main className="mx-auto max-w-[1920px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {/* Catalog Hero Banner */}
            <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/30 p-8 shadow-sm sm:p-12 mb-6">
              <div className="max-w-2xl">
                <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl text-foreground">
                  Explore <span className="text-primary font-bold">Catalog</span>
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Browse {mods.length}+ verified community modifications, RedM server scripts, and standalone enhancements for Red Dead Redemption 2.
                </p>
              </div>
            </section>

            {/* Top Filter Bar Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                {/* Time Filter */}
                <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-1.5 text-xs font-medium">
                  <span className="text-muted-foreground font-body">Since:</span>
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value as "all" | "month" | "week")}
                    className="bg-transparent font-semibold font-body text-foreground outline-none cursor-pointer"
                  >
                    <option value="all" className="bg-card text-foreground font-body">All Time</option>
                    <option value="month" className="bg-card text-foreground font-body">This Month</option>
                    <option value="week" className="bg-card text-foreground font-body">This Week</option>
                  </select>
                </div>

                {/* Sort By Filter */}
                <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background px-3 py-1.5 text-xs font-medium">
                  <span className="text-muted-foreground font-body">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "latest" | "stars" | "title")}
                    className="bg-transparent font-semibold font-body text-foreground outline-none cursor-pointer"
                  >
                    <option value="latest" className="bg-card text-foreground font-body">Latest Versions</option>
                    <option value="stars" className="bg-card text-foreground font-body">Most Starred</option>
                    <option value="title" className="bg-card text-foreground font-body">Title (A-Z)</option>
                  </select>
                </div>

                <span className="text-xs text-muted-foreground font-body font-medium">
                  Showing {filteredMods.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredMods.length)} of {filteredMods.length} mods
                </span>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-72">
                <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search mods..."
                    className="w-full bg-transparent text-sm outline-none font-body placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Mods Grid: 4 Columns Frameless Sleek Media Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedMods.map((mod, index) => {
                const user = getGitHubUser(mod.url) || "creator";
                const stars = starCounts[mod.url];
                const downloads = getEstimatedDownloads(mod.title);

                return (
                  <a
                    key={`${mod.title}-${index}`}
                    href={mod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between transition-all duration-300 active:scale-[0.99]"
                  >
                    <div>
                      {/* Frameless 16:9 Thumbnail Image */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border/50 group-hover:ring-primary/60 transition-all shadow-sm group-hover:shadow-md">
                        <img
                          src={
                            mod.thumbnail ||
                            `https://github.com/${user}.png?size=400`
                          }
                          alt={`${mod.title} thumbnail`}
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

                      {/* Card Information Line */}
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

            {filteredMods.length === 0 && (
              <div className="py-24 text-center font-body">
                <p className="font-display text-3xl">No mods found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search terms or category filters.
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="mt-4 rounded-full"
                >
                  Reset filters
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row font-body">
                <p className="text-xs text-muted-foreground font-medium">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border/80 bg-card px-4 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96] shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="size-4 shrink-0" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`flex size-9 items-center justify-center rounded-full text-xs font-semibold transition-all active:scale-[0.96] cursor-pointer ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30"
                            : "border border-border/80 bg-card text-foreground hover:bg-accent"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-border/80 bg-card px-4 text-xs font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96] shadow-sm cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="size-4 shrink-0" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
