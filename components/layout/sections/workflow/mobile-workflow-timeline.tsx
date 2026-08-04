import type { CSSProperties } from "react";

import type { WorkflowStage } from "@/content/workflow-content";

type MobileWorkflowTimelineProps = {
  stages: readonly WorkflowStage[];
  routeIndex: number;
};

export function MobileWorkflowTimeline({
  stages,
  routeIndex,
}: MobileWorkflowTimelineProps) {
  return (
    <div
      className="workflow-mobile-timeline"
      aria-hidden="true"
    >
      <span
        className="workflow-mobile-rail"
        style={
          {
            "--workflow-progress": `${(routeIndex / (stages.length - 1)) * 100}%`,
          } as CSSProperties
        }
      />
    </div>
  );
}
