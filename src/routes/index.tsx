import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import Hls from "hls.js";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  ExternalLink,
  FileCode,
  Flag,
  Flame,
  FolderArchive,
  Layers,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  User,
  Volume2,
  VolumeX,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatedContent } from "@/components/reactbits/AnimatedContent";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { generateSeoMeta, SchemaOrg } from "@/lib/seo";
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

const featuredVideoUrl = "https://rumble.com/hls-vod/vXOI5btQ6rU/playlist.m3u8";

const categoryCards = [
  {
    id: "sp",
    title: "Single Player Mods",
    desc: "ASI scripts, trainers, gameplay balance & immersion tweaks.",
    categoryParam: "sp",
    tagMatch: "sp",
    accent: "from-amber-500/10 to-transparent border-amber-500/30 text-amber-500",
    image: "/NicePng_red-beard-png_1934462.png",
    imageClass: "absolute right-0 bottom-0 h-28 sm:h-36 max-w-[42%] object-contain object-bottom pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity scale-90 origin-bottom-right",
  },
  {
    id: "redm",
    title: "RedM Server Scripts",
    desc: "Lua scripts, server frameworks & multiplayer resources.",
    categoryParam: "redm",
    tagMatch: "redm",
    accent: "from-rose-500/10 to-transparent border-rose-500/30 text-rose-500",
    image: "/red-dead-online-blood-money-artwork-png.png",
    imageClass: "absolute right-0 bottom-0 h-36 sm:h-44 max-w-[55%] object-contain object-bottom pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity scale-110 origin-bottom-right",
  },
  {
    id: "tools",
    title: "Modding Utilities",
    desc: "Script Hook, LML, mod managers & core engine loaders.",
    categoryParam: "tools",
    tagMatch: "tools",
    accent: "from-sky-500/10 to-transparent border-sky-500/30 text-sky-500",
    image: "/RedDeadOnline_Artwork_BountyHunter_Expansion_Character_PNG_Transparent.png",
    imageClass: "absolute right-0 bottom-0 h-28 sm:h-36 max-w-[42%] object-contain object-bottom pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity scale-90 origin-bottom-right",
  },
  {
    id: "graphics",
    title: "Graphics & Visuals",
    desc: "ReShade presets, texture mods, weapons & weather enhancements.",
    categoryParam: "graphics",
    tagMatch: "graphics",
    accent: "from-emerald-500/10 to-transparent border-emerald-500/30 text-emerald-500",
    image: "/RedDeadOnline_Artwork_Standalone_Characters_PNG_Transparent.png",
    imageClass: "absolute right-0 bottom-0 h-36 sm:h-44 max-w-[55%] object-contain object-bottom pointer-events-none opacity-50 group-hover:opacity-90 transition-opacity scale-115 origin-bottom-right",
  },
];

const setupGuides = [
  {
    title: "Script Hook RDR2 Setup",
    desc: "Step-by-step guide to installing Alexander Blade's Script Hook and dinput8.dll ASI loader.",
    path: "/guide/scripthook",
    tag: "Essential Loader",
  },
  {
    title: "Lenny's Mod Loader (LML)",
    desc: "How to install replace mods, game data overrides, and texture mods via Mod Manager.",
    path: "/guide/lml",
    tag: "Asset Loader",
  },
  {
    title: "RedM Server Setup",
    desc: "Comprehensive starter guide for deploying custom RedM multiplayer servers.",
    path: "/guide/redm",
    tag: "Multiplayer",
  },
  {
    title: "ReShade Enhancement",
    desc: "Vulkan post-processing injector for ambient occlusion & color grading.",
    path: "/guide/reshade",
    tag: "Graphics",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    generateSeoMeta({
      title: "RDR2 Mods - Red Dead Redemption 2 Single Player & RedM Mods Catalog",
      description: "Explore the ultimate hub for Red Dead Redemption 2 PC mods. Download Script Hook RDR2, Lenny Mod Loader (LML) packages, trainers, ReShade presets, and RedM server scripts.",
      keywords: [
        "RDR2 Mods",
        "Red Dead Redemption 2 PC Mods",
        "RDR2 Script Hook",
        "Alexander Blade Script Hook",
        "Lenny Mod Loader LML",
        "RedM Server Scripts",
        "RDR2 Trainers",
        "RDR2 Graphics Mods",
        "RDR2 Mod Manager",
      ],
      path: "/",
      image: "/banner.png",
      jsonLd: [
        SchemaOrg.website(),
        SchemaOrg.organization(),
        SchemaOrg.faqPage([
          {
            question: "How do I install mods in Red Dead Redemption 2 on PC?",
            answer: "Most RDR2 single-player mods require Alexander Blade's Script Hook RDR2 (and dinput8.dll) to load ASI scripts, or Lenny's Mod Loader (LML) for replace mods and model modifications. Place ASI files directly in your RDR2 main directory and LML mods into the lml folder.",
          },
          {
            question: "Is modding Red Dead Redemption 2 safe for Single Player?",
            answer: "Yes, modding Red Dead Redemption 2 in single-player mode is widely practiced. However, you must remove all mod files before attempting to play Red Dead Online to prevent automatic ban enforcement by Rockstar Games.",
          },
          {
            question: "What is RedM?",
            answer: "RedM is a custom multiplayer modification framework for Red Dead Redemption 2 that allows players to join dedicated roleplay and custom multiplayer servers.",
          },
        ]),
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

/** Get human badge label for mod tags */
const getTagBadge = (tag?: string) => {
  if (!tag) return "ASI Mod";
  const t = tag.toLowerCase();
  if (t === "redm") return "RedM Script";
  if (t === "graphics") return "ReShade";
  if (t === "sp") return "Single Player";
  if (t === "outfits") return "Outfits";
  if (t === "vehicles") return "Vehicles";
  if (t === "weapons") return "Weapons";
  return tag.toUpperCase();
};

interface ModCardProps {
  mod: (typeof mods)[0];
  index: number;
  stars?: number;
  isFav: boolean;
  onToggleFavorite: (url: string, title?: string) => void;
  onCopyUrl: (url: string) => void;
  onShareWithFriend: (title: string) => void;
  onReportMod: (title: string) => void;
  onOpenModModal: (mod: { title: string; url: string; user: string; thumbnail?: string }) => void;
}

function ModCard({
  mod,
  index,
  stars,
  isFav,
  onToggleFavorite,
  onCopyUrl,
  onShareWithFriend,
  onReportMod,
  onOpenModModal,
}: ModCardProps) {
  const user = getGitHubUser(mod.url) || "creator";
  const badgeText = getTagBadge(mod.tag);

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
            onOpenModModal({
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
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border/50 group-hover:ring-primary/60 transition-all">
              <img
                src={mod.thumbnail || `https://github.com/${user}.png?size=400`}
                alt={`${mod.title} preview`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />

              {/* Tag Badge Top Left */}
              <div className="absolute left-2 top-2 z-10 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-sm border border-white/10">
                {badgeText}
              </div>

              {/* Top-Right Favorite Bookmark Toggle */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite(mod.url, mod.title);
                }}
                className="absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/90 active:scale-[0.90] shadow-sm cursor-pointer"
                title={isFav ? "Remove from favorites" : "Save to favorites"}
              >
                <Bookmark className={`size-3.5 ${isFav ? "fill-primary text-primary" : "text-white/80 hover:text-white"}`} />
              </button>

              {/* Overlay Stats Bar Bottom */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 py-1.5 text-white text-xs font-semibold backdrop-blur-[1px]">
                <span className="flex items-center gap-1 text-amber-300 font-mono text-[11px]">
                  <Star className="size-3.5 fill-amber-300 text-amber-300" />
                  {stars != null ? stars : "4.9"}
                </span>
                <span className="text-[10px] font-mono font-medium text-white/80 uppercase">
                  Verified
                </span>
              </div>
            </div>

            {/* Card Title & Version */}
            <div className="mt-3 flex items-start justify-between gap-2 px-0.5">
              <h3 className="min-w-0 font-display text-lg leading-tight font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {mod.title}
              </h3>
              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono font-semibold text-muted-foreground uppercase">
                v1.0
              </span>
            </div>

            {/* Author Credit */}
            <div className="mt-2 flex items-center justify-between px-0.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 min-w-0">
                <img
                  src={`https://github.com/${user}.png?size=40`}
                  alt={user}
                  className="size-4 rounded-full ring-1 ring-border shrink-0"
                />
                <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors truncate">
                  @{user}
                </span>
              </div>
              <span className="text-[11px] font-medium text-primary hover:underline shrink-0 flex items-center gap-0.5">
                View <ArrowRight className="size-3" />
              </span>
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
          onClick={() => onCopyUrl(mod.url)}
          className="cursor-pointer text-xs"
        >
          <Copy className="mr-2 size-3.5 text-muted-foreground" />
          Copy Mod URL
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => onShareWithFriend(mod.title)}
          className="cursor-pointer text-xs font-medium text-primary focus:text-primary focus:bg-primary/10"
        >
          <Share2 className="mr-2 size-3.5 text-primary" />
          Share with Friend
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => onToggleFavorite(mod.url, mod.title)}
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
          Open Creator (@{user})
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => onReportMod(mod.title)}
          className="cursor-pointer text-xs text-red-500 focus:text-red-500 focus:bg-red-500/10 font-medium"
        >
          <Flag className="mr-2 size-3.5 text-red-500" />
          Report this Mod
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function Index() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"featured" | "starred" | "redm" | "sp">("featured");
  const videoRef = useRef<HTMLVideoElement>(null);
  const featuredScrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [starCounts, setStarCounts] = useState<Record<string, number>>({});
  const [selectedModModal, setSelectedModModal] = useState<{
    title: string;
    url: string;
    user: string;
    thumbnail?: string;
  } | null>(null);

  // Auto smooth scrolling effect for featured mods carousel
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      const el = featuredScrollRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 344, behavior: "smooth" });
      }
    }, 2600);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Favorites state
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
    navigate({ to: "/report", search: { mod: modTitle } as any });
  };

  const scrollFeatured = (direction: "left" | "right") => {
    if (featuredScrollRef.current) {
      const scrollAmount = direction === "left" ? -344 : 344;
      featuredScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = featuredVideoUrl;
    }
  }, []);

  // Featured mods: top 15 curated mods for sliding carousel
  const featuredMods = useMemo(() => {
    return mods.slice(0, 15);
  }, []);

  // Most starred mods: sorted by stargazers
  const mostStarredMods = useMemo(() => {
    return [...mods]
      .sort((a, b) => (starCounts[b.url] || 0) - (starCounts[a.url] || 0))
      .slice(0, 8);
  }, [starCounts]);

  // Tab filtered mods
  const tabFilteredMods = useMemo(() => {
    if (activeTab === "starred") return mostStarredMods;
    if (activeTab === "redm") return mods.filter((m) => m.tag === "redm").slice(0, 8);
    if (activeTab === "sp") return mods.filter((m) => m.tag === "sp").slice(0, 8);
    return mods.slice(0, 8);
  }, [activeTab, mostStarredMods]);

  // Search filtered mods
  const searchResultMods = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return mods.filter(
      (mod) =>
        mod.title.toLowerCase().includes(q) ||
        (mod.tag && mod.tag.toLowerCase().includes(q)) ||
        (mod.url && mod.url.toLowerCase().includes(q))
    );
  }, [query]);

  // Top Creators list extracted from mods
  const topCreators = useMemo(() => {
    const map = new Map<string, number>();
    mods.forEach((m) => {
      const u = getGitHubUser(m.url);
      if (u) {
        map.set(u, (map.get(u) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, []);

  // Category Mod Counts
  const categoryCounts = useMemo(() => {
    const spCount = mods.filter((m) => m.tag === "sp").length;
    const redmCount = mods.filter((m) => m.tag === "redm").length;
    const graphicsCount = mods.filter((m) => m.tag === "graphics").length;
    const assetsCount = mods.filter((m) => ["outfits", "vehicles", "weapons"].includes(m.tag || "")).length;
    return { sp: spCount, redm: redmCount, graphics: graphicsCount, assets: assetsCount };
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors flex flex-col justify-between relative">
        <div>
          <Navbar
            query={query}
            onQueryChange={setQuery}
            dark={dark}
            onToggleDark={() => setDark((value) => !value)}
          />

          <main className="mx-auto max-w-[1920px] px-4 pb-16 pt-5 sm:px-6 sm:pt-6 space-y-12">
            {/* Integrated Hero Section with Integrated Search Bar */}
            <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.05}>
              <section className="relative min-h-[480px] overflow-hidden rounded-3xl ring-1 ring-border shadow-2xl flex items-center justify-center text-center sm:min-h-[540px]">
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
                  className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80 active:scale-[0.96] cursor-pointer shadow-md"
                >
                  {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70 backdrop-blur-[1px]" />

                <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center px-6 py-12 text-center space-y-6">
                  <h1 className="font-display text-5xl leading-tight tracking-wide text-white sm:text-6xl md:text-7xl">
                    Discover <span className="text-primary font-bold">RDR2 Mods</span> & RedM Scripts
                  </h1>

                  <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                    Explore verified single-player trainers, ASI mods, Lenny's Mod Loader assets, and RedM multiplayer server resources.
                  </p>

                  {/* Hero Fast Search Bar */}
                  <div className="w-full max-w-xl pt-2">
                    <div className="relative flex items-center rounded-full bg-black/60 p-1.5 ring-1 ring-white/30 backdrop-blur-md shadow-2xl focus-within:ring-primary focus-within:bg-black/80 transition-all">
                      <Search className="ml-3.5 size-5 text-white/60 shrink-0" aria-hidden="true" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search trainers, ASI scripts, RedM resources..."
                        className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/60"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery("")}
                          className="mr-2 text-white/60 hover:text-white text-xs font-semibold px-2 py-1 rounded-full bg-white/10"
                        >
                          Clear
                        </button>
                      )}
                      <Button asChild size="sm" className="rounded-full px-5 font-semibold shrink-0 shadow-md transition-all active:scale-[0.96]">
                        <Link to={`/catalog${query ? `?search=${encodeURIComponent(query)}` : ""}`}>
                          Explore Catalog
                        </Link>
                      </Button>
                    </div>

                    {/* Hero Quick Filter Tags */}
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
                      <span className="font-mono text-white/50 text-[11px] uppercase">Popular:</span>
                      {[
                        { label: "ScriptHook", query: "script" },
                        { label: "LML Loader", query: "lml" },
                        { label: "RedM Scripts", query: "redm" },
                        { label: "ReShade", query: "graphics" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => setQuery(item.query)}
                          className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/20 transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </AnimatedContent>



            {/* Interactive Category Directory Showcase Grid */}
            <section className="space-y-4">
              <div className="flex items-end justify-between border-b border-border/60 pb-3">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Browse by Category
                  </h2>
                </div>
                <Link
                  to="/catalog"
                  className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
                >
                  View All Categories ({mods.length})
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categoryCards.map((cat, idx) => {
                  return (
                    <AnimatedContent
                      key={cat.id}
                      distance={30}
                      direction="vertical"
                      duration={0.6}
                      delay={idx * 0.1}
                      threshold={0.15}
                    >
                      <Link
                        to="/catalog"
                        search={{ category: cat.categoryParam }}
                        className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:border-primary/60 hover:shadow-md active:scale-[0.98] flex flex-col justify-between h-full"
                      >
                        <img
                          src={cat.image}
                          alt=""
                          aria-hidden="true"
                          className={cat.imageClass}
                        />
                        <div className="space-y-2 relative z-10 max-w-[58%]">
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {cat.title}
                          </h3>

                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {cat.desc}
                          </p>
                        </div>

                        <div className="mt-4 relative z-10 flex items-center gap-1.5 text-xs font-semibold text-primary">
                          Explore Category
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </AnimatedContent>
                  );
                })}
              </div>
            </section>

            {/* If User is Searching */}
            {query.trim() ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-foreground">
                      Search Results
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Showing {searchResultMods.length} results for "{query}"
                    </p>
                  </div>
                  <button
                    onClick={() => setQuery("")}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {searchResultMods.map((mod, index) => (
                    <ModCard
                      key={`${mod.title}-${index}`}
                      mod={mod}
                      index={index}
                      stars={starCounts[mod.url]}
                      isFav={favorites.includes(mod.url)}
                      onToggleFavorite={toggleFavorite}
                      onCopyUrl={copyUrl}
                      onShareWithFriend={shareWithFriend}
                      onReportMod={reportMod}
                      onOpenModModal={setSelectedModModal}
                    />
                  ))}
                </div>

                {searchResultMods.length === 0 && (
                  <div className="py-20 text-center space-y-3 rounded-2xl border border-border/60 bg-card/40">
                    <p className="font-display text-3xl font-bold">No mods found</p>
                    <p className="text-sm text-muted-foreground">
                      No matching modifications found for "{query}". Try another search term.
                    </p>
                    <Button
                      onClick={() => setQuery("")}
                      variant="outline"
                      className="rounded-full px-6 active:scale-95"
                    >
                      Reset Filter
                    </Button>
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* Featured Mods Horizontal Sliding Carousel */}
                <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                  <section className="space-y-4">
                    <div className="flex items-end justify-between border-b border-border/60 pb-3">
                      <div>
                        <h2 className="font-display text-3xl font-bold text-foreground">
                          Featured Highlights
                        </h2>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Left & Right Carousel Controls */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => scrollFeatured("left")}
                            aria-label="Scroll left"
                            title="Previous featured mods"
                            className="flex size-8 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-accent hover:border-primary/50 active:scale-95 shadow-sm cursor-pointer"
                          >
                            <ChevronLeft className="size-4" />
                          </button>
                          <button
                            onClick={() => scrollFeatured("right")}
                            aria-label="Scroll right"
                            title="Next featured mods"
                            className="flex size-8 items-center justify-center rounded-full border border-border/80 bg-card text-foreground transition-all hover:bg-accent hover:border-primary/50 active:scale-95 shadow-sm cursor-pointer"
                          >
                            <ChevronRight className="size-4" />
                          </button>
                        </div>

                        <Link
                          to="/catalog"
                          className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
                        >
                          View All ({mods.length})
                          <ArrowRight className="size-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Horizontal Sliding Carousel Container */}
                    <div
                      ref={featuredScrollRef}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-proximity pb-3 pt-1"
                    >
                      {featuredMods.map((mod, index) => (
                        <div
                          key={`${mod.title}-${index}`}
                          className="w-[280px] sm:w-[320px] shrink-0 snap-start"
                        >
                          <ModCard
                            mod={mod}
                            index={index}
                            stars={starCounts[mod.url]}
                            isFav={favorites.includes(mod.url)}
                            onToggleFavorite={toggleFavorite}
                            onCopyUrl={copyUrl}
                            onShareWithFriend={shareWithFriend}
                            onReportMod={reportMod}
                            onOpenModModal={setSelectedModModal}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                </AnimatedContent>

                {/* 2-Column Desktop Grid Layout: Main Explorer (Left) & Sidebar Hub (Right) */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                  {/* Left Column (8 Columns on Large Desktop) */}
                  <div className="lg:col-span-8 space-y-10">
                    {/* Tabbed Mod Explorer */}
                    <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                      <section className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3 gap-3">
                          <div>
                            <h2 className="font-display text-3xl font-bold text-foreground">
                              Explore Catalog
                            </h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Filter mods directly on the homepage
                            </p>
                          </div>

                          {/* Filter Tabs */}
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-full border border-border/80 bg-card p-1 shadow-sm shrink-0">
                            {[
                              { id: "featured", label: "Featured" },
                              { id: "starred", label: "Top Rated" },
                              { id: "sp", label: "Single Player" },
                              { id: "redm", label: "RedM" },
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                                  activeTab === tab.id
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tabbed Mod Cards Grid */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          {tabFilteredMods.map((mod, index) => (
                            <ModCard
                              key={`tab-${mod.title}-${index}`}
                              mod={mod}
                              index={index}
                              stars={starCounts[mod.url]}
                              isFav={favorites.includes(mod.url)}
                              onToggleFavorite={toggleFavorite}
                              onCopyUrl={copyUrl}
                              onShareWithFriend={shareWithFriend}
                              onReportMod={reportMod}
                              onOpenModModal={setSelectedModModal}
                            />
                          ))}
                        </div>

                        <div className="pt-2 text-center">
                          <Button asChild variant="secondary" className="rounded-full px-8 font-semibold shadow-sm hover:bg-primary hover:text-primary-foreground transition-all">
                            <Link to="/catalog">
                              View All {mods.length} Mods in Full Catalog
                            </Link>
                          </Button>
                        </div>
                      </section>
                    </AnimatedContent>

                    {/* Essential Mod Loader Guides Showcase Grid */}
                    <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1}>
                      <section className="space-y-6">
                        <div className="flex items-end justify-between border-b border-border/60 pb-3">
                          <div>
                            <h2 className="font-display text-3xl font-bold text-foreground">
                              Modding Guides
                            </h2>
                          </div>
                          <Link
                            to="/guide"
                            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex"
                          >
                            View All Guides
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {setupGuides.map((guide) => (
                            <Link
                              key={guide.path}
                              to={guide.path}
                              className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-end">
                                  <span className="rounded-full bg-muted/80 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                    {guide.tag}
                                  </span>
                                </div>

                                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                  {guide.title}
                                </h3>

                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {guide.desc}
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                                <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:underline">
                                  Read Guide
                                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </section>
                    </AnimatedContent>
                  </div>

                  {/* Right Column Sidebar (4 Columns on Large Desktop) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Quickstart 3-Step Installation Box */}
                    <AnimatedContent distance={35} direction="vertical" duration={0.7} delay={0.1}>
                      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-20 w-20 rounded-full bg-primary/10 blur-xl pointer-events-none" />

                        <div className="space-y-1">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            Quick Modding Checklist
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Follow these 3 steps to set up RDR2 modding
                          </p>
                        </div>

                        <div className="space-y-3 pt-1">
                          <Link
                            to="/guide/scripthook"
                            className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-all hover:border-primary/50"
                          >
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                              1
                            </div>
                            <div>
                              <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                Script Hook RDR2
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Install dinput8.dll & ScriptHookRDR2.dll into game folder
                              </div>
                            </div>
                          </Link>

                          <Link
                            to="/guide/lml"
                            className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-all hover:border-primary/50"
                          >
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                              2
                            </div>
                            <div>
                              <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                Lenny's Mod Loader
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Copy ModLoader contents to game directory
                              </div>
                            </div>
                          </Link>

                          <Link
                            to="/catalog"
                            className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-background/50 p-3 transition-all hover:border-primary/50"
                          >
                            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                              3
                            </div>
                            <div>
                              <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                                Download Mods
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                Drop mod folders directly into the /lml directory
                              </div>
                            </div>
                          </Link>
                        </div>

                        <Button asChild size="sm" variant="secondary" className="w-full rounded-full text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                          <Link to="/guide">View Full Installation Directory</Link>
                        </Button>
                      </div>
                    </AnimatedContent>

                    {/* Featured Mod Authors Spotlight */}
                    <AnimatedContent distance={35} direction="vertical" duration={0.7} delay={0.2}>
                      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            Top Contributors
                          </h3>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">
                            GitHub
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {topCreators.map((creator) => (
                            <a
                              key={creator.name}
                              href={`https://github.com/${creator.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/40 p-2.5 transition-all hover:border-primary/40 hover:bg-background/80"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={`https://github.com/${creator.name}.png?size=80`}
                                  alt={creator.name}
                                  className="size-7 rounded-full ring-1 ring-border shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                    @{creator.name}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground font-mono">
                                    {creator.count} Open Source Mod{creator.count > 1 ? "s" : ""}
                                  </div>
                                </div>
                              </div>
                              <ExternalLink className="size-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </AnimatedContent>

                    {/* RedM & Single Player Distinction Banner */}
                    <AnimatedContent distance={35} direction="vertical" duration={0.7} delay={0.3}>
                      <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm relative overflow-hidden group">
                        <img
                          src="/NicePng_red-beard-png_1934462.png"
                          alt=""
                          aria-hidden="true"
                          className="absolute right-0 bottom-0 h-36 sm:h-40 max-w-[45%] object-contain object-bottom pointer-events-none opacity-50 group-hover:opacity-85 transition-opacity duration-300"
                        />
                        <div className="relative z-10 max-w-[65%] space-y-3">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            Single Player & RedM Servers
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Whether you are tweaking Story Mode graphics or building a custom FiveM/RedM roleplay server, our catalog aggregates verified GitHub repositories.
                          </p>
                          <div className="pt-1 flex flex-wrap items-center gap-2">
                            <Button asChild size="sm" variant="secondary" className="rounded-full text-xs font-semibold px-4 active:scale-95">
                              <Link to="/catalog?category=sp">Single Player</Link>
                            </Button>
                            <Button asChild size="sm" variant="secondary" className="rounded-full text-xs font-semibold px-4 active:scale-95">
                              <Link to="/catalog?category=redm">RedM Resources</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AnimatedContent>
                  </div>
                </div>

                {/* Section 4: Catalog Promo Callout */}
                <AnimatedContent distance={45} direction="vertical" duration={0.8} threshold={0.15}>
                  <section className="rounded-3xl border border-border/80 bg-card p-8 shadow-md sm:p-12 text-center relative overflow-hidden group">
                    {/* Background Recolored Artwork Graphic Watermark */}
                    <div
                      className="absolute inset-0 h-full w-full bg-primary/35 opacity-25 sm:opacity-30 pointer-events-none select-none transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        maskImage: "url(/pngwing.com.png)",
                        WebkitMaskImage: "url(/pngwing.com.png)",
                        maskSize: "cover",
                        WebkitMaskSize: "cover",
                        maskPosition: "center bottom",
                        WebkitMaskPosition: "center bottom",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/40 pointer-events-none" />

                    <div className="relative z-10 mx-auto max-w-2xl space-y-4">
                      <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Explore the Complete <span className="text-primary font-bold">Mod Catalog</span>
                      </h2>

                      <p className="text-sm text-muted-foreground sm:text-base leading-relaxed max-w-xl mx-auto">
                        Discover all {mods.length}+ verified community modifications, RedM server scripts, and standalone enhancements with live GitHub star ratings and release sorting.
                      </p>

                      <div className="pt-2 flex justify-center">
                        <Button asChild size="lg" className="rounded-full px-8 font-semibold shadow-md active:scale-[0.96]">
                          <Link to="/catalog">
                            View Full Catalog ({mods.length} Mods)
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </section>
                </AnimatedContent>
              </>
            )}
          </main>
        </div>

        {/* Floating Toast Notification Bar */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-border/80 bg-popover/95 px-4 py-2.5 text-xs font-medium text-popover-foreground shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
            {toastMessage}
          </div>
        )}

        {/* Centered Thank You Popup Modal */}
        {selectedModModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 font-body">
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
                  Re-open GitHub Repository
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
