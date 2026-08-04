import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Gauge,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

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
    title: "ahmed.profile — CLI",
    status: "connected",
    command: "$ init ahmed.profile",
    checks: [
      "Loading identity...",
      "Connecting full-stack systems...",
      "Activating product mindset...",
      "Initializing AI capabilities...",
    ],
    rows: [
      { label: "Name", value: "Ahmed Hassan" },
      { label: "Role", value: "Full-Stack & AI Developer" },
      { label: "Focus", value: "SaaS • AI Agents • RAG" },
      { label: "Mission", value: "Turning ideas into scalable products" },
    ],
    ready: "PROFILE READY",
    builderWord: "BUILDER",
    builderSubtitle: "Ahmed Hassan — Digital Product Builder",
  },
} as const;

export const skillsContent = {
  eyebrow: "Skills",
  title: "A focused stack for shipping intelligent products.",
  description:
    "The system is deliberately compact: modern UI, dependable backend foundations, and AI integrations that can be tested and operated.",
  groups: [
    {
      title: "Interface",
      icon: Code2,
      items: ["React", "Next.js", "TypeScript", "Tailwind", "Accessibility"],
    },
    {
      title: "Systems",
      icon: Database,
      items: ["Node.js", "NestJS", "PostgreSQL", "REST APIs", "Auth"],
    },
    {
      title: "AI Products",
      icon: BrainCircuit,
      items: ["AI APIs", "RAG flows", "Automation", "Evaluation", "Tooling"],
    },
    {
      title: "Delivery",
      icon: Cloud,
      items: ["Docker", "CI checks", "Monitoring", "Performance", "Deploys"],
    },
  ],
} as const;

export const servicesContent = {
  eyebrow: "WHAT I BUILD",
  title: {
    base: "Digital Products.",
    highlight: "Stronger Systems.",
  },
  description:
    "I build scalable web products, intelligent SaaS platforms, and reliable systems designed for real business needs.",
  services: [
    {
      number: "01",
      title: "SaaS Product Development",
      description:
        "Turn product ideas into scalable, launch-ready SaaS platforms.",
      visual: "saas",
    },
    {
      number: "02",
      title: "Full-Stack Web Applications",
      description:
        "Build modern full-stack products using Next.js, NestJS, TypeScript, and reliable databases.",
      visual: "full-stack",
    },
    {
      number: "03",
      title: "AI Agents & Workflow Automation",
      description:
        "Build intelligent agents that use tools, execute multi-step tasks, and automate business workflows.",
      visual: "agents",
    },
    {
      number: "04",
      title: "RAG & Knowledge Systems",
      description:
        "Turn documents and business data into reliable AI assistants with searchable, source-grounded answers.",
      visual: "rag",
    },
    {
      number: "05",
      title: "Backend & API Architecture",
      description:
        "Design secure, maintainable APIs and scalable backend systems.",
      visual: "backend",
    },
    {
      number: "06",
      title: "Dashboards & Internal Tools",
      description:
        "Create data-rich dashboards and efficient operational interfaces.",
      visual: "dashboards",
    },
  ],
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
