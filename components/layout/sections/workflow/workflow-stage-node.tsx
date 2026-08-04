"use client";

import type { CSSProperties, KeyboardEvent } from "react";

import type { WorkflowStage } from "@/content/workflow-content";
import { cn } from "@/lib/utils";
import { WorkflowIcon } from "./workflow-icons";

type WorkflowStageNodeProps = {
  stage: WorkflowStage;
  index: number;
  selected: boolean;
  previewed: boolean;
  complete: boolean;
  upcoming: boolean;
  position?: {
    x: number;
    y: number;
  };
  onSelect: (index: number) => void;
  onPreview: (index: number | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
  setButtonRef: (index: number, element: HTMLButtonElement | null) => void;
};

export function WorkflowStageNode({
  stage,
  index,
  selected,
  previewed,
  complete,
  upcoming,
  position,
  onSelect,
  onPreview,
  onKeyDown,
  setButtonRef,
}: WorkflowStageNodeProps) {
  return (
    <button
      ref={(element) => setButtonRef(index, element)}
      type="button"
      className={cn(
        "workflow-stage-button",
        selected && "is-selected",
        previewed && "is-previewed",
        complete && "is-complete",
        upcoming && "is-upcoming",
      )}
      style={
        position
          ? ({
              "--node-x": `${position.x / 10}%`,
              "--node-y": `${position.y}px`,
            } as CSSProperties)
          : undefined
      }
      aria-label={`${stage.number}. ${stage.title}. ${stage.subtitle}. ${stage.description}`}
      aria-current={selected ? "step" : undefined}
      aria-describedby="workflow-stage-details"
      data-workflow-stage-id={stage.id}
      data-status={stage.statusLabel}
      onPointerEnter={() => onPreview(index)}
      onPointerLeave={() => onPreview(null)}
      onMouseEnter={() => onPreview(index)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(index)}
      onBlur={() => onPreview(null)}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
    >
      <span className="workflow-stage-marker">
        <WorkflowIcon icon={stage.icon} />
      </span>
      <span className="workflow-stage-kicker">
        {stage.number} / {stage.statusLabel}
      </span>
      <span className="workflow-stage-title">{stage.title}</span>
      <span className="workflow-stage-subtitle">{stage.subtitle}</span>
    </button>
  );
}
