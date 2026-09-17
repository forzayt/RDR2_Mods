import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/guide/scripthook")({
  head: () => ({
    meta: [
      { title: "Script Hook RDR2 Setup Guide | RDR2 Mods" },
      { name: "description", content: "Installation guide for Alexander Blade's Script Hook RDR2 and dinput8.dll ASI loader." },
    ],
  }),
  component: ScriptHookGuidePage,
});

function ScriptHookGuidePage() {
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
            <div className="text-foreground font-semibold">Script Hook RDR2</div>
          </div>

          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-2">
            <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              Guide 01 — Core Script Loader
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-foreground">
              Script Hook RDR2 & ASI Loader Guide
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base max-w-3xl">
              Script Hook RDR2 is the foundational library created by Alexander Blade that allows Red Dead Redemption 2 to execute custom C++ <code>.asi</code> scripts, trainers, and keybind modifications in single-player mode.
            </p>
          </div>

          {/* Official Download Banner */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Download Official Script Hook RDR2</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Download the official package directly from Alexander Blade's Dev-C distribution server.
              </p>
            </div>
            <a
              href="http://www.dev-c.com/rdr2/scripthookrdr2/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96] shrink-0"
            >
              Dev-C Official Download Page
            </a>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-10 space-y-10">
            {/* Step-by-Step Box */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Step-by-Step Installation Instructions
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Locate RDR2 Directory</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Open your game installation folder. On Steam: Right-click RDR2 in Library &gt; Manage &gt; Browse local files. On Rockstar Launcher: Settings &gt; RDR2 &gt; Installation Folder.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Extract Binaries</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Open the downloaded zip file and navigate to the <code>bin</code> folder. Extract <code>ScriptHookRDR2.dll</code> and <code>dinput8.dll</code>.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Paste into Root Folder</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Paste both files directly into the root folder where <code>RDR2.exe</code> is located. Optionally copy <code>NativeTrainer.asi</code> for the default in-game trainer.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Script Hook Video Tutorial */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  Script Hook Video Guide
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                  Script Hook RDR2 Dedicated Video Tutorial
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Watch this step-by-step video tutorial on installing Script Hook RDR2, dinput8.dll loader, and verifying ASI scripts in-game.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-border/60">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/olMJw_oYzlM"
                  title="Script Hook RDR2 Installation Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Directory Structure Diagram */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Required File Structure in Game Root
              </h2>
              <div className="rounded-xl bg-muted/60 p-4 font-mono text-xs text-foreground overflow-x-auto">
                <pre>{`Red Dead Redemption 2/
├── RDR2.exe
├── dinput8.dll               <-- ASI Loader (Launches .asi scripts)
├── ScriptHookRDR2.dll         <-- Core Script Hook Library
├── NativeTrainer.asi          <-- Optional default trainer
└── scripts/                   <-- Folder for community .asi script mods`}</pre>
              </div>
            </div>

            {/* Bottom Nav / Next Guides */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/80 pt-6 gap-4">
              <Link
                to="/guide"
                className="text-xs font-semibold text-primary hover:underline"
              >
                &larr; Return to All Guides
              </Link>
              <Link
                to="/guide/lml"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Next: Lenny's Mod Loader Guide &rarr;
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
