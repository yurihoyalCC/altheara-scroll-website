"use client";

import React, { useRef, useState, useEffect } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { journeyScenes } from "@/data/journeyScenes";
import { JourneyHeader } from "@/components/journey/JourneyHeader";
import { JourneyStage } from "@/components/journey/JourneyStage";
import { ScrollScene } from "@/components/journey/ScrollScene";
import { JourneyFooter } from "@/components/journey/JourneyFooter";
import { BeginStoryModal } from "@/components/journey/BeginStoryModal";

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBeginModalOpen, setIsBeginModalOpen] = useState(false);
  
  // Extract all scene IDs from the registry database
  const sceneIds = journeyScenes.map((s) => s.id);
  
  // Initialize the native scroll progress tracker
  const { activeSceneId, activeSceneIndex, activeSceneProgress } = useScrollProgress(containerRef, sceneIds);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    const handleOpenModal = () => setIsBeginModalOpen(true);
    window.addEventListener("open-begin-modal", handleOpenModal);
    return () => window.removeEventListener("open-begin-modal", handleOpenModal);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-charcoal min-h-screen">
      {/* Immersive HUD navigation header overlay */}
      <JourneyHeader activeSceneId={activeSceneId} onOpenBeginModal={() => setIsBeginModalOpen(true)} />
      
      {/* 1. Persistent Sticky Stage (fixed viewport overlay) */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden z-10">
        <JourneyStage
          activeSceneId={activeSceneId}
          activeSceneIndex={activeSceneIndex}
          activeSceneProgress={activeSceneProgress}
          scenes={journeyScenes}
        />
      </div>

      {/* 2. Scroll Runway Triggers (invisibly drives the sticky state) */}
      <div className="relative w-full z-20 pointer-events-none -mt-[100dvh]">
        {journeyScenes.map((scene) => (
          <ScrollScene 
            key={scene.id} 
            id={scene.id} 
            scrollWeight={scene.scrollWeight} 
          />
        ))}
      </div>

      {/* 3. Final narrative loop closure and product links (scrolls naturally into view) */}
      <div className="relative z-30 bg-charcoal">
        <JourneyFooter />
      </div>

      {/* 4. Interactive First Echo Modal */}
      <BeginStoryModal 
        isOpen={isBeginModalOpen} 
        onClose={() => setIsBeginModalOpen(false)} 
      />
    </div>
  );
}
