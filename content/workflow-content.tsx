export type WorkflowNodeTone = "accent" | "neutral" | "success";

export type WorkflowNode = {
  id: string;
  label: string;
  detail: string;
  icon: "trigger" | "ai" | "database" | "notification";
  tone: WorkflowNodeTone;
};

export const workflowContent = {
  eyebrow: "How I Build",
  title: {
    lineOne: "From business problem",
    highlight: "to an intelligent product.",
  },
  description:
    "I combine product thinking, full-stack engineering, and practical AI to turn complex ideas into reliable web products that are ready to grow.",
  action: {
    label: "See how I work",
    href: "#projects",
  },
  dashboard: {
    label: "Development pipeline",
    name: "AI-Powered Web Product",
    status: "Building",
    metric: "Strategy Â· Design Â· Engineering Â· AI",
  },
  nodes: [
    {
      id: "product-brief",
      label: "Product Brief",
      detail: "Problem, users and goals",
      icon: "trigger",
      tone: "accent",
    },
    {
      id: "frontend-experience",
      label: "Frontend Experience",
      detail: "Fast, accessible interfaces",
      icon: "notification",
      tone: "accent",
    },
    {
      id: "backend-data",
      label: "Backend & Data",
      detail: "APIs, auth and databases",
      icon: "database",
      tone: "neutral",
    },
    {
      id: "ai-powered-product",
      label: "AI-Powered Product",
      detail: "Smart, tested and deployable",
      icon: "ai",
      tone: "success",
    },
  ] satisfies readonly WorkflowNode[],
  proof: [
    { value: "End-to-end", label: "Product ownership" },
    { value: "Scalable", label: "Clean architecture" },
    { value: "AI-ready", label: "Useful intelligence" },
  ],
} as const;