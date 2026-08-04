import type { WorkflowStage } from "@/content/workflow-content";
import { cn } from "@/lib/utils";

const desktopStagePositions = [
  { x: 70, y: 250 },
  { x: 214, y: 150 },
  { x: 358, y: 250 },
  { x: 502, y: 150 },
  { x: 646, y: 250 },
  { x: 790, y: 150 },
  { x: 934, y: 250 },
] as const;

function segmentPath(index: number) {
  const from = desktopStagePositions[index];
  const to = desktopStagePositions[index + 1];
  const controlOffset = index % 2 === 0 ? -76 : 76;

  return `M ${from.x} ${from.y} C ${from.x + 56} ${from.y + controlOffset}, ${
    to.x - 56
  } ${to.y + controlOffset}, ${to.x} ${to.y}`;
}

type DesktopWorkflowMapProps = {
  stages: readonly WorkflowStage[];
  selectedIndex: number;
  previewedIndex: number | null;
  onSelect: (index: number) => void;
  onPreview: (index: number | null) => void;
};

export function DesktopWorkflowMap({
  stages,
  selectedIndex,
  previewedIndex,
  onSelect,
  onPreview,
}: DesktopWorkflowMapProps) {
  const routeIndex = previewedIndex ?? selectedIndex;

  return (
    <div
      className="workflow-desktop-map"
      aria-label="Desktop web product workflow map"
    >
      <div className="workflow-map-frame">
        <svg
          className="workflow-path-svg"
          viewBox="0 0 1000 340"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="workflow-active-line" x1="0" x2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity=".65" />
              <stop offset=".6" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-soft)" />
            </linearGradient>
          </defs>

          {stages.slice(0, -1).map((stage, index) => {
            const completed = index < selectedIndex;
            const previewed = index < routeIndex;
            const incoming = index === routeIndex - 1;

            return (
              <g key={`${stage.id}-line`}>
                <path className="workflow-line-base" d={segmentPath(index)} />
                <path
                  className={cn(
                    "workflow-line-active",
                    completed && "is-completed",
                    previewed && "is-previewed",
                    incoming && "is-incoming",
                  )}
                  pathLength={1}
                  d={segmentPath(index)}
                />
                <path
                  className="workflow-line-hit"
                  d={segmentPath(index)}
                  onPointerEnter={() => onPreview(index + 1)}
                  onPointerLeave={() => onPreview(null)}
                  onMouseEnter={() => onPreview(index + 1)}
                  onMouseLeave={() => onPreview(null)}
                  onFocus={() => onPreview(index + 1)}
                  onBlur={() => onPreview(null)}
                  onClick={() => onSelect(index + 1)}
                />
              </g>
            );
          })}
        </svg>

      </div>
    </div>
  );
}

export { desktopStagePositions };
