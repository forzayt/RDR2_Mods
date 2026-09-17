import { Link, useNavigate, createFileRoute } from "@tanstack/react-router";
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Flag,
  Search,
  Share2,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import mods from "@/data/mods.json";
import { getGithubStarsBatch } from "@/server-functions/get-stars";

const ITEMS_PER_PAGE = 50;

const catalogCategories = [
  { id: "all", label: "All Categories" },
  { id: "sp", label: "Single Player (ASI/LML)" },
  { id: "redm", label: "RedM Server Scripts" },
  { id: "graphics", label: "Graphics & Reshade" },
  { id: "outfits", label: "Outfits & Character" },
  { id: "vehicles", label: "Horses & Vehicles" },
  { id: "weapons", label: "Weapons & Arsenal" },
];

export const Route = createFileRoute("/catalog")({
  head: () =>
    generateSeoMeta({
      title: "RDR2 Mods Catalog - Single Player Scripts, RedM & Loaders",
      description: "Filter and explore Red Dead Redemption 2 single player scripts, ASI trainers, LML replacement files, ReShade presets, and RedM server tools.",
      keywords: ["RDR2 Mod Catalog", "RDR2 Mods Download", "Red Dead Redemption 2 Mod List", "Script Hook Mods", "LML Mods Directory"],
      path: "/catalog",
      image: "/rdr2modslg.png",
      jsonLd: [
        SchemaOrg.dataCatalog(),
        SchemaOrg.breadcrumb([
          { name: "Home", item: "/" },
          { name: "Catalog", item: "/catalog" },
        ]),
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

function CatalogPage() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") || params.get("query") || "";
    }
    return "";
  });
  const [sortBy, setSortBy] = useState<"latest" | "stars" | "title">("latest");
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModModal, setSelectedModModal] = useState<{
    title: string;
    url: string;
    user: string;
    thumbnail?: string;
  } | null>(null);

  // Sync searchQuery when URL query parameter changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlQuery = params.get("search") || params.get("query");
      if (urlQuery) {
        setSearchQuery(urlQuery);
      }
    }
  }, []);

  // Local storage persisted state for favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("rdr2_fav_mods");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  useEffect(() => {
    try {
      localStorage.setItem("rdr2_fav_mods", JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

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
  }, [searchQuery, sortBy, timeFilter, favoritesOnly, selectedCategory]);

  const toggleFavorite = (url: string, title?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(url);
      const updated = exists ? prev.filter((u) => u !== url) : [...prev, url];
      showToast(exists ? `Removed ${title || "mod"} from favorites` : `Saved ${title || "mod"} to favorites`);
      return updated;
    });
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("Copied repository URL to clipboard");
  };

  const shareWithFriend = (modTitle: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.rdr2mods.in";
    const refCode = Math.floor(100000 + Math.random() * 900000);
    const shareUrl = `${origin}/catalog?search=${encodeURIComponent(modTitle)}&ref=${refCode}`;
    navigator.clipboard.writeText(shareUrl);
    showToast(`Copied share link for "${modTitle}"!`);
  };

  const reportMod = (modTitle: string) => {
    showToast("Opening report page...");
    navigate({ to: "/contact", search: { subject: `Report: ${modTitle}` } as any });
  };

  const filteredMods = useMemo(() => {
    return mods
      .filter((mod) => {
        const matchesQuery =
          !searchQuery.trim() ||
          mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (mod.tag && mod.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (mod.summary && mod.summary.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFav = !favoritesOnly || favorites.includes(mod.url);

        const modTag = mod.tag ? mod.tag.toLowerCase() : "";
        const matchesCategory =
          selectedCategory === "all" ||
          (selectedCategory === "sp" && (modTag === "sp" || modTag.includes("single"))) ||
          (selectedCategory === "redm" && modTag.includes("redm")) ||
          (selectedCategory === "graphics" && (modTag.includes("graphic") || modTag.includes("reshade") || modTag.includes("enb"))) ||
          (selectedCategory === "outfits" && (modTag.includes("outfit") || modTag.includes("character") || modTag.includes("model"))) ||
          (selectedCategory === "vehicles" && (modTag.includes("vehicle") || modTag.includes("horse") || modTag.includes("train"))) ||
          (selectedCategory === "weapons" && (modTag.includes("weapon") || modTag.includes("gun"))) ||
          modTag === selectedCategory.toLowerCase();

        return matchesQuery && matchesFav && matchesCategory;
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
  }, [searchQuery, sortBy, favoritesOnly, selectedCategory, favorites, starCounts]);

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
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors flex flex-col justify-between relative">
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

            {/* Category Filter Pills Section */}
            <div className="mb-6 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Filter by Category
                </h2>
                <span className="text-xs text-muted-foreground">
                  {catalogCategories.length - 1} Specializations
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {catalogCategories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.96] cursor-pointer ${
                        isActive
                          ? "border border-primary bg-primary/10 text-primary shadow-sm"
                          : "border border-border/80 bg-background text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

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

                {/* Favorites Only Toggle */}
                <button
                  type="button"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold font-body transition-all active:scale-[0.96] cursor-pointer ${
                    favoritesOnly
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border/80 bg-background text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Bookmark className={`size-3.5 ${favoritesOnly ? "fill-primary text-primary" : ""}`} />
                  Favorites ({favorites.length})
                </button>

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

            {/* Mods Grid: 4 Columns Frameless Sleek Media Grid with Right Click Context Menu */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedMods.map((mod, index) => {
                const user = getGitHubUser(mod.url) || "creator";
                const stars = starCounts[mod.url];
                const isFav = favorites.includes(mod.url);

                return (
                  <ContextMenu key={`${mod.title}-${index}`}>
                    <ContextMenuTrigger asChild>
                      <a
                        href={mod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(mod.url, "_blank", "noopener,noreferrer");
                          setSelectedModModal({
                            title: mod.title,
                            url: mod.url,
                            user,
                            thumbnail: mod.thumbnail || `https://github.com/${user}.png?size=400`,
                          });
                        }}
                        className="group flex flex-col justify-between transition-all duration-300 active:scale-[0.99] select-none cursor-pointer"
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

                            {/* Top-Right Favorite Bookmark Toggle */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFavorite(mod.url, mod.title);
                              }}
                              className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 active:scale-[0.90] shadow-sm cursor-pointer"
                              title={isFav ? "Remove from favorites" : "Save to favorites"}
                            >
                              <Bookmark className={`size-3.5 ${isFav ? "fill-primary text-primary" : "text-white/80 hover:text-white"}`} />
                            </button>

                            {/* Overlay Stats Bar Bottom */}
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 py-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                              <span className="flex items-center gap-1 text-amber-300">
                                <Star className="size-3.5 fill-amber-300 text-amber-300" />
                                {stars != null ? stars : "4.9"}
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
                    </ContextMenuTrigger>

                    {/* Custom Right Click Context Menu */}
                    <ContextMenuContent className="w-56 font-body">
                      <ContextMenuLabel className="truncate text-xs font-semibold text-foreground">
                        {mod.title}
                      </ContextMenuLabel>
                      <ContextMenuSeparator />

                      <ContextMenuItem
                        onClick={() => copyUrl(mod.url)}
                        className="cursor-pointer text-xs"
                      >
                        <Copy className="mr-2 size-3.5 text-muted-foreground" />
                        Copy Mod URL
                      </ContextMenuItem>

                      <ContextMenuItem
                        onClick={() => shareWithFriend(mod.title)}
                        className="cursor-pointer text-xs font-medium text-primary focus:text-primary focus:bg-primary/10"
                      >
                        <Share2 className="mr-2 size-3.5 text-primary" />
                        Share with Friend
                      </ContextMenuItem>

                      <ContextMenuItem
                        onClick={() => toggleFavorite(mod.url, mod.title)}
                        className="cursor-pointer text-xs"
                      >
                        <Bookmark className={`mr-2 size-3.5 ${isFav ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                        {isFav ? "Remove from Favorites" : "Save to Favorites"}
                      </ContextMenuItem>

                      <ContextMenuItem
                        onClick={() => window.open(mod.url, "_blank")}
                        className="cursor-pointer text-xs"
                      >
                        <ExternalLink className="mr-2 size-3.5 text-muted-foreground" />
                        Open Repository
                      </ContextMenuItem>

                      <ContextMenuItem
                        onClick={() => window.open(`https://github.com/${user}`, "_blank")}
                        className="cursor-pointer text-xs"
                      >
                        <User className="mr-2 size-3.5 text-muted-foreground" />
                        Open Founder (@{user})
                      </ContextMenuItem>

                      <ContextMenuSeparator />

                      <ContextMenuItem
                        onClick={() => reportMod(mod.title)}
                        className="cursor-pointer text-xs text-red-500 focus:text-red-500 focus:bg-red-500/10 font-medium"
                      >
                        <Flag className="mr-2 size-3.5 text-red-500" />
                        Report this Mod
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })}
            </div>

            {filteredMods.length === 0 && (
              <div className="py-24 text-center font-body">
                <p className="font-display text-3xl">No mods found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {favoritesOnly ? "You haven't saved any mods to your favorites yet." : "Try adjusting your search terms or category filters."}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setFavoritesOnly(false);
                  }}
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

        {/* Floating Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border/80 bg-card/95 px-4 py-2.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
            <Check className="size-4 text-primary" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Centered Thank You Popup Modal */}
        {selectedModModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedModModal(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close thank you modal"
              >
                <X className="size-4" />
              </button>

              {/* Content */}
              <div className="space-y-2 pt-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Thank You for Supporting Creators!
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Thank you for exploring community-authored Red Dead Redemption 2 & RedM modifications. Your support empowers creators to build open-source scripts, custom graphics, and standalone enhancements.
                </p>
              </div>

              {/* Selected Mod Information */}
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/60 p-3 text-left">
                <img
                  src={selectedModModal.thumbnail}
                  alt={selectedModModal.title}
                  className="size-12 rounded-xl object-cover ring-1 ring-border shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-sm font-bold text-foreground truncate">
                    {selectedModModal.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    Created by <span className="font-semibold text-foreground">@{selectedModModal.user}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.open(selectedModModal.url, "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-accent active:scale-[0.96] cursor-pointer"
                >
                  <span>Re-open GitHub Repository</span>
                  <ExternalLink className="size-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModModal(null)}
                  className="rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96] cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
