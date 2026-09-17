"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      title="Scroll to top"
      className="fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary hover:text-primary-foreground active:scale-[0.96] cursor-pointer group animate-in fade-in slide-in-from-bottom-3"
    >
      <ChevronUp className="size-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}
