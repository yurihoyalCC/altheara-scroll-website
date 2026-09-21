export type JourneySceneType = 
  | "hero" 
  | "threshold"
  | "breakfast"
  | "graduation"
  | "daily_loop"
  | "new_job"
  | "family"
  | "lens"
  | "wedding"
  | "loss"
  | "continuation"
  | "connection"
  | "open_volume"
  | "lake_approach"
  | "volume_lake"
  | "physical_volume"
  | "library"
  | "lookback";

export interface JourneyScene {
  id: number;
  type: JourneySceneType;
  scrollWeight: number; // Duration of active scroll runway
  environmentId: string;
  mediaId: string; // matches key in journeyAssets.ts
  copy?: {
    eyebrow?: string;
    headline?: string;
    echo?: string;
    reflection?: string;
    supporting?: string;
    microcopy?: string;
  };
}

export const journeyScenes: JourneyScene[] = [
  {
    id: 1,
    type: "hero",
    scrollWeight: 2.2,
    environmentId: "cottage_interior",
    mediaId: "cottage",
    copy: {
      headline: "YOUR LIFE IS HAPPENING.",
      eyebrow: "Most of it quietly disappears.",
      supporting: "Altheara is a place for your life—turning everyday reflections into a story that grows with you.",
      microcopy: "EVERY STORY BEGINS WITH A MOMENT."
    }
  },
  {
    id: 2,
    type: "threshold",
    scrollWeight: 4.2,
    environmentId: "cottage_doorway",
    mediaId: "cottage_doorway",
    copy: {
      headline: "A PLACE THAT GROWS WITH YOUR LIFE.",
      supporting: "Altheara doesn't ask you to remember your life someday. It grows with you while you're living it."
    }
  },
  {
    id: 3,
    type: "breakfast",
    scrollWeight: 1.8,
    environmentId: "trail",
    mediaId: "breakfast",
    copy: {
      eyebrow: "ECHO",
      echo: "Saturday morning breakfast. She spilled the syrup and we laughed.",
      supporting: "ADDED TO YOUR STORY"
    }
  },
  {
    id: 4,
    type: "graduation",
    scrollWeight: 1.8,
    environmentId: "trail",
    mediaId: "graduation",
    copy: {
      eyebrow: "ECHO",
      echo: "I thought today was about finishing something. It feels more like I'm standing at the beginning.",
      supporting: "ADDED TO YOUR STORY"
    }
  },
  {
    id: 5,
    type: "daily_loop",
    scrollWeight: 2.0,
    environmentId: "trail",
    mediaId: "graduation", // rests on graduation background
    copy: {
      headline: "IT STARTS SMALL.",
      supporting: "One moment is enough. Altheara is designed around a simple daily loop. You arrive, leave what is present, and return to your life."
    }
  },
  {
    id: 6,
    type: "new_job",
    scrollWeight: 1.8,
    environmentId: "trail",
    mediaId: "first_job",
    copy: {
      headline: "LIFE CHANGES BEFORE WE REALIZE WE'VE CHANGED WITH IT.",
      echo: "First day at the new job. I spent half the morning wondering if I belonged here."
    }
  },
  {
    id: 7,
    type: "family",
    scrollWeight: 2.5, // Morph hold
    environmentId: "trail",
    mediaId: "family",
    copy: {
      eyebrow: "ECHO",
      echo: "She reached for my hand today without me asking.",
      reflection: "Maybe what mattered wasn't that she reached for your hand. It was that you noticed she still does.",
      supporting: "ADDED TO YOUR STORY"
    }
  },
  {
    id: 8,
    type: "lens",
    scrollWeight: 2.8,
    environmentId: "trail",
    mediaId: "family", // rests on family background
    copy: {
      headline: "ONE MOMENT CAN TELL YOU SOMETHING.",
      supporting: "Years of moments can show you something else."
    }
  },
  {
    id: 9,
    type: "wedding",
    scrollWeight: 1.8,
    environmentId: "trail",
    mediaId: "wedding",
    copy: {
      headline: "YEARS PASS QUIETLY.",
      supporting: "Altheara keeps what happened between them."
    }
  },
  {
    id: 10,
    type: "loss",
    scrollWeight: 2.0,
    environmentId: "trail",
    mediaId: "loss",
    copy: {
      eyebrow: "ECHO",
      echo: "I caught myself reaching for the phone to call Dad today.",
      reflection: "Some moments change what comes after them.",
      supporting: "Some absences become part of everything that follows."
    }
  },
  {
    id: 11,
    type: "continuation",
    scrollWeight: 1.5,
    environmentId: "trail",
    mediaId: "continuation",
    copy: {
      headline: "A LIFE ISN'T ONE CHAPTER.",
      supporting: "Life keeps happening."
    }
  },
  {
    id: 12,
    type: "connection",
    scrollWeight: 3.6,
    environmentId: "trail",
    mediaId: "continuation", // transitions towards open volume
    copy: {
      headline: "WHAT FELT SEPARATE BEGINS TO BECOME A STORY.",
      supporting: "An Echo is a moment. A Story is what becomes visible between them."
    }
  },
  {
    id: 13,
    type: "open_volume",
    scrollWeight: 2.2,
    environmentId: "desk",
    mediaId: "water", // maps to open volume table
    copy: {
      eyebrow: "THE ARTIFACT",
      headline: "YOUR LIFE, RETURNED TO YOU AS A STORY.",
      supporting: "The moments were small when they happened. Together, they became a chapter."
    }
  },
  {
    id: 14,
    type: "lake_approach",
    scrollWeight: 1.6,
    environmentId: "interstitial",
    mediaId: "none", // Pure charcoal canvas editorial chapter break
    copy: {
      headline: "ONE YEAR AT A TIME."
    }
  },
  {
    id: 15,
    type: "volume_lake",
    scrollWeight: 2.8,
    environmentId: "overlook",
    mediaId: "volume",
    copy: {
      headline: "YOU LIVED THE MOMENTS.",
      supporting: "ALTHEARA KEPT THE STORY."
    }
  },
  {
    id: 16,
    type: "physical_volume",
    scrollWeight: 1.8,
    environmentId: "interstitial",
    mediaId: "none", // Pure charcoal canvas editorial chapter break
    copy: {
      headline: "ONE YEAR BECOMES A VOLUME.",
      supporting: "Not a blank book you have to fill.\nA year your life already filled."
    }
  },
  {
    id: 17,
    type: "library",
    scrollWeight: 4.5,
    environmentId: "library",
    mediaId: "accumulation", // maps to shelf
    copy: {
      headline: "A LIFE BECOMES A LIBRARY.",
      supporting: "What begins as a few quiet minutes can become something no one could recreate later."
    }
  },
  {
    id: 18,
    type: "lookback",
    scrollWeight: 3.8,
    environmentId: "look_back",
    mediaId: "look_back",
    copy: {
      headline: "YOU LIVED THE MOMENTS.",
      supporting: "Everything between where you began and where you are now had somewhere to go."
    }
  }
];
