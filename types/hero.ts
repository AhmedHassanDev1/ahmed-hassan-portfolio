
export type HeroActionIcon =
  | "arrow-down-right"
  | "arrow-up-right";

export type AvailabilityStatus =
  | "available"
  | "limited"
  | "unavailable";

export interface HeroAction {
  label: string;
  href: string;
  icon: HeroActionIcon;
}

export interface HeroCapability {
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
}

export interface HeroContent {
  availability: {
    label: string;
    status: AvailabilityStatus;
  };

  introduction: string;
  role: string;

  headline: {
    beforeHighlight: string;
    highlight: string;
    afterHighlight: string;
  };

  description: string;

  actions: {
    primary: HeroAction;
    secondary: HeroAction;
  };

  visual: {
    src: string;
    alt: string;
  };

  capabilities: HeroCapability[];

  expertise: {
    eyebrow: string;
    description: string;
    technologies: string[];
  };
}