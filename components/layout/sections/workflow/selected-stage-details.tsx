import type { CSSProperties } from "react";

import type { WorkflowStage } from "@/content/workflow-content";
import { WorkflowIcon } from "./workflow-icons";

type SelectedStageDetailsProps = {
  stage: WorkflowStage;
  selectedIndex: number;
  totalStages: number;
  previewedStage?: WorkflowStage | null;
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
};

export function SelectedStageDetails({
  stage,
  selectedIndex,
  totalStages,
  previewedStage,
  onPrevious,
  onNext,
  canPrevious,
  canNext,
}: SelectedStageDetailsProps) {
  const progressLabel = `Stage ${stage.number} of ${String(totalStages).padStart(2, "0")}`;
  const progressScale = (selectedIndex + 1) / totalStages;

  return (
    <aside
      id="workflow-stage-details"
      className="workflow-detail-panel"
      aria-live="polite"
      aria-label={`Selected workflow stage: ${stage.title}`}
    >
      <div className="workflow-detail-topline">
        <span>{stage.number}</span>
        <span>{progressLabel}</span>
      </div>

      <div className="workflow-detail-icon" aria-hidden="true">
        <WorkflowIcon icon={stage.icon} />
      </div>

      <p className="workflow-detail-status">{stage.statusLabel}</p>
      <h3>{stage.title}</h3>
      <p>{stage.description}</p>

      {previewedStage && previewedStage.id !== stage.id ? (
        <p className="workflow-detail-preview">
          Previewing {previewedStage.number} / {previewedStage.title}
        </p>
      ) : null}

      <div className="workflow-deliverables">
        <span>Deliverables</span>
        <ul>
          {stage.deliverables.map((deliverable) => (
            <li key={deliverable}>{deliverable}</li>
          ))}
        </ul>
      </div>

      <div className="workflow-detail-progress">
        <span>{progressLabel}</span>
        <div aria-hidden="true">
          <i
            style={
              {
                "--workflow-detail-progress": progressScale,
              } as CSSProperties
            }
          />
        </div>
      </div>

      <div className="workflow-detail-actions">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          aria-label="Select previous workflow stage"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Select next workflow stage"
        >
          Next
        </button>
      </div>
    </aside>
  );
}
