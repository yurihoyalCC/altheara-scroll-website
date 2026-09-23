export interface JourneyAsset {
  id: string;
  environmentId: string;
  desktop: string;
  mobile?: string;
  poster?: string;
  type: "image" | "video";
  status: "placeholder" | "draft" | "approved" | "final";
  alt: string;
  focalPoint?: {
    desktop: { x: number; y: number };
    mobile?: { x: number; y: number };
  };
  textSafeZone?: {
    desktop: "left" | "right" | "center" | "none";
    mobile: "top" | "bottom" | "center" | "none";
  };
}

export const journeyAssets: Record<string, JourneyAsset> = {
  cottage: {
    id: "cottage",
    environmentId: "cottage",
    desktop: "/HERO%20IMAGE.mp4",
    poster: "/media_1.jpg",
    type: "video",
    status: "approved",
    alt: "Warm wooden cottage interior with open glass doors looking directly out at a winding trail and distant lake with gently swaying curtains",
    focalPoint: { desktop: { x: 50, y: 50 } },
    textSafeZone: { desktop: "left", mobile: "top" }
  },
  cottage_doorway: {
    id: "cottage_doorway",
    environmentId: "cottage",
    desktop: "/media_2.jpg",
    type: "image",
    status: "approved",
    alt: "Cottage interior looking directly out of the open glass doorway, table removed, path visible",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  breakfast: {
    id: "breakfast",
    environmentId: "trail",
    desktop: "/media_3.jpg",
    type: "image",
    status: "approved",
    alt: "Outdoor picnic table family breakfast beside the winding trail path",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  graduation: {
    id: "graduation",
    environmentId: "trail",
    desktop: "/media_4.jpg",
    type: "image",
    status: "approved",
    alt: "Graduation celebration with cap and gown next to the path with a 'WE ARE SO PROUD OF YOU!' banner",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  first_job: {
    id: "first_job",
    environmentId: "trail",
    desktop: "/media_5.jpg",
    type: "image",
    status: "approved",
    alt: "First job laptop setup next to a wooden cabin beside the trail overlooking the water",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  family: {
    id: "family",
    environmentId: "trail",
    desktop: "/media_6.jpg",
    type: "image",
    status: "approved",
    alt: "Mother and daughter sitting on the grass beside a tree next to the pathway winding towards the lake",
    focalPoint: { desktop: { x: 50, y: 55 } }
  },
  wedding: {
    id: "wedding",
    environmentId: "trail",
    desktop: "/media_7.jpg",
    type: "image",
    status: "approved",
    alt: "Outdoor wedding ceremony under a floral arch beside the path at sunset",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  loss: {
    id: "loss",
    environmentId: "trail",
    desktop: "/media_8.jpg",
    type: "image",
    status: "approved",
    alt: "An empty rocking chair with a warm blanket on the grass hill looking out at a peaceful lake sunset",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  continuation: {
    id: "continuation",
    environmentId: "trail",
    desktop: "/media_9.jpg",
    type: "image",
    status: "approved",
    alt: "Family packing luggage into an SUV by the trail as life continues",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  accumulation: {
    id: "accumulation",
    environmentId: "trail",
    desktop: "/media_12.jpg",
    type: "image",
    status: "approved",
    alt: "Row of linen-bound Altheara volumes on a wooden bookshelf",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  water: {
    id: "water",
    environmentId: "overlook",
    desktop: "/media_11.jpg",
    type: "image",
    status: "approved",
    alt: "Hands opening a linen Altheara book on a rustic table in a sunbeam, showing pages",
    focalPoint: { desktop: { x: 50, y: 50 } }
  },
  volume: {
    id: "volume",
    environmentId: "overlook",
    desktop: "/media_10.jpg",
    type: "image",
    status: "approved",
    alt: "First-person perspective of hands holding the Altheara Volume I linen book overlooking a quiet sunset lake next to a Yeti cup",
    focalPoint: { desktop: { x: 50, y: 65 } }
  },
  look_back: {
    id: "look_back",
    environmentId: "look_back",
    desktop: "/media_13.jpg",
    type: "image",
    status: "approved",
    alt: "First-person perspective looking back up the winding dirt path towards the cottage on the hill holding the book",
    focalPoint: { desktop: { x: 50, y: 50 } }
  }
};
