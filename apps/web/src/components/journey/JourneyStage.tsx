import React from "react";
import { journeyAssets } from "@/data/journeyAssets";
import { LivingMedia } from "./LivingMedia";
import { JourneyScene } from "@/data/journeyScenes";
import { ParticleWordmarkIntro } from "./ParticleWordmarkIntro";

interface JourneyStageProps {
  activeSceneId: string | number;
  activeSceneIndex: number;
  activeSceneProgress?: number;
  scenes: JourneyScene[];
}

export function JourneyStage({
  activeSceneId,
  activeSceneIndex,
  activeSceneProgress,
  scenes,
}: JourneyStageProps) {
  const currentScene = scenes[activeSceneIndex];

  // 1. UNIQUE ACTIVE ASSET TRACKING (Preserves bottom layer to eliminate gray/black dips)
  const prevScene = scenes[activeSceneIndex - 1];
  const nextScene = scenes[activeSceneIndex + 1];

  const activeAssets = Array.from(
    new Set(
      [
        prevScene?.mediaId,
        currentScene?.mediaId,
        nextScene?.mediaId,
      ].filter(Boolean)
    )
  ) as string[];

  // 2. LAYER OPACITY & DISSOLVE CALCULATIONS
  // Incoming image dissolves on TOP of outgoing image; outgoing stays at 100% to prevent black bleed
  const getAssetStyles = (assetId: string) => {
    const isCurrentAsset = currentScene?.mediaId === assetId;
    const isPrevAsset = prevScene?.mediaId === assetId && prevScene.mediaId !== currentScene?.mediaId;
    const isNextAsset = nextScene?.mediaId === assetId && nextScene.mediaId !== currentScene?.mediaId;

    let opacity = "0";
    let scale = "1.0";
    let translateX = "0px";
    const translateY = "0px";
    let origin = "center";
    let zIndex = 1;

    if (assetId === "cottage_doorway" || assetId === "cottage") {
      origin = "50% 46%";
    } else if (assetId === "volume") {
      origin = "50% 65%";
    }

    if (isCurrentAsset) {
      zIndex = 2;
      opacity = "1"; // Keep active image at 100% opacity so next image dissolves smoothly on top
      
      if (assetId === "cottage_doorway") {
        scale = `calc(1.02 + 0.03 * var(--progress-scene-${currentScene.id}, 0) + 1.8 * clamp(0, (var(--progress-scene-${currentScene.id}, 0) - 0.78) / 0.22, 1))`;
      } else if (assetId === "volume") {
        scale = `calc(1.04 + 0.05 * var(--progress-scene-${currentScene.id}, 0))`;
      } else {
        scale = `calc(1.0 + 0.05 * var(--progress-scene-${currentScene.id}, 0))`;
      }

      // Camera panning bends
      if ([2, 4, 6, 8].includes(activeSceneIndex)) {
        translateX = `calc(-2% * var(--progress-scene-${currentScene.id}, 0))`;
      } else if ([3, 5, 7, 9].includes(activeSceneIndex)) {
        translateX = `calc(2% * var(--progress-scene-${currentScene.id}, 0))`;
      }
    } else if (isPrevAsset && prevScene) {
      zIndex = 1;
      // Previous asset remains solid underneath until cleanly unmounted
      opacity = `calc(1 - clamp(0, (var(--progress-scene-${prevScene.id}, 0) - 0.95) / 0.05, 1))`;
      scale = prevScene.mediaId === "cottage_doorway" ? "2.6" : "1.05";
    } else if (isNextAsset && nextScene) {
      zIndex = 3;
      // Incoming asset dissolves in on top during the final 18% of current scene runway
      opacity = `clamp(0, (var(--progress-scene-${currentScene.id}, 0) - 0.82) / 0.18, 1)`;
      scale = `calc(0.98 + 0.02 * clamp(0, (var(--progress-scene-${currentScene.id}, 0) - 0.82) / 0.18, 1))`;
    }

    return { opacity, scale, translateX, translateY, origin, zIndex };
  };

  // 3. COPY SAFE CONTAINER POSITIONING
  const getCopyAlignment = (sceneId: number) => {
    switch (sceneId) {
      case 1: return "mr-auto text-left max-w-xl"; // Cottage Left
      case 2: return "mr-auto text-left max-w-xl"; // Doorway Left
      case 3: return "ml-auto text-right max-w-lg"; // Breakfast Right
      case 4: return "mr-auto text-left max-w-lg"; // Graduation Left
      case 6: return "mr-auto text-left max-w-lg"; // Job Left
      case 7: return "mr-auto text-left max-w-lg"; // Family hand Left
      case 9: return "ml-auto text-right max-w-lg"; // Wedding Right
      case 10: return "ml-auto text-right max-w-lg"; // Loss Right
      case 11: return "ml-auto text-right max-w-lg"; // Continuation Right
      case 13: return "mr-auto text-left max-w-lg"; // Open Volume Left
      case 14: return "mr-auto text-left max-w-lg"; // Lake Approach Left
      case 15: return "mr-auto text-left max-w-lg"; // Volume Lake Left
      case 16: return "mr-auto text-left max-w-lg"; // Closed book Left
      case 17: return "ml-auto text-right max-w-lg"; // Library Shelf Right
      default: return "mr-auto text-left max-w-lg";
    }
  };

  // 4. RHYTHMIC NON-OVERLAPPING TEXT TIMINGS
  const getCopyStyles = (sceneIdx: number) => {
    const isCurrent = sceneIdx === activeSceneIndex;
    if (!isCurrent) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };

    const sceneProgress = `var(--progress-scene-${sceneIdx + 1}, 0)`;

    // Scene 1 (Hero): Fades in as Particle Wordmark dissolves (0.10 -> 0.28), holds until 0.72, fades out 0.72 -> 0.82
    if (sceneIdx === 0) {
      return {
        opacity: `calc(
          clamp(0, (${sceneProgress} - 0.10) / 0.18, 1) * 
          (1 - clamp(0, (${sceneProgress} - 0.72) / 0.10, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${sceneProgress} - 0.10) / 0.18, 1) - 8px * clamp(0, (${sceneProgress} - 0.72) / 0.10, 1)))`
      };
    }

    // Standard scenes:
    // Fade-in: 0.12 -> 0.22 (after scene settles)
    // Hold: 0.22 -> 0.72 (generous reading dwell)
    // Fade-out: 0.72 -> 0.82 (fully dissolved before image crossfade starts at 0.82)
    return {
      opacity: `calc(
        clamp(0, (${sceneProgress} - 0.12) / 0.10, 1) * 
        (1 - clamp(0, (${sceneProgress} - 0.72) / 0.10, 1))
      )`,
      transform: `translateY(calc(12px - 12px * clamp(0, (${sceneProgress} - 0.12) / 0.10, 1) - 8px * clamp(0, (${sceneProgress} - 0.72) / 0.10, 1)))`
    };
  };

  // Scene 2: Threshold / Doorway Thesis Timing
  const getDoorwayStyles = (phase: "headline" | 1 | 2 | 3 | 4) => {
    if (activeSceneIndex !== 1) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-2, 0)`;

    if (phase === "headline") {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.03) / 0.06, 1) * 
          (1 - clamp(0, (${p} - 0.78) / 0.05, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.03) / 0.06, 1) - 8px * clamp(0, (${p} - 0.78) / 0.05, 1)))`
      };
    } else if (phase === 1) {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.06) / 0.06, 1) * 
          (1 - clamp(0, (${p} - 0.25) / 0.05, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.06) / 0.06, 1) - 8px * clamp(0, (${p} - 0.25) / 0.05, 1)))`
      };
    } else if (phase === 2) {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.28) / 0.06, 1) * 
          (1 - clamp(0, (${p} - 0.54) / 0.05, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.28) / 0.06, 1) - 8px * clamp(0, (${p} - 0.54) / 0.05, 1)))`
      };
    } else if (phase === 3) {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.57) / 0.06, 1) * 
          (1 - clamp(0, (${p} - 0.78) / 0.05, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.57) / 0.06, 1) - 8px * clamp(0, (${p} - 0.78) / 0.05, 1)))`
      };
    } else {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.82) / 0.05, 1) * 
          (1 - clamp(0, (${p} - 0.96) / 0.04, 1))
        )`,
        transform: `translateY(calc(14px - 14px * clamp(0, (${p} - 0.82) / 0.05, 1) - 8px * clamp(0, (${p} - 0.96) / 0.04, 1)))`
      };
    }
  };

  // Morph reveals (Scene 7 Family hand, Scene 10 Loss)
  const getMorphStyles = (sceneIdx: number, type: "echo" | "reflection") => {
    const isCurrent = sceneIdx === activeSceneIndex;
    if (!isCurrent) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };

    const progressVar = `var(--progress-scene-${sceneIdx + 1}, 0)`;

    if (type === "echo") {
      return {
        opacity: `calc(
          clamp(0, (${progressVar} - 0.10) / 0.08, 1) * 
          (1 - clamp(0, (${progressVar} - 0.44) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${progressVar} - 0.10) / 0.08, 1) - 8px * clamp(0, (${progressVar} - 0.44) / 0.06, 1)))`
      };
    } else {
      return {
        opacity: `calc(
          clamp(0, (${progressVar} - 0.52) / 0.08, 1) * 
          (1 - clamp(0, (${progressVar} - 0.78) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${progressVar} - 0.52) / 0.08, 1) - 8px * clamp(0, (${progressVar} - 0.78) / 0.06, 1)))`
      };
    }
  };

  // Interlude 1: Daily Loop (Scene 5, Index 4)
  const getDailyLoopStyles = (phase: "intro" | "ui") => {
    if (activeSceneIndex !== 4) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-5, 0)`;

    if (phase === "intro") {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.08) / 0.10, 1) * 
          (1 - clamp(0, (${p} - 0.76) / 0.08, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.08) / 0.10, 1) - 8px * clamp(0, (${p} - 0.76) / 0.08, 1)))`
      };
    } else {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.16) / 0.10, 1) * 
          (1 - clamp(0, (${p} - 0.76) / 0.08, 1))
        )`,
        transform: `translateY(calc(16px - 16px * clamp(0, (${p} - 0.16) / 0.10, 1) - 8px * clamp(0, (${p} - 0.76) / 0.08, 1)))`
      };
    }
  };

  // Interlude 2: Lens (Scene 8, Index 7) - Sequential Observation Emergence
  const getLensIntroStyles = (phase: "headline" | "subline") => {
    if (activeSceneIndex !== 7) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-8, 0)`;

    if (phase === "headline") {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.05) / 0.10, 1) * 
          (1 - clamp(0, (${p} - 0.85) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.05) / 0.10, 1) - 8px * clamp(0, (${p} - 0.85) / 0.06, 1)))`
      };
    } else {
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.16) / 0.10, 1) * 
          (1 - clamp(0, (${p} - 0.85) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.16) / 0.10, 1) - 8px * clamp(0, (${p} - 0.85) / 0.06, 1)))`
      };
    }
  };

  const getLensObsStyles = (idx: 0 | 1 | 2) => {
    if (activeSceneIndex !== 7) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-8, 0)`;
    
    // Staggered thresholds: Obs 0 at 0.28, Obs 1 at 0.46, Obs 2 at 0.64
    const startThreshold = idx === 0 ? 0.28 : idx === 1 ? 0.46 : 0.64;

    return {
      opacity: `calc(
        clamp(0, (${p} - ${startThreshold}) / 0.08, 1) * 
        (1 - clamp(0, (${p} - 0.85) / 0.06, 1))
      )`,
      transform: `translateY(calc(14px - 14px * clamp(0, (${p} - ${startThreshold}) / 0.08, 1) - 8px * clamp(0, (${p} - 0.85) / 0.06, 1)))`
    };
  };

  const getLensLabelStyles = () => {
    if (activeSceneIndex !== 7) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-8, 0)`;

    return {
      opacity: `calc(
        clamp(0, (${p} - 0.72) / 0.08, 1) * 
        (1 - clamp(0, (${p} - 0.85) / 0.06, 1))
      )`,
      transform: `translateY(calc(10px - 10px * clamp(0, (${p} - 0.72) / 0.08, 1) - 8px * clamp(0, (${p} - 0.85) / 0.06, 1)))`
    };
  };

  // Connection scene drifting archival fragments (Scene 12, Index 11)
  const storyFragments = [
    { text: "“Everyone lingering after dinner for no particular reason.”", startX: -160, startY: -100, startRot: -6, minP: 0.12 },
    { text: "“A conversation from the hallway when I was supposed to be going to bed.”", startX: 170, startY: -60, startRot: 5, minP: 0.20 },
    { text: "“Someone calling my name from another room to show me something.”", startX: -170, startY: 70, startRot: -4, minP: 0.28 },
    { text: "“Doors opened and closed. Someone was always looking for something.”", startX: 160, startY: 120, startRot: 6, minP: 0.36 }
  ];

  // Lookback finale sequence timings (Scene 18, Index 17)
  const getLookbackStyles = (phase: 1 | 2 | 3) => {
    if (activeSceneIndex !== 17) return { opacity: 0, transform: "translateY(-8px)", pointerEvents: "none" as const };
    const p = `var(--progress-scene-18, 0)`;

    if (phase === 1) {
      // Phase 1: YOU LIVED THE MOMENTS (in 0.05->0.12, hold -> 0.26, out 0.26->0.32)
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.05) / 0.07, 1) * 
          (1 - clamp(0, (${p} - 0.26) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.05) / 0.07, 1) - 8px * clamp(0, (${p} - 0.26) / 0.06, 1)))`
      };
    } else if (phase === 2) {
      // Phase 2: ALTHEARA KEPT THE STORY (in 0.34->0.40, hold -> 0.54, out 0.54->0.60)
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.34) / 0.06, 1) * 
          (1 - clamp(0, (${p} - 0.54) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.34) / 0.06, 1) - 8px * clamp(0, (${p} - 0.54) / 0.06, 1)))`
      };
    } else {
      // Phase 3: Everything between where you began... (in 0.68->0.76, hold -> 0.90, out 0.90->0.96)
      return {
        opacity: `calc(
          clamp(0, (${p} - 0.68) / 0.08, 1) * 
          (1 - clamp(0, (${p} - 0.90) / 0.06, 1))
        )`,
        transform: `translateY(calc(12px - 12px * clamp(0, (${p} - 0.68) / 0.08, 1) - 8px * clamp(0, (${p} - 0.90) / 0.06, 1)))`
      };
    }
  };

  // 5. LOCALIZED SHADOW FALLOFF FOR READABILITY
  const textAlignment = currentScene ? getCopyAlignment(currentScene.id) : "";
  const isLeftAlign = textAlignment.includes("mr-auto");
  const isRightAlign = textAlignment.includes("ml-auto");
  const isCenterAlign = currentScene?.id === 12;

  return (
    <div className="relative w-full h-full bg-charcoal overflow-hidden select-none">
      
      {/* ==================================================
          NATURAL PHOTOGRAPHIC DIRECTIONAL SHADOW FALLOFF
          (Invisible as UI; acts as optical falloff behind text)
          ================================================== */}
      {isLeftAlign && (
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] md:w-[55%] bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none z-30 transition-opacity duration-500 ease-out" />
      )}
      {isRightAlign && activeSceneIndex === 16 && (
        <div 
          className="absolute inset-y-0 right-0 w-full sm:w-[50%] md:w-[42%] bg-gradient-to-l from-black/35 via-black/15 to-transparent pointer-events-none z-30 transition-opacity duration-500 ease-out"
          style={{
            opacity: `calc(clamp(0, (var(--progress-scene-17, 0) - 0.60) / 0.10, 1) * (1 - clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1)))`
          }}
        />
      )}
      {isRightAlign && activeSceneIndex !== 16 && (
        <div className="absolute inset-y-0 right-0 w-full sm:w-[70%] md:w-[55%] bg-gradient-to-l from-black/80 via-black/35 to-transparent pointer-events-none z-30 transition-opacity duration-500 ease-out" />
      )}
      {isCenterAlign && (
        <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none z-30 transition-opacity duration-500 ease-out" />
      )}

      {/* ==================================================
          BACKGROUND LANDSCAPE LAYERS
          ================================================== */}
      <div className="absolute inset-0 w-full h-full">
        {activeAssets.map((assetId) => {
          const asset = journeyAssets[assetId];
          if (!asset) return null;

          const { opacity, scale, translateX, translateY, origin, zIndex } = getAssetStyles(assetId);

          return (
            <div
              key={assetId}
              className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-out"
              style={{
                opacity,
                transform: `scale(${scale}) translate(${translateX}, ${translateY})`,
                transformOrigin: origin,
                zIndex,
              }}
            >
              <LivingMedia
                src={asset.desktop}
                alt={asset.alt}
                isActive={opacity !== "0"}
                focalPoint={asset.focalPoint?.desktop}
                type={asset.type}
                poster={asset.poster}
              />
            </div>
          );
        })}
      </div>

      {/* ==================================================
          CINEMATIC PARTICLE WORDMARK INTRO (Hero Scene 1)
          ================================================== */}
      <ParticleWordmarkIntro sceneProgress={activeSceneIndex === 0 ? (activeSceneProgress || 0) : 1} />

      {/* ==================================================
          TYPOGRAPHY & UI COMPONENTS OVERLAYS
          ================================================== */}
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 pointer-events-none z-40">
        
        {/* Render standard visual layouts (Only for scenes without dedicated custom choreography) */}
        {currentScene && 
          ["hero", "wedding", "continuation"].includes(currentScene.type) && (
            <div 
              className={`flex flex-col gap-3.5 transition-all duration-300 ${getCopyAlignment(currentScene.id)}`}
              style={getCopyStyles(activeSceneIndex)}
            >
              {currentScene.copy?.eyebrow && (
                <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-wheat drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                  {currentScene.copy.eyebrow}
                </span>
              )}
              {currentScene.copy?.headline && (
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.06] tracking-tight font-normal text-ivory drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                  {currentScene.copy.headline}
                </h1>
              )}
              {currentScene.copy?.supporting && (
                <p className="font-reading text-base sm:text-lg md:text-xl leading-relaxed mt-2 text-linen/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
                  {currentScene.copy.supporting}
                </p>
              )}
              {currentScene.copy?.microcopy && (
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mt-4 text-stone drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                  {currentScene.copy.microcopy}
                </span>
              )}

              {/* Scene 1 CTA Action buttons */}
              {currentScene.id === 1 && (
                <div className="flex flex-wrap gap-4 mt-8 pointer-events-auto">
                  <button 
                    onClick={() => {
                      document.getElementById("runway-2")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-wheat text-espresso font-sans text-xs uppercase tracking-[0.25em] font-bold px-7 py-3.5 rounded-sm hover:bg-wheat/90 transition-colors duration-300 shadow-md"
                  >
                    Begin Your Story &rarr;
                  </button>
                  <button 
                    onClick={() => {
                      document.getElementById("runway-5")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border border-linen/30 text-linen font-sans text-xs uppercase tracking-[0.25em] font-bold px-7 py-3.5 rounded-sm hover:bg-linen/10 transition-colors duration-300 backdrop-blur-sm"
                  >
                    See How It Works
                  </button>
                </div>
              )}
            </div>
          )}

        {/* Scene 2: The Doorway / Threshold Thesis (Index 1) */}
        {activeSceneIndex === 1 && (
          <div className="relative w-full max-w-2xl mr-auto text-left pl-2 sm:pl-0 z-40">
            {/* Primary Headline */}
            <div 
              className="flex flex-col gap-3 transition-all duration-300 mb-6"
              style={getDoorwayStyles("headline")}
            >
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-wheat drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                THE THRESHOLD
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                A PLACE THAT GROWS<br />WITH YOUR LIFE.
              </h1>
            </div>

            {/* Paragraph Container (Occupies the exact same safe spot, transitioning sequentially) */}
            <div className="relative h-[220px] sm:h-[190px]">
              
              {/* Paragraph 1 */}
              <div 
                className="absolute inset-0 flex flex-col justify-start transition-all duration-300"
                style={getDoorwayStyles(1)}
              >
                <p className="font-reading text-base sm:text-lg md:text-xl text-linen/95 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
                  Altheara begins with the moments you choose to keep. A thought. A feeling. Something your child said. A question you can&apos;t stop thinking about. A day that changed you—or one that seemed ordinary at the time.
                </p>
              </div>

              {/* Paragraph 2 (Centerpiece) */}
              <div 
                className="absolute inset-0 flex flex-col justify-start transition-all duration-300"
                style={getDoorwayStyles(2)}
              >
                <p className="font-reading text-base sm:text-lg md:text-xl text-linen/95 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
                  Each Echo gives Altheara another piece of the life you&apos;re living. It reflects those moments back to you, and as they accumulate, begins to understand the patterns, people, questions, changes, and seasons running through them. Over time, Altheara becomes more than a place that remembers what happened. It becomes a place that can help you see what your life has been saying.
                </p>
              </div>

              {/* Paragraph 3 */}
              <div 
                className="absolute inset-0 flex flex-col justify-start transition-all duration-300"
                style={getDoorwayStyles(3)}
              >
                <p className="font-reading text-base sm:text-lg md:text-xl text-linen/95 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
                  The moments become connected stories. Stories become years. Years become Volumes. And those Volumes become a private record of a life that could never be recreated later—because it was captured while it was being lived.
                </p>
              </div>

              {/* Phase 4: Final Simplified Resonance */}
              <div 
                className="absolute inset-0 flex flex-col justify-start transition-all duration-300 gap-2"
                style={getDoorwayStyles(4)}
              >
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ivory font-normal leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]">
                  ALTHEARA DOESN&apos;T ASK YOU TO REMEMBER YOUR LIFE SOMEDAY.
                </h2>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-wheat font-normal leading-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]">
                  IT GROWS WITH YOU WHILE YOU&apos;RE LIVING IT.
                </h3>
              </div>

            </div>
          </div>
        )}

        {/* Scene 3 (Breakfast) & Scene 4 (Graduation) standard Echo overlays */}
        {currentScene && (currentScene.type === "breakfast" || currentScene.type === "graduation") && (
          <div 
            className={`flex flex-col gap-3 transition-all duration-300 ${getCopyAlignment(currentScene.id)}`}
            style={getCopyStyles(activeSceneIndex)}
          >
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              ECHO
            </span>
            <blockquote className="font-reading text-xl sm:text-2xl md:text-3xl leading-relaxed text-ivory drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
              &ldquo;{currentScene.copy?.echo}&rdquo;
            </blockquote>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-wheat animate-pulse" />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                {currentScene.copy?.supporting}
              </span>
            </div>
          </div>
        )}

        {/* Scene 5: Daily Loop Interlude */}
        {activeSceneIndex === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
            {/* Left Narrative */}
            <div 
              className="flex flex-col gap-4 text-left"
              style={getDailyLoopStyles("intro")}
            >
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                THE DAILY LOOP
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory font-normal leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                IT STARTS SMALL.
              </h1>
              <p className="font-reading text-base sm:text-lg text-linen/90 leading-relaxed max-w-md drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
                One moment is enough. Altheara is designed around a simple daily loop. You arrive, leave what is present, and return to your life.
              </p>
            </div>

            {/* Right Native UI Card Simulation */}
            <div 
              className="flex justify-center md:justify-end"
              style={getDailyLoopStyles("ui")}
            >
              <div className="w-full max-w-sm bg-paper text-espresso p-6 sm:p-8 rounded-sm shadow-[0_16px_48px_rgba(0,0,0,0.3)] border border-stone/20 flex flex-col gap-5 pointer-events-auto">
                <div className="flex justify-between items-center border-b border-stone/15 pb-3">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-taupe font-bold">ECHO PROMPT</span>
                  <span className="font-sans text-xs text-stone">10:14 AM</span>
                </div>
                <div>
                  <p className="font-reading text-sm italic text-stone mb-2">What happened today that you wanted to stay in a little longer?</p>
                  <div className="min-h-[70px] font-reading text-base text-espresso leading-relaxed border-l-2 border-wheat/40 pl-3">
                    We stayed at the table longer than usual tonight. Nobody said anything important. Nobody seemed ready to leave.
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button className="bg-charcoal text-paper font-sans text-xs uppercase tracking-[0.2em] font-semibold px-4 py-2.5 rounded-sm hover:bg-espresso transition-colors">
                    ADD ECHO TO YOUR STORY
                  </button>
                  <span className="font-sans text-xs text-wheat uppercase tracking-wider font-bold">ADDED</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scene 6: New Job Realization */}
        {activeSceneIndex === 5 && currentScene && (
          <div 
            className={`flex flex-col gap-4 transition-all duration-300 ${getCopyAlignment(currentScene.id)}`}
            style={getCopyStyles(activeSceneIndex)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-wheat font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              REFLECTION
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory leading-tight font-normal drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              {currentScene.copy?.headline}
            </h1>
            <blockquote className="font-reading text-lg text-linen/90 italic border-l-2 border-wheat/40 pl-4 mt-2 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
              &ldquo;{currentScene.copy?.echo}&rdquo;
            </blockquote>
          </div>
        )}

        {/* Scene 7: Family Hand Morph (Index 6) */}
        {activeSceneIndex === 6 && currentScene && (
          <div className={`relative w-full h-[220px] ${getCopyAlignment(currentScene.id)}`}>
            {/* Echo Stage */}
            <div 
              className="absolute inset-0 flex flex-col gap-3 transition-all duration-300"
              style={getMorphStyles(6, "echo")}
            >
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                ECHO
              </span>
              <blockquote className="font-reading text-xl sm:text-2xl md:text-3xl text-ivory leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                &ldquo;{currentScene.copy?.echo}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-wheat" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                  {currentScene.copy?.supporting}
                </span>
              </div>
            </div>

            {/* Reflection Stage */}
            <div 
              className="absolute inset-0 flex flex-col gap-3 transition-all duration-300"
              style={getMorphStyles(6, "reflection")}
            >
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                REFLECTION
              </span>
              <blockquote className="font-reading text-lg sm:text-xl md:text-2xl text-linen leading-relaxed italic pl-4 border-l-2 border-wheat/50 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                {currentScene.copy?.reflection}
              </blockquote>
            </div>
          </div>
        )}

        {/* Scene 8: Altheara Lens Interlude (Index 7) - Sequential Observation Arrival */}
        {activeSceneIndex === 7 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-6xl mx-auto">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 flex flex-col gap-4 text-left">
              <h1 
                className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory font-normal leading-[1.1] drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] transition-all duration-300"
                style={getLensIntroStyles("headline")}
              >
                ONE MOMENT CAN TELL YOU SOMETHING.
              </h1>
              <p 
                className="font-reading text-lg sm:text-xl md:text-2xl text-linen/90 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)] transition-all duration-300"
                style={getLensIntroStyles("subline")}
              >
                Years of moments can show you something else.
              </p>
            </div>

            {/* Right Sequential Observations Column */}
            <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
              {[
                "“You mention time most often when writing about your children.”",
                "“Your earliest Echoes about work focused on proving yourself. More recent ones focus on time.”",
                "“You've returned to the idea of being present across several seasons.”"
              ].map((obs, idx) => (
                <div 
                  key={idx}
                  className="bg-paper/95 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-4.5 rounded-sm border border-stone/30 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex gap-4 items-center transition-all duration-300 pointer-events-auto"
                  style={getLensObsStyles(idx as 0 | 1 | 2)}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-wheat shrink-0" />
                  <p className="font-reading text-sm sm:text-base text-espresso italic leading-relaxed">
                    {obs}
                  </p>
                </div>
              ))}

              {/* Quiet LENS Label */}
              <div 
                className="flex items-center gap-2.5 pt-1 pl-1 transition-all duration-300"
                style={getLensLabelStyles()}
              >
                <div className="h-px w-6 bg-wheat/60" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-wheat font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                  LENS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scene 10: Loss Morph (Index 9) */}
        {activeSceneIndex === 9 && currentScene && (
          <div className={`relative w-full h-[220px] ${getCopyAlignment(currentScene.id)}`}>
            {/* Echo Stage */}
            <div 
              className="absolute inset-0 flex flex-col gap-3 transition-all duration-300"
              style={getMorphStyles(9, "echo")}
            >
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                ECHO
              </span>
              <blockquote className="font-reading text-xl sm:text-2xl md:text-3xl text-ivory leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
                &ldquo;{currentScene.copy?.echo}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-wheat animate-pulse" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-stone font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                  ADDED TO YOUR STORY
                </span>
              </div>
            </div>

            {/* Reflection Stage */}
            <div 
              className="absolute inset-0 flex flex-col gap-3 transition-all duration-300"
              style={getMorphStyles(9, "reflection")}
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-ivory font-normal leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                SOME MOMENTS CHANGE WHAT COMES AFTER THEM.
              </h2>
              <p className="font-reading text-base sm:text-lg text-linen/90 italic mt-2 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
                Some absences become part of everything that follows.
              </p>
            </div>
          </div>
        )}

        {/* Scene 12: Story Formation — Archival Paper Convergence (Index 11) */}
        {activeSceneIndex === 11 && (
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* ==================================================
                BEAT 1: THE STATEMENT (0% -> 40% of Scene 12)
                Cinematic Chapter Card centered in visual space
                ================================================== */}
            <div 
              className="absolute inset-x-0 flex flex-col items-center text-center max-w-2xl mx-auto z-40 transition-all duration-300 px-6 gap-3.5"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-12, 0) - 0.04) / 0.08, 1) * 
                  (1 - clamp(0, (var(--progress-scene-12, 0) - 0.28) / 0.10, 1))
                )`,
                transform: `translateY(calc(
                  12px - 12px * clamp(0, (var(--progress-scene-12, 0) - 0.04) / 0.08, 1) 
                  - 28px * clamp(0, (var(--progress-scene-12, 0) - 0.28) / 0.10, 1)
                ))`
              }}
            >
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
                STORY FORMATION
              </span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                WHAT FELT SEPARATE<br />BEGINS TO BECOME A STORY.
              </h1>
              <p className="font-reading text-base sm:text-lg md:text-xl text-linen/90 italic drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] max-w-lg mt-1">
                An Echo is a moment. A Story is what becomes visible between them.
              </p>
            </div>

            {/* ==================================================
                BEAT 2: THE PROOF (40% -> 100% of Scene 12)
                The Unified Archival Manuscript Page & Drifting Slips
                ================================================== */}
            <div 
              className="relative w-full max-w-lg sm:max-w-xl h-[420px] sm:h-[460px] md:h-[480px] flex items-center justify-center z-50 transition-all duration-500"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-12, 0) - 0.40) / 0.12, 1) * 
                  (1 - clamp(0, (var(--progress-scene-12, 0) - 0.88) / 0.08, 1))
                )`,
                transform: `scale(calc(0.96 + 0.04 * clamp(0, (var(--progress-scene-12, 0) - 0.40) / 0.12, 1))) 
                           translateY(calc(
                             24px - 24px * clamp(0, (var(--progress-scene-12, 0) - 0.40) / 0.12, 1) 
                             - 10px * clamp(0, (var(--progress-scene-12, 0) - 0.88) / 0.08, 1)
                           ))`
              }}
            >
              {/* 1. The Unified Archival Manuscript Page */}
              <div
                className="absolute inset-0 bg-paper text-espresso p-6 sm:p-8 md:p-9 rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.35)] border border-hairline flex flex-col justify-between z-10 pointer-events-auto"
              >
                {/* Book Header / Folio */}
                <div className="flex justify-between items-center border-b border-hairline/70 pb-2">
                  <span className="font-sans text-xs uppercase tracking-[0.25em] text-taupe font-semibold">
                    VOLUME I &middot; CHAPTER III
                  </span>
                  <span className="font-reading text-xs text-taupe italic">
                    Autumn
                  </span>
                </div>

                {/* Chapter Title */}
                <div className="pt-1.5 pb-0.5">
                  <h3 className="font-display text-xs sm:text-sm tracking-wider uppercase text-charcoal font-normal">
                    WE DIDN&apos;T KNOW IT WAS A SEASON
                  </h3>
                </div>

                {/* Unified Prose */}
                <div className="font-reading text-xs md:text-[12.5px] text-espresso leading-[1.6] sm:leading-[1.7] flex flex-col gap-2 py-1 overflow-y-auto max-h-[300px] sm:max-h-[340px] pr-1">
                  <p>
                    There was a stretch of life when our house was rarely quiet.
                  </p>
                  <p>
                    Doors opened and closed. Someone was always looking for something. Shoes collected by the entrance faster than anyone put them away. Dinner rarely started when we said it would.
                  </p>
                  <p>
                    I don&apos;t remember thinking much about it then. Mostly, I remember being tired.
                  </p>
                  <p>
                    There were mornings I wanted five more minutes of silence and evenings when I wondered how the kitchen could possibly be messy again.
                  </p>
                  <p>
                    And still, scattered through those days were moments I kept. Everyone lingering after dinner for no particular reason. A conversation from the hallway when I was supposed to be going to bed. Someone calling my name from another room just to show me something that probably could have waited until morning.
                  </p>
                  <p>
                    At the time, each one felt small. Together, they tell me something I couldn&apos;t see from inside those days: we were in the middle of a season.
                  </p>
                  <p>
                    Like most seasons of life, nobody told us when it began. Nobody warned us when it was ending. We just lived it.
                  </p>
                  <p className="italic text-taupe pt-0.5 font-normal">
                    And for a while, the house was full.
                  </p>
                </div>

                {/* Page Footer Folio */}
                <div className="border-t border-hairline/50 pt-2 flex justify-between items-center text-xs font-sans text-taupe tracking-widest uppercase">
                  <span>Altheara Archive</span>
                  <span>42</span>
                </div>
              </div>

              {/* 2. Dispersed Archival Paper Slips (drift toward center and fade out into manuscript) */}
              <div 
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  opacity: `calc(
                    clamp(0, (var(--progress-scene-12, 0) - 0.32) / 0.08, 1) * 
                    (1 - clamp(0, (var(--progress-scene-12, 0) - 0.52) / 0.08, 1))
                  )`
                }}
              >
                {storyFragments.map((frag, idx) => {
                  const p = `var(--progress-scene-12, 0)`;
                  
                  // Drift progress from 0.32 to 0.52
                  const driftFactor = `(1 - clamp(0, (${p} - 0.32) / 0.20, 1))`;
                  const posX = `calc(${frag.startX}px * ${driftFactor})`;
                  const posY = `calc(${frag.startY}px * ${driftFactor})`;
                  const rot = `calc(${frag.startRot}deg * ${driftFactor})`;
                  
                  const slipInOpacity = `clamp(0, (${p} - 0.32) / 0.06, 1)`;

                  return (
                    <div
                      key={idx}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 sm:px-5 sm:py-3.5 bg-paper text-espresso rounded-xs shadow-[0_8px_24px_rgba(0,0,0,0.22)] border border-hairline/70 transition-all duration-300 max-w-[240px] sm:max-w-[280px]"
                      style={{
                        transform: `translate3d(calc(-50% + ${posX}), calc(-50% + ${posY}), 0) rotate(${rot})`,
                        opacity: slipInOpacity
                      }}
                    >
                      <p className="font-reading text-xs sm:text-sm leading-relaxed italic text-espresso">
                        {frag.text}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* Scene 13: Open Volume Chapter III Page Reveal (Index 12) */}
        {activeSceneIndex === 12 && currentScene && (
          <div 
            className={`flex flex-col gap-3.5 transition-all duration-300 ${getCopyAlignment(currentScene.id)}`}
            style={getCopyStyles(activeSceneIndex)}
          >
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              THE ARTIFACT
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
              YOUR LIFE, RETURNED TO YOU AS A STORY.
            </h1>
            <p className="font-reading text-base sm:text-lg text-linen/90 leading-relaxed mt-1 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
              The moments were small when they happened. Together, they became a chapter.
            </p>
            <p className="font-reading text-base text-linen/75 italic mt-0.5 drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
              You didn&apos;t have to remember your life later. You kept it while you were living it.
            </p>
          </div>
        )}

        {/* Scene 14: Editorial Chapter Break — Pure Charcoal Interstitial (Index 13) */}
        {activeSceneIndex === 13 && (
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 z-40">
            <h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-tight tracking-wide drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-14, 0) - 0.12) / 0.14, 1) * 
                  (1 - clamp(0, (var(--progress-scene-14, 0) - 0.74) / 0.14, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-14, 0) - 0.12) / 0.14, 1) - 8px * clamp(0, (var(--progress-scene-14, 0) - 0.74) / 0.14, 1)))`
              }}
            >
              ONE YEAR AT A TIME.
            </h1>
          </div>
        )}

        {/* Scene 15: Volume Reveal — Lake Overlook (Index 14) */}
        {activeSceneIndex === 14 && (
          <div className="relative w-full h-[180px] mr-auto text-left max-w-xl pl-2 sm:pl-0 z-40">
            {/* Phrase 1: YOU LIVED THE MOMENTS. */}
            <div 
              className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-15, 0) - 0.12) / 0.10, 1) * 
                  (1 - clamp(0, (var(--progress-scene-15, 0) - 0.42) / 0.06, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-15, 0) - 0.12) / 0.10, 1) - 8px * clamp(0, (var(--progress-scene-15, 0) - 0.42) / 0.06, 1)))`
              }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                YOU LIVED THE MOMENTS.
              </h1>
            </div>

            {/* Phrase 2: ALTHEARA KEPT THE STORY. */}
            <div 
              className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-15, 0) - 0.50) / 0.08, 1) * 
                  (1 - clamp(0, (var(--progress-scene-15, 0) - 0.82) / 0.08, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-15, 0) - 0.50) / 0.08, 1) - 8px * clamp(0, (var(--progress-scene-15, 0) - 0.82) / 0.08, 1)))`
              }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-wheat font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                ALTHEARA KEPT THE STORY.
              </h1>
            </div>
          </div>
        )}

        {/* Scene 16: Editorial Interstitial — One Year Becomes A Volume (Index 15) */}
        {activeSceneIndex === 15 && (
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-6 z-40 gap-4">
            <h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-tight tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-16, 0) - 0.12) / 0.12, 1) * 
                  (1 - clamp(0, (var(--progress-scene-16, 0) - 0.76) / 0.12, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-16, 0) - 0.12) / 0.12, 1) - 8px * clamp(0, (var(--progress-scene-16, 0) - 0.76) / 0.12, 1)))`
              }}
            >
              ONE YEAR BECOMES A VOLUME.
            </h1>
            <div 
              className="font-reading text-lg sm:text-xl md:text-2xl text-linen/90 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] flex flex-col gap-1 transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-16, 0) - 0.28) / 0.12, 1) * 
                  (1 - clamp(0, (var(--progress-scene-16, 0) - 0.76) / 0.12, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-16, 0) - 0.28) / 0.12, 1) - 8px * clamp(0, (var(--progress-scene-16, 0) - 0.76) / 0.12, 1)))`
              }}
            >
              <p>Not a blank book you have to fill.</p>
              <p className="italic text-wheat">A year your life already filled.</p>
            </div>
          </div>
        )}

        {/* Scene 17: Library Bookshelf Accumulation (Index 16) */}
        {activeSceneIndex === 16 && (
          <div className="flex flex-col gap-4 text-right ml-auto max-w-lg pr-2 sm:pr-0 z-40">
            {/* Eyebrow */}
            <span 
              className="font-sans text-xs uppercase tracking-[0.25em] text-wheat font-bold drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-17, 0) - 0.62) / 0.08, 1) * 
                  (1 - clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1))
                )`,
                transform: `translateY(calc(10px - 10px * clamp(0, (var(--progress-scene-17, 0) - 0.62) / 0.08, 1)))`
              }}
            >
              THE LIVING ARCHIVE
            </span>

            {/* Headline: A LIFE BECOMES A LIBRARY. */}
            <h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)] transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-17, 0) - 0.68) / 0.08, 1) * 
                  (1 - clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-17, 0) - 0.68) / 0.08, 1) - 8px * clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1)))`
              }}
            >
              A LIFE BECOMES A LIBRARY.
            </h1>

            {/* Supporting line with emphasized long-term value thesis */}
            <p 
              className="font-reading text-base sm:text-lg md:text-xl text-linen/90 leading-relaxed mt-1 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] transition-all duration-300"
              style={{
                opacity: `calc(
                  clamp(0, (var(--progress-scene-17, 0) - 0.74) / 0.08, 1) * 
                  (1 - clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1))
                )`,
                transform: `translateY(calc(12px - 12px * clamp(0, (var(--progress-scene-17, 0) - 0.74) / 0.08, 1) - 8px * clamp(0, (var(--progress-scene-17, 0) - 0.92) / 0.06, 1)))`
              }}
            >
              What begins as a few quiet minutes can become something <span className="text-wheat italic font-normal">no one could recreate later.</span>
            </p>
          </div>
        )}

        {/* Scene 18: Lookback Climax (Index 17) */}
        {activeSceneIndex === 17 && (
          <div className="relative w-full h-[220px] mr-auto text-left max-w-xl pl-2 sm:pl-0 z-40">
            
            {/* Phrase 1: YOU LIVED THE MOMENTS. */}
            <div 
              className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-300"
              style={getLookbackStyles(1)}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ivory font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                YOU LIVED THE MOMENTS.
              </h1>
            </div>

            {/* Phrase 2: ALTHEARA KEPT THE STORY. (Replaces Phrase 1 on the exact same axis) */}
            <div 
              className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-300"
              style={getLookbackStyles(2)}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-wheat font-normal leading-[1.08] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                ALTHEARA KEPT THE STORY.
              </h1>
            </div>

            {/* Phrase 3: Everything between where you began... (Relatively small, poetic) */}
            <div 
              className="absolute inset-x-0 top-0 flex flex-col gap-3 transition-all duration-300 max-w-lg"
              style={getLookbackStyles(3)}
            >
              <p className="font-reading text-lg sm:text-xl md:text-2xl text-linen/90 leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                Everything between where you began<br className="hidden sm:inline" /> and where you are now<br className="hidden sm:inline" /> had somewhere to go.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
