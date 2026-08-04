import {
  ClipboardCheck,
  Code2,
  LayoutPanelLeft,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { WorkflowStageIcon } from "@/content/workflow-content";

const workflowIcons: Record<WorkflowStageIcon, LucideIcon> = {
  search: Search,
  scope: ClipboardCheck,
  design: LayoutPanelLeft,
  architecture: Network,
  development: Code2,
  quality: ShieldCheck,
  launch: Rocket,
};

export function WorkflowIcon({ icon }: { icon: WorkflowStageIcon }) {
  const Icon = workflowIcons[icon];

  return <Icon aria-hidden="true" />;
}
