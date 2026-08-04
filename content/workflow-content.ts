export type WorkflowStageIcon =
  | "search"
  | "scope"
  | "design"
  | "architecture"
  | "development"
  | "quality"
  | "launch";

export type WorkflowStageStatus = "Complete" | "Active" | "Planned";

export type WorkflowStage = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: readonly string[];
  statusLabel: WorkflowStageStatus;
  icon: WorkflowStageIcon;
};

export const initialWorkflowStageId = "system-architecture";

export const workflowStages = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    subtitle: "Research & Strategy",
    description:
      "Clarify the business problem, target users, existing process, constraints, risks, and success criteria before any implementation starts.",
    deliverables: ["Stakeholder notes", "Workflow map", "Problem statement"],
    statusLabel: "Complete",
    icon: "search",
  },
  {
    id: "product-scope",
    number: "02",
    title: "Product Scope",
    subtitle: "Requirements & MVP",
    description:
      "Translate discovery into a focused release scope with user roles, core flows, acceptance criteria, and the smallest useful product boundary.",
    deliverables: ["MVP scope", "User stories", "Acceptance criteria"],
    statusLabel: "Complete",
    icon: "scope",
  },
  {
    id: "ux-ui-design",
    number: "03",
    title: "UX/UI Design",
    subtitle: "Wireframes & Visuals",
    description:
      "Shape the product experience with screen structure, interaction states, responsive behavior, and reusable interface patterns.",
    deliverables: ["User flows", "Wireframes", "Visual UI direction"],
    statusLabel: "Complete",
    icon: "design",
  },
  {
    id: "system-architecture",
    number: "04",
    title: "System Architecture",
    subtitle: "Tech Stack & DB Design",
    description:
      "Define the technical foundation: application boundaries, data model, API contracts, authentication, permissions, and deployment shape.",
    deliverables: ["Tech stack plan", "Database schema", "API contracts"],
    statusLabel: "Active",
    icon: "architecture",
  },
  {
    id: "frontend-backend",
    number: "05",
    title: "Frontend & Backend",
    subtitle: "Development & API",
    description:
      "Build production-ready vertical slices that connect the interface, API layer, database, integrations, and AI-assisted product logic.",
    deliverables: ["Frontend screens", "Backend services", "Integrated API flows"],
    statusLabel: "Planned",
    icon: "development",
  },
  {
    id: "qa-optimization",
    number: "06",
    title: "QA & Optimization",
    subtitle: "Testing & Performance",
    description:
      "Harden the release with functional QA, accessibility checks, security review, performance tuning, and edge-case validation.",
    deliverables: ["QA checklist", "Security pass", "Performance fixes"],
    statusLabel: "Planned",
    icon: "quality",
  },
  {
    id: "launch-evolution",
    number: "07",
    title: "Launch & Evolution",
    subtitle: "Deployment & Growth",
    description:
      "Deploy with monitoring, observe real usage, address production feedback, and prioritize the next growth iteration.",
    deliverables: ["Production release", "Monitoring signals", "Iteration backlog"],
    statusLabel: "Planned",
    icon: "launch",
  },
] satisfies readonly WorkflowStage[];

export const workflowContent = {
  eyebrow: "Workflow",
  title: {
    lineOne: "From idea to a",
    highlight: "reliable product.",
  },
  description:
    "A stable web-product process from research and scope through architecture, development, quality, launch, and iteration.",
  stages: workflowStages,
  initialStageId: initialWorkflowStageId,
  proof: [
    { value: "7 stages", label: "Defined delivery path" },
    { value: "Stage 04", label: "Deterministic initial focus" },
    { value: "Static SVG", label: "Stable document flow" },
  ],
} as const;

export function getWorkflowStageIndex(stageId: string) {
  const index = workflowStages.findIndex((stage) => stage.id === stageId);
  return index >= 0 ? index : 0;
}
