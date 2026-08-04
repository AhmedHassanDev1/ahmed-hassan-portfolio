import type { HeroContent } from "@/types/hero";

export const heroContent = {
  availability: {
    label: "Available for freelance & remote opportunities",
    status: "available",
  },

  introduction: "Hi, I'm Ahmed Hassan",

  role: "Full-Stack Developer / AI-Powered Products",

  headline: {
    beforeHighlight: "I build scalable",
    highlight: "AI-powered",
    afterHighlight: "full-stack products.",
  },

  description:
    "Full-stack developer turning complex business problems into intelligent, production-ready software.",

  actions: {
    primary: {
      label: "Explore My Work",
      href: "#projects",
      icon: "arrow-down-right",
    },

    secondary: {
      label: "Let's Work Together",
      href: "#contact",
      icon: "arrow-up-right",
    },
  },

  visual: {
    src: "/hero img.jpeg",
    alt: "Ahmed Hassan, Full-Stack Developer building AI-powered products",
  },

  capabilities: [
    {
      number: "01",
      title: "Full-Stack Development",
      shortTitle: "Full-Stack",
      description:
        "Modern web applications built across frontend and backend.",
      href: "#services",
    },
    {
      number: "02",
      title: "AI-Powered Products",
      shortTitle: "AI Systems",
      description:
        "AI integrations, intelligent workflows, and AI-powered SaaS.",
      href: "#services",
    },
    {
      number: "03",
      title: "Backend Architecture",
      shortTitle: "Architecture",
      description:
        "Reliable APIs, databases, authentication, and scalable systems.",
      href: "#services",
    },
    {
      number: "04",
      title: "Product Engineering",
      shortTitle: "Products",
      description:
        "Turning business requirements into production-ready software.",
      href: "#services",
    },
  ],

  expertise: {
    eyebrow: "Core Stack",
    description: "Technologies I use to build complete digital products.",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "AI APIs",
    ],
  },
} satisfies HeroContent;
