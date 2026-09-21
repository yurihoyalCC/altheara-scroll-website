import React from "react";

interface ScrollSceneProps {
  id: string | number;
  scrollWeight: number;
  children?: React.ReactNode;
}

export function ScrollScene({ id, scrollWeight, children }: ScrollSceneProps) {
  // Translate scrollWeight to viewport height units
  const heightStyle = {
    height: `${scrollWeight * 120}vh`,
  };

  return (
    <div
      id={`runway-${id}`}
      data-runway-id={id}
      style={heightStyle}
      className="relative w-full border-t border-transparent pointer-events-none"
    >
      <span className="sr-only">Narrative beat {id} runway spacer</span>
      {children}
    </div>
  );
}
