import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Github, ImagePlus, Upload } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload a Mod | Saddle Market" },
      { name: "description", content: "Submit a Red Dead Redemption 2 mod to Saddle Market." },
    ],
  }),
  component: UploadMod,
});

const fieldClass =
  "h-11 rounded-lg border-0 bg-surface-glass px-4 shadow-none ring-1 ring-border transition-[box-shadow,background-color] focus-visible:ring-2";

function UploadMod() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setFormError("");

    const formData = new FormData(event.currentTarget);
    const repositoryUrl = String(formData.get("repositoryUrl") ?? "").trim();
    const thumbnail = formData.get("thumbnail");
    const githubRepositoryPattern = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/;

    if (!githubRepositoryPattern.test(repositoryUrl)) {
      setFormError("Enter a direct GitHub repository URL, such as https://github.com/owner/repository.");
      return;
    }

    if (!(thumbnail instanceof File) || thumbnail.size === 0) {
      setFormError("Choose a thumbnail image for your mod.");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(thumbnail.type)) {
      setFormError("The thumbnail must be a JPG, PNG, or WebP image.");
      return;
    }

    if (thumbnail.size > 10 * 1024 * 1024) {
      setFormError("The thumbnail must be smaller than 10 MB.");
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      <header className="sticky top-0 z-30 border-b border-border bg-surface-glass backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" className="font-display text-2xl text-foreground">
            SADDLE<span className="text-primary">·</span>MARKET
          </Link>
          <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden font-cond text-sm uppercase text-muted-foreground sm:block">Creator submission</span>
          <Button asChild variant="ghost" size="compact" className="ml-auto transition-[color,background-color,transform] active:scale-[0.96]">
            <Link to="/">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to mods
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-2xl">
          <p className="font-cond text-sm font-semibold uppercase tracking-[0.16em] text-primary">Share your work</p>
          <h1 className="mt-2 font-display text-5xl leading-none sm:text-6xl">Upload a mod</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Add the essentials below. Every submission is reviewed before it appears in the catalog.
          </p>
        </div>

        {submitted && (
          <div className="mt-7 flex items-start gap-3 rounded-xl bg-primary/10 p-4 text-sm ring-1 ring-primary/25" role="status">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">Submission ready for review</p>
              <p className="mt-0.5 text-muted-foreground">Your form was accepted locally. Connect the upload API to publish submissions.</p>
            </div>
          </div>
        )}

        {formError && (
          <div className="mt-7 rounded-xl bg-destructive/10 p-4 text-sm text-destructive ring-1 ring-destructive/25" role="alert">
            <p className="font-semibold">Check your submission</p>
            <p className="mt-0.5">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="rounded-xl bg-surface-glass p-5 shadow-[0_12px_40px_oklch(0_0_0/0.06)] ring-1 ring-border sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Mod title</Label>
                <Input id="title" name="title" required placeholder="e.g. The Ridge Line" className={fieldClass} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select id="category" name="category" required defaultValue="" className={`${fieldClass} w-full text-sm outline-none`}>
                  <option value="" disabled>Select a category</option>
                  <option>Weapons</option>
                  <option>Horses</option>
                  <option>Towns</option>
                  <option>Landscapes</option>
                  <option>Characters</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input id="version" name="version" required placeholder="1.0.0" className={fieldClass} />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="summary">Short summary</Label>
                <Input id="summary" name="summary" required maxLength={140} placeholder="What makes this mod worth installing?" className={fieldClass} />
                <p className="text-xs text-muted-foreground">Keep it concise—140 characters maximum.</p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required placeholder="Describe the changes, installation steps, and compatibility notes." className="min-h-40 rounded-lg border-0 bg-surface-glass px-4 py-3 shadow-none ring-1 ring-border transition-[box-shadow,background-color] focus-visible:ring-2" />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="repositoryUrl">GitHub repository URL</Label>
                <div className="relative">
                  <Github className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input id="repositoryUrl" name="repositoryUrl" type="url" required inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="https://github.com/owner/repository" pattern="https://github\.com/[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+(?:\.git)?/?" title="Enter a direct GitHub repository URL, such as https://github.com/owner/repository" className={`${fieldClass} pl-11`} />
                </div>
                <p className="text-xs text-muted-foreground">Link directly to the repository—not a profile, release, branch, or file.</p>
              </div>
            </div>
          </div>

          <aside className="space-y-5 rounded-xl bg-surface-glass p-5 shadow-[0_12px_40px_oklch(0_0_0/0.06)] ring-1 ring-border">
            <div>
              <h2 className="font-display text-2xl">Files</h2>
              <p className="mt-1 text-sm text-muted-foreground">Add the image shown on your mod card.</p>
            </div>

            <label className="group flex cursor-pointer flex-col items-center rounded-lg bg-background/55 px-4 py-6 text-center ring-1 ring-border transition-[background-color,box-shadow,transform] hover:bg-background active:scale-[0.96]">
              <ImagePlus className="size-6 text-primary" aria-hidden="true" />
              <span className="mt-2 text-sm font-semibold">Choose thumbnail</span>
              <span className="mt-1 text-xs text-muted-foreground">JPG, PNG or WebP · max 10 MB</span>
              <input type="file" name="thumbnail" required accept="image/jpeg,image/png,image/webp" className="sr-only" />
            </label>

            <Button type="submit" className="w-full transition-[color,background-color,transform] active:scale-[0.96]">
              <Upload className="size-4" aria-hidden="true" />
              Submit mod
            </Button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">By submitting, you confirm that you have permission to share these files.</p>
          </aside>
        </form>
      </main>
    </div>
  );
}
