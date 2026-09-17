import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | RDR2 Mods" },
      { name: "description", content: "Terms of service and user agreements for RDR2 Mods platform." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Last updated: September 18, 2026. Please read these terms carefully before accessing or contributing to RDR2 Mods.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Table of Contents
                </h2>
                <nav className="mt-4 flex flex-col space-y-2 text-sm font-medium">
                  <a href="#acceptance" className="text-muted-foreground hover:text-primary transition-colors">
                    1. Acceptance of Terms
                  </a>
                  <a href="#rockstar-disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                    2. Rockstar Games & Take-Two Disclaimer
                  </a>
                  <a href="#user-contributions" className="text-muted-foreground hover:text-primary transition-colors">
                    3. Mod Submissions & User Content
                  </a>
                  <a href="#prohibited-uses" className="text-muted-foreground hover:text-primary transition-colors">
                    4. Prohibited Mod Content & Online Restrictions
                  </a>
                  <a href="#intellectual-property" className="text-muted-foreground hover:text-primary transition-colors">
                    5. Intellectual Property & Licensing
                  </a>
                  <a href="#limitation-liability" className="text-muted-foreground hover:text-primary transition-colors">
                    6. Disclaimer of Warranties & Liability
                  </a>
                  <a href="#termination" className="text-muted-foreground hover:text-primary transition-colors">
                    7. Account & Content Termination
                  </a>
                  <a href="#contact-info" className="text-muted-foreground hover:text-primary transition-colors">
                    8. Contact Information
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <article className="prose dark:prose-invert max-w-none lg:col-span-8 space-y-10 text-foreground/90">
              {/* Section 1 */}
              <section id="acceptance" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  By accessing, browsing, downloading from, or uploading content to RDR2 Mods (referred to as "the Platform", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions stated herein, you must refrain from using the Platform immediately.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We reserve the right to revise these Terms of Service at any time. Continued use of the website following any posted modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              {/* Section 2 */}
              <section id="rockstar-disclaimer" className="scroll-mt-24 space-y-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                  <AlertTriangle className="size-4 shrink-0" />
                  Important Trademark & Affiliation Notice
                </div>
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  2. Rockstar Games & Take-Two Disclaimer
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods is an independent, non-profit community project created by modders for modders. We are <strong>not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected to Rockstar Games, Take-Two Interactive, or any of their subsidiaries</strong>.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  "Red Dead Redemption 2", "RDR2", "RedM", "Rockstar Games", and related titles, logos, and trademarks are registered trademarks of Take-Two Interactive Software, Inc. All game assets, textures, code, and trade dress referenced on this website remain the sole property of their respective trademark holders.
                </p>
              </section>

              {/* Section 3 */}
              <section id="user-contributions" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  3. Mod Submissions & User Content
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  When you submit mod packages, scripts, graphic presets (Reshade/ENB), or documentation to RDR2 Mods:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>You warrant that you are the sole author or authorized distributor of the submitted material.</li>
                  <li>You grant RDR2 Mods a non-exclusive, worldwide, royalty-free license to host, display, index, and mirror your submission for community downloading.</li>
                  <li>You retain full ownership rights over your custom original assets, code scripts, and models.</li>
                  <li>You agree not to lock community mods behind mandatory commercial paywalls that violate Rockstar Games' Fan Content Policy.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="prohibited-uses" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  4. Prohibited Mod Content & Online Restrictions
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To protect the community and adhere to publisher policies, the following content is strictly prohibited from being hosted on RDR2 Mods:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li><strong>Red Dead Online Cheats & Trainers:</strong> Any tool, menu, or script designed to grant unfair advantages, modify currency, spawn items, or disrupt gameplay in official Red Dead Online servers.</li>
                  <li><strong>Malicious Executables:</strong> Files containing viruses, spyware, trojans, obfuscated miners, or harmful payloads.</li>
                  <li><strong>Stolen Intellectual Property:</strong> Unauthorized re-uploads of other modders' creations, ported assets from third-party games without explicit permission, or leaked proprietary code.</li>
                  <li><strong>Illegal Content:</strong> Materials promoting hate speech, harassment, illegal activity, or explicit NSFW content violating public hosting standards.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="intellectual-property" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  5. Intellectual Property & Copyright Policy
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We respect the intellectual property rights of game developers and community creators. If you believe your copyrighted work has been uploaded without authorization, please refer to our <Link to="/dmca" className="text-primary hover:underline font-medium">DMCA & Copyright Policy</Link> to submit a formal takedown request.
                </p>
              </section>

              {/* Section 6 */}
              <section id="limitation-liability" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  6. Disclaimer of Warranties & Limitation of Liability
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  All mods, scripts, software, and files hosted on RDR2 Mods are provided on an <strong>"AS IS" and "AS AVAILABLE" basis</strong> without warranties of any kind, express or implied.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Modifying game files carries inherent risks, including corrupted save files, game crashes, or account bans if used inappropriately online. In no event shall RDR2 Mods, its maintainers, or contributors be liable for any direct, indirect, incidental, or consequential damages arising from downloading, installing, or using files hosted on this platform.
                </p>
              </section>

              {/* Section 7 */}
              <section id="termination" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  7. Account & Content Termination
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We reserve the right to remove any mod submission, disable user accounts, or restrict IP access without prior notice for violations of these Terms of Service or community safety concerns.
                </p>
              </section>

              {/* Section 8 */}
              <section id="contact-info" className="scroll-mt-24 space-y-3 rounded-2xl border border-border/80 bg-card p-6">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  8. Contact Information
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  If you have questions regarding these Terms of Service, please contact our administrative team via our official support channel.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                  >
                    <FileText className="size-4" />
                    Contact Legal Team
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
