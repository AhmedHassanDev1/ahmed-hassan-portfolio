export type ProjectLayout =
  | "featured"
  | "tall"
  | "compact"
  | "wide";

export type Project = {
  id: string;
  image: string;
  imageAlt: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  category: string;
  capabilities: readonly string[];
  actionLabel: string;
  href: string;
  layout: ProjectLayout;
};

export const projectsContent = {
  header: {
    image: "/Projects-banner-img.jpg",

    eyebrow: "Selected Work",

    title: "Building products where",
    highlight: "software meets intelligence.",

    description:
      "Selected full-stack and AI-powered projects focused on practical problems, thoughtful architecture, and reliable user experiences.",

    actionLabel: "Explore my projects",
    actionHref: "#all-projects",
  },

  projects: [
    {
      id: "movie-atlas",
      image: "/projects/project1.png",
      imageAlt: "Movie Atlas project interface",
      number: "01",
      name: "Movie Atlas",

      eyebrow: "Featured Full-Stack Project",

      description:
        "A modern movie discovery platform designed around fast exploration, structured data, and a polished browsing experience.",

      category: "Full-Stack Application",

      capabilities: [
        "Next.js",
        "API Integration",
        "Frontend Architecture",
      ],

      actionLabel: "View case study",
      href: "#movie-atlas",

      layout: "featured",
    },

    {
      id: "simple-rag",
      image: "/services/rag-systems-focused.webp",
      imageAlt: "Simple RAG project interface",
      number: "02",
      name: "Simple RAG",

      eyebrow: "Applied AI System",

      description:
        "A retrieval-augmented generation system connecting LLMs with external knowledge to produce grounded, context-aware answers.",

      category: "AI Engineering",

      capabilities: [
        "RAG Pipeline",
        "Vector Search",
        "LLM Integration",
      ],

      actionLabel: "Explore system",
      href: "#simple-rag",

      layout: "tall",
    },

    {
      id: "pinterest-mvp",
      image: "/services/saas-product-focused.webp",
      imageAlt: "Pinterest MVP project interface",
      number: "03",
      name: "Pinterest MVP",

      eyebrow: "Full-Stack Product",

      description:
        "A visual discovery platform with content feeds, reusable UI systems, user interactions, and full-stack application workflows.",

      category: "Product Engineering",

      capabilities: [
        "React",
        "Backend APIs",
        "Database Design",
      ],

      actionLabel: "View project",
      href: "#pinterest-mvp",

      layout: "compact",
    },

    {
      id: "x-project",
      image: "/projects/project4.png",
      imageAlt: "X Project architecture interface",
      number: "04",
      name: "X Project",

      eyebrow: "System Architecture",

      description:
        "A social platform implementation exploring authentication, content workflows, API design, and scalable application architecture.",

      category: "Full-Stack Architecture",

      capabilities: [
        "API Design",
        "Authentication",
        "System Architecture",
      ],

      actionLabel: "Explore architecture",
      href: "#x-project",

      layout: "wide",
    },
  ] satisfies readonly Project[],

  footer: {
    text: "Have a product idea?",
    highlight: "Let's turn it into reliable software.",
    href: "#contact",
  },
} as const;
