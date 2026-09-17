import { Link, createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileQuestion,
  Github,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { type FormEvent, useState } from "react";

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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Support | RDR2 Mods" },
      { name: "description", content: "Get in touch with the RDR2 Mods community team or report issues." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [dark, setDark] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Have questions about mod submissions, RedM scripts, or catalog listings? Send us a message or join our community discussions.
            </p>
          </div>

          {/* Main Grid: Form + Info cards */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto size-14 text-emerald-500" />
                  <h2 className="mt-4 font-display text-3xl">Message Received</h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out. A community moderator or contributor will review your message shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="mt-6 rounded-full"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Your Name / Handle
                      </Label>
                      <Input
                        id="name"
                        required
                        placeholder="e.g. Arthur Morgan"
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="arthur@outlaws.com"
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Topic
                    </Label>
                    <select
                      id="topic"
                      className="w-full rounded-xl border border-border/80 bg-background px-3.5 py-2.5 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="submission">Mod Submission Help</option>
                      <option value="bug">Report Broken Link / Repository</option>
                      <option value="redm">RedM Script Question</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Describe your inquiry or question in detail..."
                      className="rounded-xl border-border/80 bg-background"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full py-3 shadow-md shadow-primary/25 active:scale-[0.98]"
                  >
                    <Send className="mr-2 size-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Info Cards Side */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href="https://github.com/forzayt/RDR2_Mods/issues"
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <Github className="size-6 text-foreground shrink-0 group-hover:text-primary transition-colors" />
                  <div>
                    <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                      GitHub Issues
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Report bugs or request new features directly on GitHub
                    </p>
                  </div>
                </div>
              </a>

              <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <Mail className="size-6 text-foreground shrink-0" />
                  <div>
                    <h3 className="font-display text-xl">Direct Email</h3>
                    <p className="text-xs text-muted-foreground">
                      support@rdr2mods.community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="mt-16 rounded-3xl border border-border/80 bg-card p-6 shadow-sm sm:p-10">
            <h2 className="font-display text-3xl sm:text-4xl">Help & Guidelines</h2>

            <Accordion type="single" collapsible className="mt-6 w-full space-y-2">
              <AccordionItem value="item-1" className="border border-border/60 rounded-2xl px-4">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  How do I submit my RDR2 or RedM mod to the catalog?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Head over to the Upload Mod page, provide your GitHub repository link along with mod details and thumbnail. Submissions generate a GitHub pull request or issue for community verification.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border/60 rounded-2xl px-4">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  Are the scripts safe and open source?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Yes, every mod indexed on RDR2 Mods links directly to an open public repository on GitHub where the source code is transparent and inspectable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border/60 rounded-2xl px-4">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                  How can I update my listed mod's details or thumbnail?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  Updates can be submitted by submitting an issue on our GitHub repository referencing your mod's repository link.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </main>

        <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
          <p>RDR2 Mods Support & Community Center</p>
        </footer>
      </div>
    </div>
  );
}
