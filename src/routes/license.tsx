import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal, FileCode, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { generateSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/license")({
  head: () =>
    generateSeoMeta({
      title: "Open Source License & Rockstar Games Disclaimer - RDR2 Mods",
      description: "Open source licensing disclosures, MIT license details, and Take-Two / Rockstar Games fan content policy statements.",
      path: "/license",
      image: "/banner.png",
    }),
  component: LicensePage,
});

function LicensePage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Software License & Disclosures
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              RDR2 Mods is built on open-source technology and community contributions. Review our platform license and third-party software disclosures below.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  License Navigation
                </h2>
                <nav className="mt-4 flex flex-col space-y-2 text-sm font-medium">
                  <a href="#platform-license" className="text-muted-foreground hover:text-primary transition-colors">
                    1. Platform Source Code License (MIT)
                  </a>
                  <a href="#third-party-deps" className="text-muted-foreground hover:text-primary transition-colors">
                    2. Third-Party Software & Libraries
                  </a>
                  <a href="#fan-content" className="text-muted-foreground hover:text-primary transition-colors">
                    3. Rockstar Fan Content Policy
                  </a>
                  <a href="#mod-ownership" className="text-muted-foreground hover:text-primary transition-colors">
                    4. Community Mod Ownership
                  </a>
                  <a href="#disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                    5. No Warranty Disclaimer
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <article className="prose dark:prose-invert max-w-none lg:col-span-8 space-y-10 text-foreground/90">
              {/* Section 1 */}
              <section id="platform-license" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  1. Platform Source Code License (MIT License)
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  The frontend interface and server infrastructure of the RDR2 Mods platform website are licensed under the MIT License.
                </p>
                <div className="rounded-2xl border border-border/80 bg-card p-5 font-mono text-xs text-muted-foreground leading-relaxed">
                  <p className="font-semibold text-foreground mb-2">MIT License</p>
                  <p>Copyright (c) 2026 RDR2 Mods Community Contributors</p>
                  <p className="mt-2">
                    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions:
                  </p>
                  <p className="mt-2">
                    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
                  </p>
                  <p className="mt-2 uppercase font-semibold">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="third-party-deps" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  2. Third-Party Software & Open Source Libraries
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods utilizes exceptional open-source libraries from the web developer ecosystem:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <h3 className="font-semibold text-sm text-foreground">React & TanStack Router</h3>
                    <p className="text-xs text-muted-foreground mt-1">MIT Licensed component UI architecture and type-safe routing engine.</p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <h3 className="font-semibold text-sm text-foreground">Tailwind CSS & Radix UI</h3>
                    <p className="text-xs text-muted-foreground mt-1">MIT Licensed styling utilities and accessible unstyled UI primitives.</p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <h3 className="font-semibold text-sm text-foreground">Lucide Icons</h3>
                    <p className="text-xs text-muted-foreground mt-1">ISC Licensed minimalist vector icons system.</p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <h3 className="font-semibold text-sm text-foreground">Vite & Nitro</h3>
                    <p className="text-xs text-muted-foreground mt-1">MIT Licensed next-gen frontend build tool and universal server engine.</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="fan-content" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  3. Rockstar Games Fan Content Policy Compliance
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods adheres strictly to Take-Two Interactive's policy regarding non-commercial PC single-player modifications. We do not distribute original game binaries, cracked executables, or copyright-protected game audio files.
                </p>
              </section>

              {/* Section 4 */}
              <section id="mod-ownership" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  4. Community Mod Ownership
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Individual modifications, ASI scripts, LML packages, and RedM resources listed on the platform remain under the individual licenses specified by their respective authors (such as GPL-3.0, MIT, Creative Commons, or All Rights Reserved).
                </p>
              </section>

              {/* Section 5 */}
              <section id="disclaimer" className="scroll-mt-24 space-y-3 rounded-2xl border border-border/80 bg-card p-6">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  5. No Warranty Disclaimer
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  All platform software and community catalog entries are provided without warranty. Users install and execute game modifications at their own discretion.
                </p>
              </section>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
