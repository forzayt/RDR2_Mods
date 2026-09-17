import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/guide/reshade")({
  head: () => ({
    meta: [
      { title: "ReShade & Visual Shaders Setup Guide | RDR2 Mods" },
      { name: "description", content: "Learn how to install ReShade graphics suite, Vulkan API layer, and custom color presets for Red Dead Redemption 2." },
    ],
  }),
  component: ReshadeGuidePage,
});

function ReshadeGuidePage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-medium">
            <Link to="/guide" className="hover:text-primary transition-colors">
              Guides
            </Link>
            /
            <div className="text-foreground font-semibold">ReShade Graphics Suite</div>
          </div>

          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-2">
            <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              Guide 04 — Post-Processing & Visuals
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-foreground">
              ReShade & Visual Shaders Setup Guide
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base max-w-3xl">
              ReShade is an advanced post-processing injector for RDR2 that introduces ambient occlusion, real-time depth of field, color grading, ambient lighting, and realistic ray-traced screen-space reflections.
            </p>
          </div>

          {/* Official Download Banner */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Download Official ReShade Installer</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Get the latest ReShade setup program with full Vulkan API support.
              </p>
            </div>
            <a
              href="https://reshade.me/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96] shrink-0"
            >
              Visit ReShade.me Official Site
            </a>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-10 space-y-10">
            {/* Step-by-Step Box */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Step-by-Step ReShade Installation
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Target RDR2 Executable</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Run the ReShade setup executable and click <strong>Browse</strong> to select <code>RDR2.exe</code> from your game directory.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Select Vulkan Graphics API</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    When prompted for the rendering API, choose <strong>Vulkan</strong> (or DirectX 12 if you forced DX12 in game settings).
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Load Shaders & Presets</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Select standard effect packages (Standard, SweetFX, qTPO). Download custom <code>.ini</code> preset files and place them into the game root folder.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated ReShade Video Tutorial */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  ReShade Video Guide
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                  ReShade RDR2 Dedicated Video Tutorial
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Watch this step-by-step video guide covering ReShade setup, Vulkan rendering selection, and preset file configuration.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-border/60">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/3AUxd5nqIY0"
                  title="ReShade RDR2 Installation Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Keybind Note */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-foreground">
              <h3 className="font-display text-base font-bold text-foreground">
                In-Game ReShade Overlay Hotkey Tip
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Press the <code>Home</code> key on your keyboard while in-game to toggle the ReShade setup overlay. If <code>Home</code> opens the Rockstar Social Club overlay instead, edit <code>ReShade.ini</code> in your game folder to rebind the key to <code>PageUp</code> or <code>F11</code>.
              </p>
            </div>

            {/* Bottom Nav / Next Guides */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/80 pt-6 gap-4">
              <Link
                to="/guide/redm"
                className="text-xs font-semibold text-primary hover:underline"
              >
                &larr; Previous: RedM Server Guide
              </Link>
              <Link
                to="/guide"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Return to All Guides Directory &rarr;
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
