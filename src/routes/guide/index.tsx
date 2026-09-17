import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/guide/")({
  head: () => ({
    meta: [
      { title: "Modding Guides & Tutorials | RDR2 Mods" },
      { name: "description", content: "Dedicated setup and installation guides for Script Hook RDR2, Lenny's Mod Loader (LML), RedM server scripts, and Reshade." },
    ],
  }),
  component: GuideIndexPage,
});

function GuideIndexPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider">
              Modding Documentation & Setup Directory
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Modding Guides & Setup
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-3xl">
              Select a dedicated installation guide below for detailed step-by-step setup instructions, directory structure diagrams, and official loader downloads.
            </p>
          </div>

          {/* Safety Warning Box */}
          <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6 text-foreground">
            <h2 className="font-display text-base font-bold text-foreground">
              Red Dead Online Anti-Cheat Safety Warning
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mods are intended exclusively for Single-Player Story Mode and custom RedM multiplayer servers. Always remove loader files (such as <code>ScriptHookRDR2.dll</code>, <code>dinput8.dll</code>, or <code>vfs.asi</code>) before launching official Red Dead Online.
            </p>
          </div>

          {/* 4 Dedicated Guides Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Guide 1: Script Hook RDR2 */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-primary uppercase">Guide 01</div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Script Hook RDR2 & ASI Loader
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Learn how to install Alexander Blade's Script Hook RDR2 and <code>dinput8.dll</code> to run custom C++ <code>.asi</code> scripts, trainers, and keybind mods in single-player.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/guide/scripthook"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                >
                  Read Script Hook Guide
                </Link>
              </div>
            </div>

            {/* Guide 2: Lenny's Mod Loader */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-primary uppercase">Guide 02</div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Lenny's Mod Loader (LML)
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Complete guide for setting up <code>vfs.asi</code>, the <code>lml</code> virtual file system folder, dynamic texture/model replacements, and ModManager UI.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/guide/lml"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                >
                  Read LML Guide
                </Link>
              </div>
            </div>

            {/* Guide 3: RedM Server Build */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-primary uppercase">Guide 03</div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  RedM Server Scripts & Resources
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For server founders and developers deploying RedM multiplayer scripts, resource manifests, and <code>server.cfg</code> startup configurations.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/guide/redm"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                >
                  Read RedM Guide
                </Link>
              </div>
            </div>

            {/* Guide 4: Reshade & Shaders */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-mono font-semibold text-primary uppercase">Guide 04</div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Reshade & Graphical Shaders
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Step-by-step setup for DirectX 12 and Vulkan rendering APIs, loading custom <code>.ini</code> graphic presets, and configuring shaders in-game.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/guide/reshade"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                >
                  Read Reshade Guide
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
