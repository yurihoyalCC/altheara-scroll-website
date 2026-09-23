import { useEffect, useState, RefObject } from "react";

export function useScrollProgress(
  containerRef: RefObject<HTMLDivElement | null>,
  sceneIds: (string | number)[]
) {
  const [activeSceneId, setActiveSceneId] = useState<string | number>(sceneIds[0] || 0);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [activeSceneProgress, setActiveSceneProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const viewportHeight = window.innerHeight;
      
      let currentActiveId = sceneIds[0] || 0;
      let currentActiveIndex = 0;
      let currentActiveProgress = 0;

      sceneIds.forEach((id, index) => {
        const runway = document.getElementById(`runway-${id}`);
        if (!runway) return;

        const rect = runway.getBoundingClientRect();
        let progress = 0;
        
        if (rect.top <= 0) {
          progress = Math.min(Math.abs(rect.top) / rect.height, 1);
        } else if (rect.top < viewportHeight) {
          progress = 0;
        } else {
          progress = 0;
        }

        // Apply individual progress variable formatted as --progress-scene-X
        container.style.setProperty(`--progress-scene-${id}`, progress.toFixed(4));
        
        // Check if this scene runway is currently active (spans the viewport top)
        if (rect.top <= 10 && rect.bottom > 10) {
          currentActiveId = id;
          currentActiveIndex = index;
          currentActiveProgress = progress;
        }
      });

      // Apply global active progress variable for immediate CSS access
      container.style.setProperty(`--active-progress`, currentActiveProgress.toFixed(4));

      setActiveSceneId(currentActiveId);
      setActiveSceneIndex(currentActiveIndex);
      setActiveSceneProgress(currentActiveProgress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [containerRef, sceneIds]);

  return { activeSceneId, activeSceneIndex, activeSceneProgress };
}
