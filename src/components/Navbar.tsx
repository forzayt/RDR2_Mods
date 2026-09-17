import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Compass,
  FileText,
  Home,
  MessageSquare,
  Moon,
  Search,
  Sun,
  Upload,
  User,
  X,
  Menu,
  Shield,
  Scale,
} from "lucide-react";
import { useState } from "react";

import rdr2Logo from "@/assets/rdr2mods.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  query?: string;
  onQueryChange?: (value: string) => void;
  dark?: boolean;
  onToggleDark?: () => void;
}

export function Navbar({
  query = "",
  onQueryChange,
  dark = false,
  onToggleDark,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-7xl transition-all duration-300 sm:top-4 sm:w-[calc(100%-3rem)]">
      <div className="relative flex h-14 items-center justify-between rounded-full border border-border/70 bg-background/90 px-3 shadow-lg shadow-black/5 backdrop-blur-xl transition-all sm:h-16 sm:px-5">
        {/* Left: Brand Logo in a sleek high-contrast dark capsule */}
        <div className="flex items-center gap-3 lg:gap-6">
          <Link
            to="/"
            className="flex items-center transition-transform hover:scale-[1.03] active:scale-[0.98]"
            title="RDR2 Mods Home"
          >
            <img
              src={rdr2Logo}
              alt="RDR2 Mods"
              className="h-9 w-auto object-contain sm:h-11 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] dark:drop-shadow-none transition-all"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex lg:gap-1.5">
            {/* Home Link */}
            <Link
              to="/"
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-accent ${
                isActive("/") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Home
            </Link>

            {/* Catalog Link */}
            <Link
              to="/catalog"
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-accent ${
                isActive("/catalog") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Catalog
            </Link>

            {/* Setup Guide Link */}
            <Link
              to="/guide"
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-accent ${
                isActive("/guide") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Setup Guide
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all hover:bg-accent hover:text-foreground">
                  Categories
                  <ChevronDown className="size-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 rounded-2xl shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to="/catalog" search={{ category: "sp" }} className="w-full cursor-pointer">
                    Single Player (ASI/LML)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/catalog" search={{ category: "redm" }} className="w-full cursor-pointer">
                    RedM Server Scripts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/catalog" search={{ category: "graphics" }} className="w-full cursor-pointer">
                    Graphics & Reshade
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/catalog" search={{ category: "outfits" }} className="w-full cursor-pointer">
                    Outfits & Character
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/catalog" search={{ category: "tools" }} className="w-full cursor-pointer">
                    Modding Utilities
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Legal & Docs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-all hover:bg-accent hover:text-foreground">
                  Legal
                  <ChevronDown className="size-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 rounded-2xl shadow-xl">
                <DropdownMenuItem asChild>
                  <Link to="/terms" className="w-full cursor-pointer">
                    <Scale className="mr-2 size-4" />
                    Terms of Service
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy" className="w-full cursor-pointer">
                    <Shield className="mr-2 size-4" />
                    Privacy Policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/guidelines" className="w-full cursor-pointer">
                    <FileText className="mr-2 size-4" />
                    Community Guidelines
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dmca" className="w-full cursor-pointer">
                    <FileText className="mr-2 size-4" />
                    DMCA & IP Policy
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/license" className="w-full cursor-pointer">
                    <FileText className="mr-2 size-4" />
                    Open Source & License
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all hover:bg-accent ${
                isActive("/contact") ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Right Controls: Search, Theme, Sleek Pill Upload Button, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger or Input */}
          {onQueryChange && (
            <div className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 rounded-full border border-border/80 bg-background px-3.5 py-1.5 shadow-inner animate-in fade-in zoom-in-95 duration-200">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search mods..."
                    autoFocus
                    className="w-32 bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:w-44"
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      onQueryChange("");
                    }}
                    className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground active:scale-[0.96]"
                  aria-label="Search"
                  title="Search mods"
                >
                  <Search className="size-4.5" />
                </button>
              )}
            </div>
          )}

          {/* Theme Toggle */}
          {onToggleDark && (
            <button
              onClick={onToggleDark}
              className="flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground active:scale-[0.96]"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </button>
          )}

          {/* Sleek Red Pill Upload Button */}
          <Link
            to="/upload"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/35 active:scale-[0.96] sm:inline-flex"
          >
            <Upload className="size-3.5" />
            <span>Upload</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-full text-foreground/80 md:hidden hover:bg-accent active:scale-[0.96]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-3xl border border-border/80 bg-background/95 p-4 shadow-xl backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <Home className="size-4 text-primary" />
              Home
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <Compass className="size-4" />
              Catalog & Mods
            </Link>
            <Link
              to="/upload"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-primary hover:bg-accent"
            >
              <Upload className="size-4" />
              Upload Mod
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <MessageSquare className="size-4" />
              Contact & Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
