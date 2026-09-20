"use client";

import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  xNorm: number; // 0 (left 'A') to 1 (right 'A')

  isCore: boolean;
  size: number;
  baseOpacity: number;
  currentOpacity: number;
  color: [number, number, number];

  // Whimsical Flight Dynamics
  waveAmp: number;
  waveFreq: number;
  phase: number;
  flightDelay: number;
  flightDuration: number;

  // Release / Dispersal to the Right
  released: boolean;
  vx: number;
  vy: number;
  releaseDelay: number;
}

interface ParticleWordmarkIntroProps {
  sceneProgress: number;
  onDissolveThresholdReached?: (reached: boolean) => void;
}

export function ParticleWordmarkIntro({
  sceneProgress,
  onDissolveThresholdReached
}: ParticleWordmarkIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const progressRef = useRef(sceneProgress);
  useEffect(() => {
    progressRef.current = sceneProgress;
  }, [sceneProgress]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      if (onDissolveThresholdReached) onDissolveThresholdReached(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let startTime = performance.now();
    let hasTriggeredThreshold = false;
    let isFullyFormed = false;
    // Replay support: once the wordmark has started dissolving, returning to the very top
    // of the page re-runs the load-in formation from the left edge.
    let hasDissolved = false;
    let isLoopRunning = true;
    const TOP_THRESHOLD_PX = 4;

    const resetFormation = (now: number) => {
      startTime = now;
      isFullyFormed = false;
      hasTriggeredThreshold = false;
      hasDissolved = false;
      for (const p of particles) {
        p.released = false;
        p.x = p.originX;
        p.y = p.originY;
        p.currentOpacity = 0;
      }
      if (onDissolveThresholdReached) onDissolveThresholdReached(false);
    };

    // Palette: Soft warm white, warm ivory, soft cream, champagne, pale gold
    const coreColors: [number, number, number][] = [
      [255, 254, 250], // Soft Warm White
      [250, 246, 238], // Warm Ivory
      [252, 248, 242]  // Soft Cream
    ];

    const edgeColors: [number, number, number][] = [
      [244, 235, 220], // Parchment
      [235, 220, 198], // Champagne
      [228, 202, 148]  // Pale Gold
    ];

    const initSimulation = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      
      const targetParticleCount = isMobile ? 1200 : isTablet ? 1900 : 2800;

      // 1. Offscreen canvas for sampling ALTHEARA letterforms
      const offCanvas = document.createElement("canvas");
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCanvas.width = width;
      offCanvas.height = height;

      // Positioned in upper-mid doorway area
      const targetY = height * 0.43;
      const fontSize = isMobile ? Math.min(width * 0.105, 42) : Math.min(width * 0.054, 70);

      offCtx.fillStyle = "#FFFFFF";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.font = `600 ${fontSize}px "Cinzel", "Playfair Display", "Times New Roman", Georgia, serif`;
      
      const wordmarkText = "A  L  T  H  E  A  R  A";
      offCtx.fillText(wordmarkText, width / 2, targetY);

      // 2. Pixel Sampling
      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const corePoints: { x: number; y: number }[] = [];
      const edgePoints: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const idx = (y * width + x) * 4;
          const alpha = imgData[idx + 3];
          if (alpha > 140) {
            corePoints.push({ x, y });
          } else if (alpha > 35) {
            edgePoints.push({ x, y });
          }
        }
      }

      const allPoints = [...corePoints, ...edgePoints];
      if (allPoints.length === 0) return;

      let minX = width;
      let maxX = 0;
      for (const p of allPoints) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
      }
      const wordWidth = Math.max(maxX - minX, 1);

      // 3. Populate particles entering visibly along the left edge
      particles = [];
      const numCore = Math.floor(targetParticleCount * 0.75);
      const numEdge = targetParticleCount - numCore;

      // Core Particles (Form the solid letter strokes)
      for (let i = 0; i < numCore; i++) {
        const pt = corePoints.length > 0
          ? corePoints[Math.floor(Math.random() * corePoints.length)]
          : allPoints[Math.floor(Math.random() * allPoints.length)];

        // Start visibly on the left edge
        const originX = -10 + Math.random() * (width * 0.12);
        const originY = height * 0.22 + Math.random() * (height * 0.44);

        const color = coreColors[Math.floor(Math.random() * coreColors.length)];
        const xNorm = (pt.x - minX) / wordWidth;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          targetX: pt.x + (Math.random() - 0.5) * 0.6,
          targetY: pt.y + (Math.random() - 0.5) * 0.6,
          xNorm,
          isCore: true,
          size: isMobile ? 1.1 + Math.random() * 0.8 : 1.3 + Math.random() * 1.3,
          baseOpacity: 0.90 + Math.random() * 0.10,
          currentOpacity: 0.2,
          color,
          waveAmp: 16 + Math.random() * 36,
          waveFreq: 1.4 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          flightDelay: Math.random() * 0.6, // Fast, staggered entry (0 to 0.6s)
          flightDuration: 2.2 + Math.random() * 1.0, // Gathers smoothly by 2.2-3.2s
          released: false,
          vx: 2.6 + Math.random() * 3.4,
          vy: (Math.random() - 0.5) * 1.2,
          releaseDelay: xNorm * 0.55 + Math.random() * 0.15
        });
      }

      // Edge Particles (Atmospheric halo)
      for (let i = 0; i < numEdge; i++) {
        const pt = edgePoints.length > 0
          ? edgePoints[Math.floor(Math.random() * edgePoints.length)]
          : allPoints[Math.floor(Math.random() * allPoints.length)];

        const originX = -15 + Math.random() * (width * 0.15);
        const originY = height * 0.18 + Math.random() * (height * 0.52);

        const color = edgeColors[Math.floor(Math.random() * edgeColors.length)];
        const xNorm = (pt.x - minX) / wordWidth;

        particles.push({
          x: originX,
          y: originY,
          originX,
          originY,
          targetX: pt.x + (Math.random() - 0.5) * 2.2,
          targetY: pt.y + (Math.random() - 0.5) * 2.2,
          xNorm,
          isCore: false,
          size: isMobile ? 0.8 + Math.random() * 0.8 : 0.9 + Math.random() * 1.1,
          baseOpacity: 0.45 + Math.random() * 0.35,
          currentOpacity: 0.1,
          color,
          waveAmp: 22 + Math.random() * 45,
          waveFreq: 1.2 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          flightDelay: Math.random() * 0.7,
          flightDuration: 2.4 + Math.random() * 1.0,
          released: false,
          vx: 2.2 + Math.random() * 3.0,
          vy: (Math.random() - 0.5) * 1.5,
          releaseDelay: xNorm * 0.55 + Math.random() * 0.18
        });
      }
    };

    initSimulation();

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        initSimulation();
      });
    }

    window.addEventListener("resize", initSimulation);

    // Main Render Loop
    const render = (now: number) => {
      // Back at the top after the wordmark dissolved: replay the load-in.
      if (hasDissolved && window.scrollY <= TOP_THRESHOLD_PX) {
        resetFormation(now);
      }

      const elapsed = (now - startTime) / 1000;
      const scrollP = progressRef.current;

      ctx.clearRect(0, 0, width, height);

      // Mark formed when formation time has passed (~3.2s)
      if (elapsed >= 3.2 && !isFullyFormed) {
        isFullyFormed = true;
      }

      // Dissolution only triggers AFTER the word is formed AND user deliberately scrolls down past 0.08
      const isUserScrolling = isFullyFormed && scrollP > 0.08;
      const dissolveProgress = isUserScrolling
        ? Math.min(Math.max((scrollP - 0.08) / 0.35, 0), 1)
        : 0;

      if (isUserScrolling && !hasTriggeredThreshold && dissolveProgress >= 0.4) {
        hasTriggeredThreshold = true;
        if (onDissolveThresholdReached) onDissolveThresholdReached(true);
      }

      if (scrollP > 0.85 && window.scrollY > TOP_THRESHOLD_PX) {
        if (onDissolveThresholdReached) onDissolveThresholdReached(true);
        // Fully scrolled past the intro: park the loop (no wasted frames) until the user returns to the top.
        hasDissolved = true;
        isLoopRunning = false;
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const timeSec = elapsed;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // ========================================================
        // 1. SCROLL DISPERSAL (Degrades gracefully off to the RIGHT)
        // ========================================================
        if (isUserScrolling) {
          if (dissolveProgress > p.releaseDelay && !p.released) {
            p.released = true;
            hasDissolved = true;
            p.vx = 2.8 + Math.random() * 3.5 + dissolveProgress * 4.0;
            p.vy = (Math.sin(timeSec * 2.5 + p.phase) - 0.1) * 1.5;
          }

          if (p.released) {
            p.x += p.vx;
            p.y += p.vy;
            p.currentOpacity = Math.max(p.currentOpacity - 0.020 - dissolveProgress * 0.03, 0);
          } else {
            const ease = 0.06;
            p.x += (p.targetX - p.x) * ease;
            p.y += (p.targetY - p.y) * ease;
            p.currentOpacity = p.baseOpacity * (1 - dissolveProgress * 0.4);
          }
        }
        // ========================================================
        // 2. WHIMSICAL ENTRY FROM LEFT & LIVING HOLD
        // ========================================================
        else {
          const particleTime = elapsed - p.flightDelay;

          if (particleTime <= 0) {
            p.x = p.originX;
            p.y = p.originY;
            p.currentOpacity = 0;
          } else if (particleTime < p.flightDuration) {
            const rawP = particleTime / p.flightDuration;
            const easeP = 1 - Math.pow(1 - rawP, 3); // Cubic ease-out

            const dampening = Math.sin(rawP * Math.PI);
            const waveY = Math.sin(rawP * Math.PI * p.waveFreq + p.phase) * p.waveAmp * dampening;
            const waveX = Math.cos(rawP * Math.PI * 1.5 + p.phase) * 10 * dampening;

            p.x = p.originX + (p.targetX - p.originX) * easeP + waveX;
            p.y = p.originY + (p.targetY - p.originY) * easeP + waveY;

            p.currentOpacity = Math.min(rawP * 2.5, 1) * p.baseOpacity;
          } else {
            // ====================================================
            // 3. FULLY FORMED LIVING ALTHEARA HOLD (Stays until scroll)
            // ====================================================
            p.currentOpacity = p.baseOpacity;

            if (p.isCore) {
              const microDrift = Math.sin(timeSec * 1.4 + p.phase) * 0.25;
              p.x = p.targetX + microDrift;
              p.y = p.targetY + microDrift * 0.5;
            } else {
              const edgeFloatX = Math.cos(timeSec * 1.2 + p.phase) * 0.8;
              const edgeFloatY = Math.sin(timeSec * 1.2 + p.phase) * 0.8;
              p.x = p.targetX + edgeFloatX;
              p.y = p.targetY + edgeFloatY;
            }
          }
        }

        // Render Particle
        if (p.currentOpacity > 0.01 && p.x > -30 && p.x < width + 50) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.currentOpacity.toFixed(3)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Wake the parked loop when the user scrolls back to the top.
    const handleScrollToTop = () => {
      if (!isLoopRunning && window.scrollY <= TOP_THRESHOLD_PX) {
        resetFormation(performance.now());
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    window.addEventListener("scroll", handleScrollToTop, { passive: true });

    return () => {
      window.removeEventListener("resize", initSimulation);
      window.removeEventListener("scroll", handleScrollToTop);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-45 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
