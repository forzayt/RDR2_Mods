import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/guide/lml")({
  head: () => ({
    meta: [
      { title: "Lenny's Mod Loader (LML) Setup Guide | RDR2 Mods" },
      { name: "description", content: "Detailed setup instructions for Lenny's Mod Loader (LML) asset replacement framework in RDR2." },
    ],
  }),
  component: LmlGuidePage,
});

function LmlGuidePage() {
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
            <div className="text-foreground font-semibold">Lenny's Mod Loader</div>
          </div>

          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-2">
            <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              Guide 02 — Asset Replacement Framework
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-foreground">
              Lenny's Mod Loader (LML) Guide
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base max-w-3xl">
              Lenny's Mod Loader (LML) by LMS is an advanced virtual file system framework that allows modders to dynamically replace textures, 3D models, weapon meta files, audio banks, and outfits without modifying original RDR2 archive files.
            </p>
          </div>

          {/* Official Download Banner */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Download Lenny's Mod Loader</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Get the latest release of LML including ModManager UI.
              </p>
            </div>
            <a
              href="https://www.modded-games.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96] shrink-0"
            >
              Get LML Download Package
            </a>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-10 space-y-10">
            {/* Step-by-Step Box */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                How to Install LML & Asset Mods
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Copy LML Loader Core</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Copy <code>vfs.asi</code> and the <code>lml</code> folder from the downloaded archive into your main <code>Red Dead Redemption 2</code> root directory.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Place Mods in lml Folder</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Downloaded LML mods usually contain a folder with a <code>mod.xml</code> file. Extract that mod folder into <code>RDR2/lml/</code>.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Manage via ModManager UI</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Launch <code>ModManager.UI.exe</code> from the <code>downloader</code> folder to toggle installed asset replacements or change loading priorities.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated LML Video Tutorial */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  LML Video Guide
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                  Lenny's Mod Loader Dedicated Video Tutorial
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Watch this step-by-step video tutorial showing how to extract LML, place virtual asset files, and manage priority lists via ModManager.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-border/60">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/olMJw_oYzlM"
                  title="Lenny's Mod Loader (LML) Video Installation Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Directory Structure Diagram */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                LML Virtual File System Directory Setup
              </h2>
              <div className="rounded-xl bg-muted/60 p-4 font-mono text-xs text-foreground overflow-x-auto">
                <pre>{`Red Dead Redemption 2/
├── vfs.asi                    <-- LML Virtual File System Core
├── lml/                       <-- Place all LML mod packages here
│   ├── mod_name_folder/
│   │   ├── mod.xml
│   │   └── stream/            <-- Streamed models, ytd textures, and meta files
└── downloader/
    └── ModManager.UI.exe      <-- LML Mod Manager Interface`}</pre>
              </div>
            </div>

            {/* Bottom Nav / Next Guides */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/80 pt-6 gap-4">
              <Link
                to="/guide/scripthook"
                className="text-xs font-semibold text-primary hover:underline"
              >
                &larr; Previous: Script Hook Guide
              </Link>
              <Link
                to="/guide/redm"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Next: RedM Server Guide &rarr;
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
