import React, { useRef, useEffect } from "react";

interface LivingMediaProps {
  src: string;
  alt: string;
  isActive: boolean;
  opacity?: number;
  scale?: number;
  blur?: number;
  focalPoint?: { x: number; y: number };
  className?: string;
  type?: "image" | "video";
  poster?: string;
}

export function LivingMedia({
  src,
  alt,
  isActive,
  opacity = 1,
  scale = 1,
  blur = 0,
  focalPoint = { x: 50, y: 50 },
  className = "",
  type,
  poster,
}: LivingMediaProps) {
  const objectPosition = `${focalPoint.x}% ${focalPoint.y}%`;
  const isVideo = type === "video" || src.toLowerCase().endsWith(".mp4") || src.toLowerCase().endsWith(".webm");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isVideo]);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden transition-all duration-700 ease-out ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      } ${className}`}
      style={{
        opacity,
      }}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out pointer-events-none select-none"
          style={{
            objectPosition,
            transform: `scale(${scale})`,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
          }}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            objectPosition,
            transform: `scale(${scale})`,
            filter: blur > 0 ? `blur(${blur}px)` : undefined,
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}
