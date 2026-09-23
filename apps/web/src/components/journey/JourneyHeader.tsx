import React, { useState, useEffect } from "react";
import { AudioToggle } from "./AudioToggle";

interface JourneyHeaderProps {
  activeSceneId: string | number;
  onOpenBeginModal?: () => void;
}

export function JourneyHeader({ activeSceneId, onOpenBeginModal }: JourneyHeaderProps) {
  const idNum = Number(activeSceneId);
  const [isPastCinematic, setIsPastCinematic] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const lastRunway = document.getElementById("runway-18");
      if (!lastRunway) return;
      const rect = lastRunway.getBoundingClientRect();
      // True when user scrolls past the final runway into the product/footer section
      setIsPastCinematic(rect.bottom <= 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleCtaClick = () => {
    if (isPastCinematic) {
      if (onOpenBeginModal) onOpenBeginModal();
      else document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    } else if (idNum === 1) {
      document.getElementById("runway-2")?.scrollIntoView({ behavior: "smooth" });
    } else {
      if (onOpenBeginModal) onOpenBeginModal();
      else document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-6 py-4 md:px-12 md:py-5 flex items-center justify-between pointer-events-auto ${
        isPastCinematic
          ? "bg-paper/92 text-charcoal backdrop-blur-md border-b border-hairline shadow-xs"
          : "bg-transparent text-ivory"
      }`}
    >
      {/* Brand logo (Top Left) */}
      <div className="flex flex-col">
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`font-sans text-xs sm:text-sm tracking-[0.3em] font-bold transition-colors duration-300 ${
            isPastCinematic 
              ? "text-charcoal hover:text-brass-deep" 
              : "text-ivory drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] hover:text-wheat"
          }`}
        >
          ALTHEARA
        </a>
      </div>

      {/* Full Navigation Links (Revealed ONLY in Product/Footer Section) */}
      <nav 
        className={`hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
          isPastCinematic 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-bark hover:text-charcoal transition-colors cursor-pointer"
        >
          Experience
        </button>
        <button 
          onClick={() => document.getElementById("runway-8")?.scrollIntoView({ behavior: "smooth" })}
          className="text-bark hover:text-charcoal transition-colors cursor-pointer"
        >
          How It Grows
        </button>
        <button 
          onClick={() => document.getElementById("runway-13")?.scrollIntoView({ behavior: "smooth" })}
          className="text-bark hover:text-charcoal transition-colors cursor-pointer"
        >
          The Artifact
        </button>
        <button 
          onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          className="text-bark hover:text-charcoal transition-colors cursor-pointer"
        >
          Pricing
        </button>
        <a 
          href="#pricing" 
          className="text-bark hover:text-charcoal transition-colors"
        >
          Sign In
        </a>
      </nav>

      {/* Header Actions (Top Right: Ambient Audio Toggle + Begin Story CTA) */}
      <div className="flex items-center gap-3">
        <AudioToggle isPastCinematic={isPastCinematic} />
        <button
          onClick={handleCtaClick}
          className={`font-sans text-xs uppercase tracking-[0.22em] font-bold px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isPastCinematic
              ? "bg-charcoal text-paper hover:bg-hearth shadow-sm"
              : idNum === 1
              ? "bg-wheat text-espresso hover:bg-wheat/90 shadow-[0_2px_12px_rgba(201,174,124,0.3)]"
              : "border border-linen/30 text-linen hover:bg-linen/10 hover:text-ivory backdrop-blur-sm shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          }`}
        >
          Begin Story
        </button>
      </div>
    </header>
  );
}
