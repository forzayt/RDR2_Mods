import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, AlertTriangle, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { generateSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/dmca")({
  head: () =>
    generateSeoMeta({
      title: "DMCA Copyright Takedown Policy & Notice Procedure - RDR2 Mods",
      description: "Digital Millennium Copyright Act (DMCA) policy, copyright infringement notification procedure, and takedown contact details for RDR2 Mods.",
      path: "/dmca",
      image: "/banner.png",
    }),
  component: DmcaPage,
});

function DmcaPage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-border/80 pb-8 pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              DMCA & Copyright Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              RDR2 Mods respects intellectual property rights and complies with the Digital Millennium Copyright Act (DMCA) and international copyright standards.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <h2 className="font-display text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                  Section Index
                </h2>
                <nav className="mt-4 flex flex-col space-y-2 text-sm font-medium">
                  <a href="#takedown-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    1. Takedown Policy Overview
                  </a>
                  <a href="#submit-notice" className="text-muted-foreground hover:text-primary transition-colors">
                    2. Requirements for a DMCA Notice
                  </a>
                  <a href="#counter-notice" className="text-muted-foreground hover:text-primary transition-colors">
                    3. Counter-Notification Process
                  </a>
                  <a href="#repeat-infringers" className="text-muted-foreground hover:text-primary transition-colors">
                    4. Repeat Infringer Policy
                  </a>
                  <a href="#trademarks" className="text-muted-foreground hover:text-primary transition-colors">
                    5. Publisher & Trademark Disclaimer
                  </a>
                  <a href="#submit-form" className="text-muted-foreground hover:text-primary transition-colors">
                    6. Submit a Copyright Notice
                  </a>
                </nav>
              </div>
            </aside>

            {/* Content Body */}
            <article className="prose dark:prose-invert max-w-none lg:col-span-8 space-y-10 text-foreground/90">
              {/* Section 1 */}
              <section id="takedown-policy" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  1. Takedown Policy Overview
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods functions as an open community index for game modifications, scripts, and documentation. It is our policy to respond expeditiously to legitimate notices of alleged copyright infringement in accordance with Title 17, United States Code, Section 512(c).
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Upon receipt of a valid, formal DMCA takedown notice, we will remove or disable access to the material claimed to be infringing.
                </p>
              </section>

              {/* Section 2 */}
              <section id="submit-notice" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  2. Requirements for a DMCA Takedown Notice
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  To be effective, your written notification must include substantially the following information:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                  <li>Identification of the copyrighted work claimed to have been infringed, or a representative list if multiple works are covered.</li>
                  <li>Identification of the material claimed to be infringing or to be the subject of infringing activity, including exact URLs on RDR2 Mods.</li>
                  <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address.</li>
                  <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                  <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
                </ol>
              </section>

              {/* Section 3 */}
              <section id="counter-notice" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  3. Counter-Notification Process
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  If your submitted mod listing was removed due to a copyright notice and you believe this was due to mistake or misidentification, you may submit a written Counter-Notification containing:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>Your name, address, telephone number, and physical or electronic signature.</li>
                  <li>Identification of the material removed and its former location before removal.</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification.</li>
                  <li>Consent to the jurisdiction of the federal court for your judicial district.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="repeat-infringers" className="scroll-mt-24 space-y-3">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  4. Repeat Infringer Policy
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  In accordance with DMCA requirements, RDR2 Mods maintains a policy of terminating account upload privileges for users who are determined to be repeat infringers of intellectual property rights.
                </p>
              </section>

              {/* Section 5 */}
              <section id="trademarks" className="scroll-mt-24 space-y-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm">
                  <AlertTriangle className="size-4 shrink-0" />
                  Trademark & Publisher Notice
                </div>
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  5. Publisher & Trademark Disclaimer
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  RDR2 Mods is not affiliated with Rockstar Games or Take-Two Interactive Software, Inc. All trademarks, game titles, logos, character names, and trade dress belong exclusively to Take-Two Interactive Software, Inc.
                </p>
              </section>

              {/* Section 6 */}
              <section id="submit-form" className="scroll-mt-24 space-y-3 rounded-2xl border border-border/80 bg-card p-6">
                <h2 className="font-display text-xl font-bold tracking-wide sm:text-2xl text-foreground">
                  6. Submit a DMCA Request
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Please submit your formal copyright notice via our online support portal or directly to our legal contact desk.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
                  >
                    <Send className="size-4" />
                    File a DMCA Notice
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
