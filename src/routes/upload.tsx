import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  ExternalLink,
  Github,
  ImagePlus,
  LoaderCircle,
  Upload,
  FileText,
  HelpCircle,
  Layers,
  ShieldCheck,
  Tag,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitModIssue } from "@/server-functions/submit-mod";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a Mod | RDR2 Mods" },
      { name: "description", content: "Submit a Red Dead Redemption 2 mod or RedM script to the community catalog." },
    ],
  }),
  component: UploadMod,
});

const fieldClass =
  "h-11 rounded-lg border-0 bg-surface-glass px-4 shadow-none ring-1 ring-border transition-[box-shadow,background-color] focus-visible:ring-2";

const categoryTags = [
  { value: "sp", label: "Single Player (ASI/LML)" },
  { value: "redm", label: "RedM Server Resource" },
  { value: "graphics", label: "Graphics & Reshade" },
  { value: "outfits", label: "Outfits & Character" },
  { value: "vehicles", label: "Horses & Vehicles" },
  { value: "weapons", label: "Weapons & Arsenal" },
];

const prerequisiteOptions = [
  "Script Hook RDR2",
  "Lenny's Mod Loader (LML)",
  "RedM Server Build",
  "Reshade / ENB Framework",
  "Alexander Blade ASI Loader",
];

const licenseOptions = [
  "MIT License",
  "GNU General Public License v3.0",
  "Creative Commons (CC BY 4.0)",
  "Open Community Access",
];

function UploadMod() {
  const [dark, setDark] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [issueUrl, setIssueUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Form State for Preview
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("v1.0.0");
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sp");
  const [selectedLicense, setSelectedLicense] = useState("MIT License");
  const [description, setDescription] = useState("");
  const [selectedPrereqs, setSelectedPrereqs] = useState<string[]>(["Script Hook RDR2"]);
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");

  const handlePrereqToggle = (item: string) => {
    setSelectedPrereqs((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setThumbnailDataUrl("");
    setThumbnailName("");
    setFormError("");

    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setFormError("Upload a JPG, PNG, or WebP thumbnail.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("The thumbnail must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailDataUrl(String(reader.result));
      setThumbnailName(file.name);
    };
    reader.onerror = () => setFormError("The thumbnail could not be read. Choose another image.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setFormError("");
    setIssueUrl("");

    const githubRepositoryPattern =
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/;

    if (title.trim().length < 3) {
      setFormError("Mod title must be at least 3 characters.");
      return;
    }

    if (!githubRepositoryPattern.test(repositoryUrl.trim())) {
      setFormError(
        "Enter a direct GitHub repository URL, such as https://github.com/owner/repository."
      );
      return;
    }

    if (!thumbnailDataUrl) {
      setFormError("Choose a thumbnail image for your mod.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitModIssue({
        data: {
          title: title.trim(),
          repositoryUrl: repositoryUrl.trim(),
          tag: selectedCategory,
          version: version.trim(),
          license: selectedLicense,
          prerequisites: selectedPrereqs.join(", "),
          description: description.trim(),
          thumbnailDataUrl,
        },
      });
      setIssueUrl(result.issueUrl);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "The submission could not be created.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased flex flex-col justify-between">
        <div>
          <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            {/* Title Header */}
            <div className="max-w-3xl border-b border-border/80 pb-6">
              <p className="font-display text-xs uppercase tracking-widest text-primary font-bold">
                Creator Community Portal
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl font-bold">
                Submit a Mod to Catalog
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Index your Red Dead Redemption 2 modification, ASI script, LML mod, or RedM server resource. Submissions generate an open review ticket for community catalog indexing.
              </p>
            </div>

            {/* Status Notifications */}
            {submitted && (
              <div
                className="mt-6 flex items-start gap-4 rounded-2xl bg-emerald-500/10 p-5 text-sm ring-1 ring-emerald-500/30"
                role="status"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-base">Submission Ticket Created Successfully</h3>
                  <p className="mt-1 text-muted-foreground">
                    Your mod submission ticket is registered. Our automated reviewer checks public repository access before publishing to the catalog.
                  </p>
                  <div className="mt-3">
                    <a
                      href={issueUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-emerald-500 active:scale-[0.96]"
                    >
                      View GitHub Review Ticket <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {formError && (
              <div
                className="mt-6 flex items-start gap-3 rounded-2xl bg-destructive/10 p-4 text-sm text-destructive ring-1 ring-destructive/25"
                role="alert"
              >
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Check your submission</p>
                  <p className="mt-0.5 text-xs sm:text-sm">{formError}</p>
                </div>
              </div>
            )}

            {/* Grid Layout: Form vs Live Preview & Guidelines Sidebar */}
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Main Form (8 Columns) */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
                {/* Basic Details Box */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <FileText className="size-4 text-primary" />
                    <h2 className="font-display text-lg font-bold text-foreground">Basic Information</h2>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="title">Mod Title</Label>
                      <Input
                        id="title"
                        name="title"
                        required
                        minLength={3}
                        maxLength={100}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. The Ridge Line Overhaul"
                        className={fieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="version">Release Version</Label>
                      <Input
                        id="version"
                        name="version"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        placeholder="v1.0.0"
                        className={fieldClass}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="license">License Type</Label>
                      <select
                        id="license"
                        name="license"
                        value={selectedLicense}
                        onChange={(e) => setSelectedLicense(e.target.value)}
                        className={`${fieldClass} w-full text-foreground bg-background cursor-pointer`}
                      >
                        {licenseOptions.map((lic) => (
                          <option key={lic} value={lic}>
                            {lic}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="repositoryUrl">GitHub Repository URL</Label>
                      <div className="relative">
                        <Github
                          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          id="repositoryUrl"
                          name="repositoryUrl"
                          type="url"
                          required
                          value={repositoryUrl}
                          onChange={(e) => setRepositoryUrl(e.target.value)}
                          placeholder="https://github.com/owner/repository"
                          className={`${fieldClass} pl-11`}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Direct public GitHub repository link (e.g., https://github.com/owner/repository).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category & Requirements Box */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <Layers className="size-4 text-primary" />
                    <h2 className="font-display text-lg font-bold text-foreground">Category & Requirements</h2>
                  </div>

                  {/* Category Radio Group */}
                  <div className="space-y-2">
                    <Label>Category Classification</Label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {categoryTags.map((cat) => (
                        <label
                          key={cat.value}
                          className={`flex cursor-pointer items-center justify-between rounded-xl p-3 border text-xs font-medium transition-all ${
                            selectedCategory === cat.value
                              ? "border-primary bg-primary/10 text-primary font-semibold"
                              : "border-border/80 bg-background/50 hover:bg-accent text-foreground/90"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="tag"
                              value={cat.value}
                              checked={selectedCategory === cat.value}
                              onChange={() => setSelectedCategory(cat.value)}
                              className="sr-only"
                            />
                            <span>{cat.label}</span>
                          </div>
                          {selectedCategory === cat.value && <CheckCircle2 className="size-3.5 text-primary" />}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites Checklist */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <Label>Required Prerequisites</Label>
                      <Link to="/guide" target="_blank" className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1">
                        Setup Guide <ExternalLink className="size-3" />
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prerequisiteOptions.map((prereq) => {
                        const isChecked = selectedPrereqs.includes(prereq);
                        return (
                          <button
                            type="button"
                            key={prereq}
                            onClick={() => handlePrereqToggle(prereq)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                              isChecked
                                ? "border-primary bg-primary/10 text-primary font-semibold"
                                : "border-border/80 bg-background/50 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {prereq}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Description & Installation Steps Box */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <Tag className="size-4 text-primary" />
                    <h2 className="font-display text-lg font-bold text-foreground">Description & Installation Instructions</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Mod Overview & Setup Guide</Label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what your mod does, key controls, configuration files, and installation steps (e.g., place ASI file in root game folder)..."
                      className="rounded-xl border-border bg-background p-4 text-sm leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground">
                      Markdown formatting supported. Detail keybinds, prerequisites, and compatibility notes.
                    </p>
                  </div>
                </div>

                {/* Submit Action Box */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border/80 bg-card p-6">
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    By submitting, you confirm compliance with our <Link to="/guidelines" className="text-primary hover:underline font-medium">Community Guidelines</Link> and <Link to="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>.
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="shrink-0 transition-transform active:scale-[0.96]"
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Upload className="size-4" aria-hidden="true" />
                    )}
                    {isSubmitting ? "Creating Ticket..." : "Submit Mod for Review"}
                  </Button>
                </div>
              </form>

              {/* Sidebar Column: Thumbnail & Live Preview + Moderation FAQ (5 Columns) */}
              <aside className="lg:col-span-5 space-y-8">
                {/* Thumbnail Uploader Box */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">Mod Thumbnail</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Upload the card preview image for the catalog listing.
                    </p>
                  </div>

                  <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-background/50 px-4 py-8 text-center transition-all hover:border-primary/50 hover:bg-background focus-within:ring-2 focus-within:ring-primary active:scale-[0.98]">
                    {thumbnailDataUrl ? (
                      <img
                        src={thumbnailDataUrl}
                        alt="Selected thumbnail preview"
                        className="aspect-[16/9] w-full rounded-lg object-cover outline outline-1 outline-black/10 dark:outline-white/10 shadow-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImagePlus className="size-8 text-primary mb-2" aria-hidden="true" />
                        <span className="text-sm font-semibold text-foreground">
                          {thumbnailName || "Click to upload image"}
                        </span>
                        <span className="mt-1 text-xs text-muted-foreground">
                          JPG, PNG or WebP · Max 5 MB
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      name="thumbnail"
                      required
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleThumbnailChange}
                      className="sr-only"
                    />
                  </label>
                </div>


                {/* Submission FAQ Card */}
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <HelpCircle className="size-4 text-primary" />
                    <h2 className="font-display text-lg font-bold text-foreground">Submission FAQ</h2>
                  </div>

                  <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">How does catalog moderation work?</h3>
                      <p className="mt-1">
                        Submitting this form generates an open GitHub review ticket. Our automated system checks repository access, license details, and single-player/RedM safety before publishing to the live catalog.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground text-sm">What repositories are accepted?</h3>
                      <p className="mt-1">
                        Direct public GitHub repository URLs containing mod source code, ASI binaries, LML configurations, or RedM resources.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground text-sm">Need to update your mod?</h3>
                      <p className="mt-1">
                        Publishing a new release tag or updating your GitHub repository automatically syncs details across the community index.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
