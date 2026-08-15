import {
  Accessibility,
  Activity,
  Binary,
  Blocks,
  Bot,
  BrainCircuit,
  CloudCog,
  DatabaseZap,
  Gauge,
  GitBranch,
  KeyRound,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  SearchCode,
  ServerCog,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import type * as React from "react";
import {
  SiDocker,
  SiFastapi,
  SiGraphql,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type TechnologyIcon = React.ElementType<React.SVGProps<SVGSVGElement>>;

export type Technology = {
  label: string;
  icon: TechnologyIcon;
  color?: string;
  type?: "brand" | "generic";
};

type SkillGroup = {
  title: string;
  icon: TechnologyIcon;
  items: Technology[];
};

type ServiceImageTreatment =
  | "saas-product"
  | "rag-systems"
  | "ai-agents"
  | "backend-architecture"
  | "frontend-interfaces"
  | "deployment"
  | "warm"
  | "deep"
  | "neutral"
  | "soft";

type ServiceImageConfig = {
  src: string;
  alt: string;
  objectPosition: {
    desktop: string;
    tablet?: string;
    mobile: string;
  };
  scale?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
  treatment?: ServiceImageTreatment;
};

type ServiceItem = {
  number: string;
  title: string;
  description: string;
  image: ServiceImageConfig;
};

const portfolioAccent = "#ff8a62";

const technology = (
  label: string,
  icon: TechnologyIcon,
  color?: string,
  type: Technology["type"] = color ? "brand" : "generic",
): Technology => ({
  label,
  icon,
  color: color ?? portfolioAccent,
  type,
});

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Workflow", href: "#workflow" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const aboutContent = {
  eyebrow: "ABOUT / PROFILE",
  title: "More than a developer.",
  description:
    "I combine full-stack engineering, product thinking, and AI systems to transform complex ideas into useful, scalable digital products.",
  principles: [
    "Product-first thinking",
    "Scalable engineering",
    "AI with real business value",
  ],
  statement:
    "My goal is to build intelligent SaaS products that solve real market problems.",
  terminal: {
    title: "ahmed.profile - CLI",
    status: "connected",
    command: "$ init ahmed.profile",
    checks: [
      "Loading Ahmed Hassan profile...",
      "Linking Next.js, NestJS, and databases...",
      "Checking product strategy workflow...",
      "Preparing AI agents and RAG systems...",
    ],
    rows: [
      { label: "Name", value: "Ahmed Hassan" },
      { label: "Role", value: "Full-Stack & AI Developer" },
      { label: "Focus", value: "SaaS / AI Agents / RAG" },
      { label: "Mission", value: "Turning ideas into scalable products" },
    ],
    ready: "PROFILE READY",
    builderWord: "BUILDER",
    builderSubtitle: "Ahmed Hassan - Digital Product Builder",
  },
} as const;

export const skillsContent = {
  eyebrow: "Skills",

  title: "A focused stack for shipping intelligent products.",

  description:
    "A deliberately focused stack for building, shipping, and operating modern AI-powered products.",

  groups: [
    {
      title: "Interface",
      icon: MonitorSmartphone,
      items: [
        technology("React", SiReact, "#61dafb"),
        technology("Next.js", SiNextdotjs, "#f3f0ea"),
        technology("TypeScript", SiTypescript, "#5c9fdc"),
        technology("Tailwind CSS", SiTailwindcss, "#38bdf8"),

        // Add
        technology("Material UI", SiMui, "#5b9cf6"),
        technology("shadcn/ui", Blocks),

        technology("Accessibility", Accessibility),
      ],
    },

    {
      title: "Systems",
      icon: ServerCog,
      items: [
        technology("Node.js", SiNodedotjs, "#79b85a"),
        technology("NestJS", SiNestjs, "#d94967"),

        // Add
        technology("FastAPI", SiFastapi, "#3ba58b"),

        technology("PostgreSQL", SiPostgresql, "#5f8fbd"),
        technology("MongoDB", SiMongodb, "#65a866"),

        // Add
        technology("Supabase", SiSupabase, "#4ead79"),
        technology("Redis", SiRedis, "#d95c55"),

        technology("REST APIs", Network),
        technology("GraphQL", SiGraphql, "#c95bad"),
        technology("Auth", KeyRound),
      ],
    },

    {
      title: "AI Products",
      icon: BrainCircuit,
      items: [
        technology("LLM APIs", BrainCircuit),
        technology("RAG", Search),
        technology("Deep Learning", Bot),
        // More representative than "Deep Learning"
        technology("Embeddings", Binary),
        technology("Vector Search", SearchCode),

        // Concrete technology you use
        technology("Qdrant", DatabaseZap),

        technology("AI Agents", Workflow),

        // More concrete than generic "Automation"
        technology("n8n", Workflow),

        technology("Evaluation", Gauge),
      ],
    },

    {
      title: "Delivery",
      icon: CloudCog,
      items: [
        technology("Docker", SiDocker, "#4b9fde"),
        technology("CI/CD", GitBranch),
        technology("Monitoring", Activity),
        technology("Performance", Gauge),
        technology("Deployment", Rocket),
      ],
    },
  ] satisfies SkillGroup[],
} as const;

export const servicesContent = {
  eyebrow: "Services",
  title: {
    base: "Engineering Products.",
    highlight: "Powered by Intelligence.",
  },
  description:
    "From production-ready SaaS platforms to AI systems, I design and build software around real product problems.",
  services: [
    {
      number: "01",
      title: "SaaS Product Development",
      description:
        "Build production-ready SaaS products from architecture and APIs to polished user experiences.",
      image: {
        src: "/services/saas-product-focused.webp",
        alt: "SaaS product interface artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1,
          mobile: 1.04,
        },
        treatment: "saas-product",
      },
    },
    {
      number: "02",
      title: "AI & RAG Systems",
      description:
        "Build grounded AI experiences using LLMs, retrieval, embeddings, and production-ready knowledge systems.",
      image: {
        src: "/services/rag-systems-focused.webp",
        alt: "AI and retrieval system artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1.01,
          mobile: 1.04,
        },
        treatment: "rag-systems",
      },
    },
    {
      number: "03",
      title: "AI Agents & Automation",
      description:
        "Create intelligent workflows and agents that connect tools, reason over data, and automate real work.",
      image: {
        src: "/services/ai-agents-focused.webp",
        alt: "AI agents and automation artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1.01,
          mobile: 1.04,
        },
        treatment: "ai-agents",
      },
    },
    {
      number: "04",
      title: "Backend & API Architecture",
      description:
        "Build scalable APIs, authentication, databases, integrations, and reliable application infrastructure.",
      image: {
        src: "/services/backend-architecture-focused.webp",
        alt: "Backend and API architecture artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1.01,
          mobile: 1.04,
        },
        treatment: "backend-architecture",
      },
    },
    {
      number: "05",
      title: "Frontend Product Interfaces",
      description:
        "Create responsive, polished product interfaces focused on usability, interaction, and performance.",
      image: {
        src: "/services/frontend-interfaces-focused.webp",
        alt: "Frontend product interface artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1.01,
          mobile: 1.04,
        },
        treatment: "frontend-interfaces",
      },
    },
    {
      number: "06",
      title: "Deployment & Production Engineering",
      description:
        "Ship applications using reliable deployment workflows, containers, monitoring, and production infrastructure.",
      image: {
        src: "/services/deployment-focused.webp",
        alt: "Deployment and production engineering artwork",
        objectPosition: {
          desktop: "center center",
          tablet: "center center",
          mobile: "center center",
        },
        scale: {
          desktop: 1,
          tablet: 1.01,
          mobile: 1.04,
        },
        treatment: "deployment",
      },
    },
  ] satisfies readonly ServiceItem[],
} as const;


export const contactContent = {
  sectionId: "contact",

  eyebrow: {
    label: "Contact",
    separator: "/",
    accent: "Start a project",
  },

  title: {
    primary: "Have an idea",
    accent: "worth building?",
  },

  description:
    "Tell me what you’re building, and I’ll help turn it into a useful, scalable digital product.",

  background: {
    src: "/images/contact-hands.webp",
    alt: "",
  },

  form: {
    action: "/api/contact",
    method: "post",

    fields: [
      // Name
      // Email
      // Message
    ],
  },
} as const;
