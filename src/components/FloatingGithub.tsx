import { Github } from "lucide-react";

export function FloatingGithub() {
  return (
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub"
      title="View GitHub Repository"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-2.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-card hover:text-primary hover:scale-105 active:scale-95 group"
    >
      <Github className="size-4 text-foreground group-hover:text-primary transition-colors shrink-0" />
      <span className="hidden sm:inline font-mono text-[11px] tracking-wide">GitHub</span>
    </a>
  );
}
