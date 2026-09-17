import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/guidelines")({
  head: () => ({
    meta: [
      { title: "Community Guidelines | RDR2 Mods" },
      { name: "description", content: "Community standards, modding guidelines, and code of conduct for RDR2 Mods." },
    ],
  }),
  component: GuidelinesPage,
});

function GuidelinesPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Community Guidelines
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Rules and quality standards ensuring a safe, creative, and respectful environment for Red Dead Redemption 2 modders and players.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Quick Navigation
                </h2>
                <nav className="mt-4 flex flex-col space-y-2 text-sm font-medium">
                  <a href="#conduct" className="text-muted-foreground hover:text-primary transition-colors">
                    1. Code of Conduct
                  </a>
                  <a href="#mod-quality" className="text-muted-foreground hover:text-primary transition-colors">
                    2. Mod Submission Standards
                  </a>
                  <a href="#multiplayer" className="text-muted-foreground hover:text-primary transition-colors">
                    3. Multiplayer & Online Integrity
                  </a>
                  <a href="#monetization" className="text-muted-foreground hover:text-primary transition-colors">
                    4. Paywall & Commercial Rules
                  </a>
                  <a href="#attribution" className="text-muted-foreground hover:text-primary transition-colors">
                    5. Credits & Asset Attribution
                  </a>
                  <a href="#enforcement" className="text-muted-foreground hover:text-primary transition-colors">
                    6. Moderation & Enforcement
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <article className="prose dark:prose-invert max-w-none lg:col-span-8 space-y-10 text-foreground/90">
              {/* Section 1 */}
              <section id="conduct" className="scroll-mt-24 space-y-4">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  1. Code of Conduct
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods thrives on mutual respect among developers, scriptwriters, 3D artists, and players. We expect all community participants to adhere to basic standards of civil interaction:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                      <CheckCircle2 className="size-4 shrink-0" />
                      Encouraged Behavior
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>Provide constructive feedback on mod bug reports</li>
                      <li>Credit original script creators and modelers</li>
                      <li>Help newcomers install LML, ASI loaders, and Scripthook</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
                    <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                      <XCircle className="size-4 shrink-0" />
                      Prohibited Behavior
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <li>Harassment, hate speech, or personal attacks</li>
                      <li>Spamming catalog listings or review sections</li>
                      <li>Impersonating established mod creators</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="mod-quality" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  2. Mod Submission Standards
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To maintain catalog quality, all submitted mods must fulfill the following criteria:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li><strong>Clear Installation Instructions:</strong> Include details on required prerequisites (e.g., Alexander Blade's Script Hook RDR2, Lenny's Mod Loader, or RedM artifacts).</li>
                  <li><strong>Accurate Categorization:</strong> Label mods appropriately (Scripts, Graphics, Weapons, Vehicles, Outfits, Audio, Server Resources).</li>
                  <li><strong>No Harmful Payloads:</strong> Files must be free of executables disguised as archives, malware, spyware, or crypto miners.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="multiplayer" className="scroll-mt-24 space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <AlertCircle className="size-4 shrink-0" />
                  Fair Play & Anti-Cheat Policy
                </div>
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  3. Multiplayer & Online Integrity
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods is dedicated strictly to single-player enhancements and custom RedM multiplayer servers. We enforce a <strong>zero-tolerance ban on Red Dead Online cheats</strong>:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>Mod menus or trainers designed to affect official Rockstar Games online sessions will be removed immediately.</li>
                  <li>Uploader accounts attempting to distribute online exploits will be permanently suspended.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="monetization" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  4. Paywall & Commercial Restrictions
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  In compliance with publisher guidelines, community modifications listed on RDR2 Mods should remain freely accessible to players. Mods behind mandatory subscription paywalls or commercial licenses that violate Rockstar Games Fan Content policies are subject to removal. Voluntary donations (e.g., Buy Me a Coffee, Ko-fi, Patreon optional support) are permitted when mod downloads remain free.
                </p>
              </section>

              {/* Section 5 */}
              <section id="attribution" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  5. Credits & Asset Attribution
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Always respect the labor of fellow creators. If your mod incorporates open-source scripts, converted 3D models, or texture assets authored by someone else, you must provide explicit credits and link to original sources in your documentation.
                </p>
              </section>

              {/* Section 6 */}
              <section id="enforcement" className="scroll-mt-24 space-y-3 rounded-2xl border border-border/80 bg-card p-6">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  6. Moderation & Reporting Violations
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  If you discover a mod listing that breaks community standards, contains stolen assets, or includes malicious code, please report it via our support contact page.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                  >
                    <HeartHandshake className="size-4" />
                    Report a Guideline Violation
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
