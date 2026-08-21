export const motionTokens = {
  duration: {
    fast: 200,
    normal: 450,
    medium: 650,
    slow: 850,
  },

  stagger: {
    small: 60,
    normal: 90,
    large: 120,
  },

  ease: {
    smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
    standard: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    outExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
  },
} as const;

export type MotionTokens = typeof motionTokens;
