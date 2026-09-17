import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Github,
  ImagePlus,
  LoaderCircle,
  Upload,
} from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitModIssue } from "@/server-functions/submit-mod";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a Mod | RDR2 Mods" },
      { name: "description", content: "Submit a Red Dead Redemption 2 mod to RDR2 Mods." },
    ],
  }),
  component: UploadMod,
});

const fieldClass =
  "h-11 rounded-lg border-0 bg-surface-glass px-4 shadow-none ring-1 ring-border transition-[box-shadow,background-color] focus-visible:ring-2";

const validationLabels: Record<string, string> = {
  title: "Mod title",
  summary: "Short summary",

  repositoryUrl: "GitHub repository URL",
  tag: "Tag",
  thumbnailDataUrl: "Thumbnail",
};

const tagOptions = [
  { value: "", label: "Select a tag" },
  { value: "redm", label: "RedM" },
  { value: "sp", label: "Single Player" },
];

function getSubmissionErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return "The submission could not be created.";

  try {
    const issues = JSON.parse(error.message) as Array<{
      message?: string;
      path?: Array<string | number>;
    }>;
    if (Array.isArray(issues)) {
      const messages = issues
        .map((issue) => {
          if (!issue.message) return "";
          const field = issue.path?.[0];
          return typeof field === "string" && validationLabels[field]
            ? `${validationLabels[field]}: ${issue.message}`
            : issue.message;
        })
        .filter(Boolean);

      if (messages.length) return messages.join(" ");
    }
  } catch {
    // Non-validation errors already contain a user-facing message.
  }

  return error.message || "The submission could not be created.";
}

function UploadMod() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [issueUrl, setIssueUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailDataUrl, setThumbnailDataUrl] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");

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

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();

    const repositoryUrl = String(formData.get("repositoryUrl") ?? "").trim();
    const tag = String(formData.get("tag") ?? "").trim();
    const githubRepositoryPattern =
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/;

    if (title.length < 3) {
      setFormError("Mod title must be at least 3 characters.");
      return;
    }



    if (!githubRepositoryPattern.test(repositoryUrl)) {
      setFormError(
        "Enter a direct GitHub repository URL, such as https://github.com/owner/repository.",
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
          title,
          repositoryUrl,
          tag,
          thumbnailDataUrl,
        },
      });
      setIssueUrl(result.issueUrl);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setFormError(getSubmissionErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-surface-glass backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="font-display text-2xl text-foreground">
            RDR2<span className="text-primary">·</span>Mods
          </Link>
          <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden font-cond text-sm uppercase text-muted-foreground sm:block">
            Creator submission
          </span>
          <Button
            asChild
            variant="ghost"
            size="compact"
            className="ml-auto transition-[color,background-color,transform] active:scale-[0.96]"
          >
            <Link to="/">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to mods
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-2xl">
          <p className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Share your work
          </p>
          <h1 className="mt-2 font-display text-5xl leading-none sm:text-6xl">Upload a mod</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Add the essentials below. Every submission is reviewed before it appears in the catalog.
          </p>
        </div>

        {submitted && (
          <div
            className="mt-7 flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-sm ring-1 ring-primary/25"
            role="status"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Submission ready for review</p>
              <p className="mt-0.5 text-muted-foreground">
                Your mod was submitted successfully.
              </p>
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                View submission <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {formError && (
          <div
            className="mt-7 rounded-xl bg-destructive/10 p-4 text-sm text-destructive ring-1 ring-destructive/25"
            role="alert"
          >
            <p className="font-semibold">Check your submission</p>
            <p className="mt-0.5">{formError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start"
        >
          <div className="rounded-xl bg-surface-glass p-5 shadow-[0_12px_40px_oklch(0_0_0/0.06)] ring-1 ring-border sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Mod title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  minLength={3}
                  maxLength={100}
                  placeholder="e.g. The Ridge Line"
                  className={fieldClass}
                />
              </div>



              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="repositoryUrl">GitHub repository URL</Label>
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
                    inputMode="url"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="https://github.com/owner/repository"
                    pattern="https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+(?:\.git)?/?"
                    title="Enter a direct GitHub repository URL, such as https://github.com/owner/repository"
                    className={`${fieldClass} pl-11`}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Link directly to the repository—not a profile, release, branch, or file.
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Tag</Label>
                <div className="flex flex-wrap gap-3">
                  {tagOptions
                    .filter((opt) => opt.value !== "")
                    .map((opt) => (
                      <label
                        key={opt.value}
                        className="group flex cursor-pointer items-center gap-2 rounded-lg bg-background/55 px-4 py-2.5 ring-1 ring-border transition-[background-color,box-shadow] hover:bg-background has-[:checked]:bg-primary/10 has-[:checked]:ring-primary"
                      >
                        <input
                          type="radio"
                          name="tag"
                          value={opt.value}
                          required
                          className="size-4 accent-primary"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">Choose the category that best fits your mod.</p>
              </div>
            </div>
          </div>

          <aside className="space-y-5 rounded-xl bg-surface-glass p-5 shadow-[0_12px_40px_oklch(0_0_0/0.06)] ring-1 ring-border">
            <div>
              <h2 className="font-display text-2xl">Thumbnail</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload the image shown on your mod card.
              </p>
            </div>

            <label className="group flex cursor-pointer flex-col items-center rounded-lg bg-background/55 px-4 py-6 text-center ring-1 ring-border transition-[background-color,box-shadow,transform] hover:bg-background focus-within:ring-2 focus-within:ring-ring active:scale-[0.96]">
              {thumbnailDataUrl ? (
                <img
                  src={thumbnailDataUrl}
                  alt="Selected thumbnail preview"
                  className="aspect-[4/3] w-full rounded-md object-cover outline outline-1 outline-black/10 dark:outline-white/10"
                />
              ) : (
                <ImagePlus className="size-7 text-primary" aria-hidden="true" />
              )}
              <span className="mt-3 max-w-full truncate text-sm font-semibold">
                {thumbnailName || "Choose thumbnail"}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                JPG, PNG or WebP · max 5 MB
              </span>
              <input
                type="file"
                name="thumbnail"
                required
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnailChange}
                className="sr-only"
              />
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full transition-[color,background-color,transform] active:scale-[0.96]"
            >
              {isSubmitting ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Upload className="size-4" aria-hidden="true" />
              )}
              {isSubmitting ? "Creating issue…" : "Submit mod"}
            </Button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              By submitting, you confirm that you have permission to share these files.
            </p>
          </aside>
        </form>
      </main>
    </div>
  );
}
