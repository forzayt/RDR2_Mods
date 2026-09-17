import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, ArrowRight, Eye, Database } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { generateSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    generateSeoMeta({
      title: "Privacy Policy - Data Privacy & Transparency",
      description: "Read the RDR2 Mods privacy policy detailing data practices, cookies, analytics transparency, and user rights.",
      path: "/privacy",
      image: "/banner.png",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Last updated: September 18, 2026. Learn how RDR2 Mods respects your data and protects community privacy.
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
                  <a href="#overview" className="text-muted-foreground hover:text-primary transition-colors">
                    1. Overview & Data Minimization
                  </a>
                  <a href="#data-collection" className="text-muted-foreground hover:text-primary transition-colors">
                    2. Information Collected
                  </a>
                  <a href="#local-storage" className="text-muted-foreground hover:text-primary transition-colors">
                    3. Local Storage & Browser State
                  </a>
                  <a href="#server-logs" className="text-muted-foreground hover:text-primary transition-colors">
                    4. Server Logs & Analytics
                  </a>
                  <a href="#third-parties" className="text-muted-foreground hover:text-primary transition-colors">
                    5. Third-Party Integrations
                  </a>
                  <a href="#data-rights" className="text-muted-foreground hover:text-primary transition-colors">
                    6. Your Privacy Rights
                  </a>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    7. Contact & Data Inquiries
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <article className="prose dark:prose-invert max-w-none lg:col-span-8 space-y-10 text-foreground/90">
              {/* Section 1 */}
              <section id="overview" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  1. Overview & Data Minimization
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  At RDR2 Mods, we believe community modding platforms should respect user privacy. We operate under a strict <strong>data minimization philosophy</strong>: we do not sell your data, track you across third-party websites, or display invasive targeted behavioral advertising.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  You can browse, filter, search, and download public modifications without creating an account or supplying personally identifiable information.
                </p>
              </section>

              {/* Section 2 */}
              <section id="data-collection" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  2. Information We Collect
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We only collect data that is strictly necessary for operating and securing the platform:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <Database className="size-5 text-primary mb-2" />
                    <h3 className="font-semibold text-sm text-foreground">Mod Submissions</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      When submitting a mod, we collect the title, author handle, GitHub repository URL, tags, and mod metadata you voluntarily submit.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-card p-4">
                    <Eye className="size-5 text-primary mb-2" />
                    <h3 className="font-semibold text-sm text-foreground">Support Messages</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      When using our contact form, we store your provided contact email and message content solely to respond to your request.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="local-storage" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  3. Local Storage & Browser State
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Instead of tracking cookies, we utilize modern browser <code>localStorage</code> to remember your local preferences client-side:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li><strong>Dark/Light Theme State:</strong> Stores your chosen appearance mode.</li>
                  <li><strong>Saved Favorites:</strong> Keeps track of mod IDs marked as favorited on your device.</li>
                </ul>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  This data remains entirely on your personal device and is never transmitted to our servers or third parties.
                </p>
              </section>

              {/* Section 4 */}
              <section id="server-logs" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  4. Server Logs & Technical Performance
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Standard web server infrastructure temporarily logs technical connection metadata (IP address, user-agent string, page endpoint requested, HTTP response code). These logs are retained briefly for network security analysis, DDoS mitigation, and error debugging.
                </p>
              </section>

              {/* Section 5 */}
              <section id="third-parties" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  5. Third-Party Links & External Hosting
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Mods hosted on our catalog may link to external project repositories (such as GitHub, Nexus Mods, or Discord). Clicking external links transfers your session to third-party domains, which operate under their own independent privacy policies. We encourage you to review third-party terms when leaving our site.
                </p>
              </section>

              {/* Section 6 */}
              <section id="data-rights" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  6. Your Privacy Rights
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Depending on your jurisdiction, you have rights regarding your personal information, including the right to request access, correction, or deletion of mod submission metadata or support correspondence.
                </p>
              </section>

              {/* Section 7 */}
              <section id="contact" className="scroll-mt-24 space-y-3 rounded-2xl border border-border/80 bg-card p-6">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  7. Contact & Data Inquiries
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  If you wish to submit a data inquiry or request the removal of your mod submission, please reach out to our team via our contact portal.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                  >
                    <Shield className="size-4" />
                    Submit Privacy Inquiry
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
