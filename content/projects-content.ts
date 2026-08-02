export type ProjectLayout = "featured" | "tall" | "compact" | "wide";

export type Project = {
  id: string;
  image?: string;
  number: string;
  name: string;
  eyebrow: string;
  description: string;
  category: string;
  capabilities: readonly string[];
  actionLabel: string;
  href: string;
  layout: ProjectLayout;
  visual: "map" | "cloud" | "graph" | "network";
};

export const projectsContent = {
  header: {
    image: "/Projects-banner-img.jpg",
    
    eyebrow: "Selected work",
    title: "Products built around",
    highlight: "real problems.",
    description:
      "A selection of full-stack products designed around clear user needs, reliable architecture, and practical business outcomes.",
    actionLabel: "Explore all projects",
    actionHref: "#all-projects",
  },
  projects: [
    {
      id: "logixflow",
      number: "01",
      name: "LogixFlow",
      eyebrow: "Featured product",
      description:
        "A high-performance logistics platform optimizing global shipment routing and real-time fleet tracking.",
      category: "Full-Stack SaaS",
      capabilities: ["Product Strategy", "Frontend", "Backend"],
      actionLabel: "View case study",
      href: "#logixflow",
      layout: "featured",
      visual: "map",
    },
    {
      id: "aether-cloud",
      number: "02",
      name: "Aether Cloud",
      eyebrow: "Admin dashboard",
      description:
        "Infrastructure management for distributed cloud nodes, resource allocation, and system health.",
      category: "Cloud Infrastructure",
      capabilities: ["System Architecture", "Dashboard Design"],
      actionLabel: "View project",
      href: "#aether-cloud",
      layout: "tall",
      visual: "cloud",
    },
    {
      id: "analytix-ai",
      number: "03",
      name: "Analytix AI",
      eyebrow: "AI-powered application",
      description:
        "An automated data pipeline turning complex enterprise data into useful, predictive insights.",
      category: "AI & Data Science",
      capabilities: ["Workflow Engineering", "AI Integration"],
      actionLabel: "View project",
      href: "#analytix-ai",
      layout: "compact",
      visual: "graph",
    },
    {
      id: "coregraph",
      number: "04",
      name: "CoreGraph",
      eyebrow: "Backend system",
      description:
        "Distributed microservices monitoring with automated traffic-flow analysis and health mapping.",
      category: "Backend Architecture",
      capabilities: ["API Design", "Network Visualization"],
      actionLabel: "View project",
      href: "#coregraph",
      layout: "wide",
      visual: "network",
    },
  ] satisfies readonly Project[],
  footer: {
    text: "Have a product challenge?",
    highlight: "Let’s turn it into reliable software.",
    href: "#contact",
  },
} as const;
