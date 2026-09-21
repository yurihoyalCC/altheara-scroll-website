"use client";

import React, { useRef, useState, useEffect } from "react";

interface AudioToggleProps {
  src?: string;
  isPastCinematic?: boolean;
  className?: string;
}

export function AudioToggle({
  src = "/audio/ambient.mp3",
  isPastCinematic = false,
  className = ""
}: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // Reflects what the visitor actually hears. Browsers (Chrome, Safari, Firefox) block sound
  // until the visitor interacts with the page, so this starts false and flips when playback succeeds.
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isUserMuted, setIsUserMuted] = useState(false);
  const userMutedRef = useRef(false);
  const fadeRef = useRef<number | null>(null);

  const TARGET_VOLUME = 0.45;
  const MUTE_KEY = "altheara-sound-muted";

  const fadeIn = (audio: HTMLAudioElement) => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 1500, 1);
      audio.volume = TARGET_VOLUME * t;
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const tryPlay = (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio || userMutedRef.current) return Promise.resolve(false);
    audio.muted = false;
    audio.volume = 0;
    return audio
      .play()
      .then(() => {
        fadeIn(audio);
        setIsPlaying(true);
        setIsBlocked(false);
        return true;
      })
      .catch(() => {
        setIsPlaying(false);
        setIsBlocked(true);
        return false;
      });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Respect a visitor who muted on a previous visit.
    try {
      userMutedRef.current = window.localStorage.getItem(MUTE_KEY) === "1";
      if (userMutedRef.current) setIsUserMuted(true); // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      /* storage unavailable: default to sound on */
    }

    // Only these events count as a "user gesture" that unlocks audio. Scrolling does NOT.
    const gestureEvents: (keyof DocumentEventMap)[] = ["pointerdown", "keydown", "touchend", "click"];

    const removeListeners = () => {
      gestureEvents.forEach((e) => document.removeEventListener(e, handleGesture, true));
    };

    const handleGesture = (event: Event) => {
      // Let the sound button handle its own clicks (otherwise it would start, then immediately mute).
      if (buttonRef.current && event.target instanceof Node && buttonRef.current.contains(event.target)) return;
      if (userMutedRef.current) {
        removeListeners();
        return;
      }
      if (!audio.paused && !audio.muted) {
        removeListeners();
        return;
      }
      tryPlay().then((ok) => {
        if (ok) removeListeners(); // keep listening if the browser still refused
      });
    };

    // 1. Attempt real autoplay on load (works for returning visitors on some browsers).
    tryPlay().then((ok) => {
      // 2. Otherwise start on the first click / tap / key press anywhere on the page.
      if (!ok && !userMutedRef.current) {
        gestureEvents.forEach((e) =>
          document.addEventListener(e, handleGesture, { capture: true, passive: true })
        );
      }
    });

    return () => {
      removeListeners();
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      userMutedRef.current = true;
      setIsUserMuted(true);
      audio.pause();
      setIsPlaying(false);
      try { window.localStorage.setItem(MUTE_KEY, "1"); } catch { /* ignore */ }
    } else {
      userMutedRef.current = false;
      setIsUserMuted(false);
      try { window.localStorage.removeItem(MUTE_KEY); } catch { /* ignore */ }
      tryPlay();
    }
  };

  const label = isPlaying ? "SOUND ON" : isBlocked && !isUserMuted ? "TAP FOR SOUND" : "SOUND OFF";

  return (
    <>
      {/* Persistent HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
      />

      <button
        ref={buttonRef}
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
        title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
        className={`group flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 pointer-events-auto cursor-pointer ${
          isPastCinematic
            ? "border border-hairline bg-white/80 text-bark hover:text-charcoal hover:border-stone shadow-xs"
            : "border border-linen/25 bg-black/30 text-linen/85 hover:text-wheat hover:border-wheat/50 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
        } ${className}`}
      >
        {/* Soundwave Bars Indicator */}
        <div className="flex items-center gap-[2.5px] h-3">
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPastCinematic ? "bg-brass" : "bg-wheat"
            } ${isPlaying ? "h-3 animate-pulse" : "h-1 opacity-50"}`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPastCinematic ? "bg-brass" : "bg-wheat"
            } ${isPlaying ? "h-2 animate-pulse [animation-delay:150ms]" : "h-1.5 opacity-50"}`}
          />
          <span
            className={`w-[2px] rounded-full transition-all duration-300 ${
              isPastCinematic ? "bg-brass" : "bg-wheat"
            } ${isPlaying ? "h-3.5 animate-pulse [animation-delay:300ms]" : "h-1 opacity-50"}`}
          />
        </div>

        <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-300">
          {label}
        </span>
      </button>
    </>
  );
}
