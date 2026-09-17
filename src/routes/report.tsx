import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Flag,
  Github,
  Info,
  ShieldAlert,
  Send,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSeoMeta, SchemaOrg } from "@/lib/seo";

interface ReportSearch {
  mod?: string;
  modUrl?: string;
}

export const Route = createFileRoute("/report")({
  validateSearch: (search: Record<string, unknown>): ReportSearch => {
    return {
      mod: typeof search.mod === "string" ? search.mod : undefined,
      modUrl: typeof search.modUrl === "string" ? search.modUrl : undefined,
    };
  },
  head: () =>
    generateSeoMeta({
      title: "Report a Mod Listing - RDR2 Mods Catalog Safety",
      description: "Report a broken, inaccurate, unsafe, or copyright-violating mod listing on RDR2 Mods. Help keep the community catalog safe and accurate.",
      keywords: ["Report RDR2 Mod", "RDR2 Mod Safety", "Flag Broken RDR2 Mod", "RDR2 Mod Removal"],
      path: "/report",
      image: "/banner.png",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "ReportPage",
          name: "Report RDR2 Mod Listing",
          url: "https://rdr2mods.in/report",
        },
        SchemaOrg.breadcrumb([
          { name: "Home", item: "/" },
          { name: "Catalog", item: "/catalog" },
          { name: "Report Mod", item: "/report" },
        ]),
      ],
    }),
  component: ReportPage,
});

function ReportPage() {
  const search = useSearch({ from: "/report" });
  const navigate = useNavigate();

  const [dark, setDark] = useState(true);
  const [modTitle, setModTitle] = useState(search.mod || "");
  const [modUrl, setModUrl] = useState(search.modUrl || "");
  const [reason, setReason] = useState("broken");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (search.mod) {
      setModTitle(search.mod);
    }
    if (search.modUrl) {
      setModUrl(search.modUrl);
    }
  }, [search.mod, search.modUrl]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors flex flex-col justify-between">
        <div>
          <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

          <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
            {/* Navigation back button */}
            <div className="mb-6">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to Catalog
              </Link>
            </div>

            {/* Header Banner */}
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl text-foreground">
                Report a <span className="text-primary font-bold">Mod Listing</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Help us keep RDR2 Mods reliable and safe. Report broken links, incorrect metadata, malicious code, or intellectual property concerns.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              {/* Form Section */}
              <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8 relative overflow-hidden">
                {submitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto size-16 text-emerald-500" />
                    <h2 className="mt-4 font-display text-3xl text-foreground">Report Submitted</h2>
                    <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Thank you for bringing this to our attention. Our moderation automated checks and maintainers will review the listing for <span className="font-semibold text-foreground">{modTitle || "the reported mod"}</span> shortly.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setModTitle("");
                          setModUrl("");
                          setDetails("");
                        }}
                        variant="outline"
                        className="rounded-full active:scale-[0.98]"
                      >
                        Submit another report
                      </Button>
                      <Button
                        onClick={() => navigate({ to: "/catalog" })}
                        className="rounded-full shadow-md shadow-primary/25 active:scale-[0.98]"
                      >
                        Return to Catalog
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Pre-filled Mod Title */}
                    <div className="space-y-2">
                      <Label htmlFor="modTitle" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FileText className="size-3.5 text-primary" />
                        Target Mod Title / Name
                      </Label>
                      <Input
                        id="modTitle"
                        required
                        value={modTitle}
                        onChange={(e) => setModTitle(e.target.value)}
                        placeholder="e.g. Script Hook RDR2"
                        className="rounded-xl border-border/80 bg-background font-semibold text-foreground"
                      />
                    </div>

                    {/* Repository / Download URL */}
                    <div className="space-y-2">
                      <Label htmlFor="modUrl" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Repository or Listing Link (Optional)
                      </Label>
                      <Input
                        id="modUrl"
                        type="url"
                        value={modUrl}
                        onChange={(e) => setModUrl(e.target.value)}
                        placeholder="https://github.com/user/repository"
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>

                    {/* Reason Select */}
                    <div className="space-y-2">
                      <Label htmlFor="reason" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Reason for Report
                      </Label>
                      <select
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="broken">Broken Download Link / Repository 404</option>
                        <option value="malicious">Security Risk / Potentially Unsafe Executable</option>
                        <option value="misleading">Inaccurate Information or Compatibility Info</option>
                        <option value="copyright">Copyright / DMCA Infringement</option>
                        <option value="duplicate">Duplicate Mod Listing</option>
                        <option value="other">Other Policy Violation</option>
                      </select>
                    </div>

                    {/* Reporter Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Contact Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>

                    {/* Explanation details */}
                    <div className="space-y-2">
                      <Label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Detailed Explanation of Issue
                      </Label>
                      <Textarea
                        id="details"
                        rows={5}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Please describe what is wrong with this mod listing, error messages, or evidence..."
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full py-3 shadow-md shadow-primary/25 active:scale-[0.98] font-semibold"
                    >
                      <Send className="mr-2 size-4" />
                      {isSubmitting ? "Submitting Report..." : "Submit Mod Report"}
                    </Button>
                  </form>
                )}
              </div>

              {/* Sidebar Info Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <ShieldAlert className="size-6 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-xl text-foreground">Catalog Verification</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        All listings index open-source GitHub repositories. If a repository has been deleted or set to private, our automated scanner flags it for review.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://github.com/forzayt/RDR2_Mods/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                >
                  <img
                    src="/RedDeadOnline_Artwork_BountyHunter_Expansion_Character_PNG_Transparent.png"
                    alt=""
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 h-20 sm:h-24 max-w-[35%] object-contain object-bottom pointer-events-none opacity-45 group-hover:opacity-85 transition-opacity duration-300"
                  />
                  <div className="relative z-10 flex items-center gap-3.5 max-w-[65%]">
                    <Github className="size-6 text-foreground shrink-0 group-hover:text-primary transition-colors" />
                    <div>
                      <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                        GitHub Issues
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Report malicious repositories directly to maintainers on GitHub
                      </p>
                    </div>
                  </div>
                </a>

                <Link
                  to="/dmca"
                  className="group relative block overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
                >
                  <div className="relative z-10 flex items-center gap-3.5">
                    <AlertTriangle className="size-6 text-rose-500 shrink-0 group-hover:text-rose-400 transition-colors" />
                    <div>
                      <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                        DMCA Policy
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Read our copyright infringement takedown and notice policies
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* FAQ / Guidance Section */}
            <div className="mt-16 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-semibold">
                <Info className="size-4" />
                Moderation Standard
              </div>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl text-foreground">Report FAQs</h2>

              <Accordion type="single" collapsible className="mt-6 w-full space-y-2">
                <AccordionItem value="item-1" className="border border-border/60 rounded-2xl px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-foreground">
                    What happens after I submit a report?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Our catalog validation scripts will perform an automated check on the target repository link. Maintainers are notified to verify the listing, update metadata, or delist broken/unsafe repositories.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="border border-border/60 rounded-2xl px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-foreground">
                    How long does review take?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Automated validation runs continuously. Reports regarding broken links or security concerns are typically reviewed within 24 to 48 hours.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="border border-border/60 rounded-2xl px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-foreground">
                    What if a mod violates copyright or license terms?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    If you are the copyright holder or authorized representative of an asset, please select "Copyright / DMCA Infringement" or visit our dedicated DMCA Takedown page for formal notices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
