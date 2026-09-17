import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { generateSeoMeta, SchemaOrg } from "@/lib/seo";

export const Route = createFileRoute("/guide/redm")({
  head: () =>
    generateSeoMeta({
      title: "RedM Server Setup & Script Deployment Guide - RDR2 Multiplayer",
      description: "Complete tutorial for setting up a custom RedM server, configuring server.cfg, writing fxmanifest.lua, and installing Lua resources.",
      keywords: ["RedM Server Guide", "RedM Scripts", "fxmanifest.lua", "RedM Setup", "VORP Framework", "RSG Framework"],
      path: "/guide/redm",
      image: "/banner.png",
      jsonLd: [
        SchemaOrg.techArticle({
          title: "RedM Server Setup & Script Deployment Guide",
          description: "Tutorial for establishing a RedM server, deploying resources, and configuring server.cfg.",
          path: "/guide/redm",
        }),
        SchemaOrg.breadcrumb([
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guide" },
          { name: "RedM Setup", item: "/guide/redm" },
        ]),
        SchemaOrg.faqPage([
          {
            question: "What is RedM?",
            answer: "RedM is a modification framework enabling custom multiplayer servers for Red Dead Redemption 2, allowing server hosters to run custom Lua scripts and roleplay game modes.",
          },
          {
            question: "How do I install a RedM script?",
            answer: "Place the script folder inside your RedM server's resources directory and add 'ensure resource_name' to your server.cfg file.",
          },
        ]),
      ],
    }),
  component: RedmGuidePage,
});

function RedmGuidePage() {
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
            <div className="text-foreground font-semibold">RedM Server Framework</div>
          </div>

          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-2">
            <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              Guide 03 — Multiplayer Server Resource Setup
            </div>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-foreground">
              RedM Server Scripts & Resource Guide
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed sm:text-base max-w-3xl">
              RedM is CitizenFX's custom multiplayer client for Red Dead Redemption 2. This guide covers how server owners and developers install custom lua scripts, C# resources, VORP/RSG frameworks, and <code>fxmanifest.lua</code> packages.
            </p>
          </div>

          {/* Official Link Banner */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Official RedM Documentation & Client</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Download the RedM launcher client or review official CitizenFX server artifact builds.
              </p>
            </div>
            <a
              href="https://redm.net/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96] shrink-0"
            >
              Visit RedM Portal
            </a>
          </div>

          {/* Detailed Instructions */}
          <div className="mt-10 space-y-10">
            {/* Step-by-Step Box */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                How to Install Server Resources
              </h2>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    1
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Extract Resource Folder</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Download your desired RedM script or mod. Unzip the file and verify that the root folder contains an <code>fxmanifest.lua</code> file.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    2
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Place in resources Directory</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Move the resource folder into your server's <code>resources/</code> directory (e.g. <code>server-data/resources/[scripts]/resource_name</code>).
                  </p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                    3
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">Ensure in server.cfg</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Open your <code>server.cfg</code> file and add <code>ensure resource_name</code> to start the script automatically when the server boots.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated RedM Server Video Tutorial */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-4 shadow-sm">
              <div>
                <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
                  RedM Video Guide
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                  RedM RP Server Setup Dedicated Video Tutorial
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Watch this step-by-step video tutorial demonstrating RedM server creation, artifact deployment, resource configuration, and server key setup.
                </p>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-border/60">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src="https://www.youtube.com/embed/olMJw_oYzlM"
                  title="RedM & RDR2 Modding Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Directory Structure & Manifest Example */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Standard Resource Structure & fxmanifest.lua
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every RedM resource requires an <code>fxmanifest.lua</code> file in its root folder declaring game compatibility and script entry points.
              </p>
              <div className="rounded-xl bg-muted/60 p-4 font-mono text-xs text-foreground overflow-x-auto">
                <pre>{`-- fxmanifest.lua example
fx_version 'cerulean'
game 'rdr3'

rdr3_warning 'I acknowledge that this is a RedM resource and does not support FiveM'

author 'Mod Author'
description 'Custom RedM Inventory Framework'
version '1.0.0'

client_scripts {
    'client/main.lua',
    'client/utils.lua'
}

server_scripts {
    'server/main.lua'
}`}</pre>
              </div>
            </div>

            {/* Popular Frameworks */}
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Supported RedM Server Frameworks
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2">
                  <h3 className="font-display text-sm font-bold text-primary">VORP Core Framework</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The standard open-source roleplay framework for RedM featuring character creation, MySQL database support, inventories, and jobs.
                  </p>
                </div>

                <div className="rounded-xl border border-border/80 bg-card p-5 space-y-2">
                  <h3 className="font-display text-sm font-bold text-primary">RSG Core Framework</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Red-State-Gaming core framework tailored for economy systems, horse customization, stores, and law enforcement mechanics.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Nav / Next Guides */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/80 pt-6 gap-4">
              <Link
                to="/guide/lml"
                className="text-xs font-semibold text-primary hover:underline"
              >
                &larr; Previous: Lenny's Mod Loader Guide
              </Link>
              <Link
                to="/guide/reshade"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Next: Reshade Setup Guide &rarr;
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
