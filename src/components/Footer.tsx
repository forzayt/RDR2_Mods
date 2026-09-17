import { Link } from "@tanstack/react-router";
import rdr2Logo from "@/assets/rdr2mods.png";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-card/50 text-foreground transition-colors">
      <div className="mx-auto max-w-[1920px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-6 lg:col-span-5">
            <Link to="/" className="inline-block transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <img src={rdr2Logo} alt="RDR2 Mods Logo" className="h-11 sm:h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] dark:drop-shadow-none transition-all" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground font-body">
              The open community catalog for Red Dead Redemption 2 modifications, server scripts, and standalone enhancements.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-6 lg:col-span-7 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-base tracking-wide text-foreground uppercase">Explore</h3>
              <ul className="mt-3 space-y-2 text-sm font-body">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                    Full Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/activity" className="text-muted-foreground hover:text-primary transition-colors">
                    Activity Feed
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base tracking-wide text-foreground uppercase">Community</h3>
              <ul className="mt-3 space-y-2 text-sm font-body">
                <li>
                  <Link to="/upload" className="text-muted-foreground hover:text-primary transition-colors">
                    Submit Mod
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-base tracking-wide text-foreground uppercase">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm font-body">
                <li>
                  <span className="text-muted-foreground">Community Guidelines</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Open Source License</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row font-body">
          <p>
            RDR2 Mods is a community project and is not affiliated with Rockstar Games or Take-Two Interactive.
          </p>
          <p className="shrink-0 font-medium">
            Powered by community contributors
          </p>
        </div>
      </div>
    </footer>
  );
}
