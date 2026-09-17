import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingGithub } from "@/components/FloatingGithub";

function NotFoundComponent() {
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-background font-body text-foreground antialiased transition-colors flex flex-col justify-between">
        <Navbar dark={dark} onToggleDark={() => setDark(!dark)} />

        <main className="mx-auto my-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          {/* Western Style Wanted Header Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            Outlaw Territory — Error 404
          </div>

          {/* Huge Display Code */}
          <h1 className="mt-6 font-display text-7xl font-extrabold tracking-tight text-foreground sm:text-9xl">
            404
          </h1>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            You've Wandered Off The Map
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed sm:text-base">
            This trail ends in a dead canyon. The page or mod file you are looking for has been moved, removed, or never existed in these territories.
          </p>

          {/* Action Navigation Grid */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-[0.96]"
            >
              Return to Camp
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.96]"
            >
              Browse Mod Catalog
            </Link>
            <Link
              to="/guide"
              className="inline-flex items-center justify-center rounded-full border border-border/80 bg-card px-6 py-3 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.96]"
            >
              Setup Guides
            </Link>
          </div>

          {/* Quick Helpful Links Box */}
          <div className="mt-12 rounded-2xl border border-border/80 bg-card p-6 shadow-sm text-left max-w-2xl mx-auto space-y-4">
            <h3 className="font-display text-base font-bold text-foreground">
              Looking for something specific?
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                to="/catalog"
                className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors block"
              >
                <div className="font-semibold text-primary">Mod Catalog</div>
                <div className="text-muted-foreground text-[11px] mt-0.5">Explore scripts, trainers & textures</div>
              </Link>
              <Link
                to="/upload"
                className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors block"
              >
                <div className="font-semibold text-primary">Upload Mod</div>
                <div className="text-muted-foreground text-[11px] mt-0.5">Share your creation with outlaws</div>
              </Link>
              <Link
                to="/guide"
                className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/40 transition-colors block"
              >
                <div className="font-semibold text-primary">Modding Tutorials</div>
                <div className="text-muted-foreground text-[11px] mt-0.5">Script Hook, LML, RedM & ReShade</div>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RDR2 Mods" },
      { name: "description", content: "Browse community-made mods for Red Dead Redemption 2." },
      { name: "author", content: "RDR2 Mods" },
      { property: "og:title", content: "RDR2 Mods" },
      { property: "og:description", content: "Browse community-made mods for Red Dead Redemption 2." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600&display=swap" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <FloatingGithub />
    </QueryClientProvider>
  );
}
