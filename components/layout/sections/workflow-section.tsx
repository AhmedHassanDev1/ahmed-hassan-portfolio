"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";

import {
  getWorkflowStageIndex,
  workflowContent,
} from "@/content/workflow-content";
import { SectionContainer } from "../section-container";
import {
  DesktopWorkflowMap,
  desktopStagePositions,
} from "./workflow/desktop-workflow-map";
import { MobileWorkflowTimeline } from "./workflow/mobile-workflow-timeline";
import { SelectedStageDetails } from "./workflow/selected-stage-details";
import { WorkflowStageNode } from "./workflow/workflow-stage-node";

function clampIndex(index: number, max: number) {
  return Math.max(0, Math.min(index, max));
}

export function WorkflowSection() {
  const { eyebrow, title, description, stages, initialStageId, proof } =
    workflowContent;
  const [selectedStageId, setSelectedStageId] = useState<string>(initialStageId);
  const [previewedStageId, setPreviewedStageId] = useState<string | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = getWorkflowStageIndex(selectedStageId);
  const previewedIndex =
    previewedStageId === null ? null : getWorkflowStageIndex(previewedStageId);
  const routeIndex = previewedIndex ?? selectedIndex;
  const selectedStage = stages[selectedIndex];
  const previewedStage =
    previewedIndex === null ? null : stages[previewedIndex];
  const completedStages = useMemo(
    () => stages.slice(0, selectedIndex),
    [selectedIndex, stages],
  );
  const upcomingStages = useMemo(
    () => stages.slice(selectedIndex + 1),
    [selectedIndex, stages],
  );

  function setButtonRef(index: number, element: HTMLButtonElement | null) {
    buttonRefs.current[index] = element;
  }

  function selectStage(index: number) {
    const nextIndex = clampIndex(index, stages.length - 1);
    setSelectedStageId(stages[nextIndex].id);
    setPreviewedStageId(null);
  }

  function previewStage(index: number | null) {
    setPreviewedStageId(index === null ? null : stages[index].id);
  }

  function focusStage(index: number) {
    const nextIndex = clampIndex(index, stages.length - 1);
    const nextStageId = stages[nextIndex].id;
    previewStage(nextIndex);
    const visibleButton = Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        `[data-workflow-stage-id="${nextStageId}"]`,
      ),
    ).find((button) => button.offsetParent !== null);

    (visibleButton ?? buttonRefs.current[nextIndex])?.focus();
  }

  function selectPreviousStage() {
    selectStage(selectedIndex - 1);
  }

  function selectNextStage() {
    selectStage(selectedIndex + 1);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const keyActions: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: stages.length - 1,
    };

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectStage(index);
      return;
    }

    if (!(event.key in keyActions)) return;

    event.preventDefault();
    focusStage(keyActions[event.key]);
  }

  return (
    <SectionContainer
      id="workflow"
      aria-labelledby="workflow-heading"
      spacing="none"
      contained={false}
      className="workflow-section"
    >
      <div className="workflow-glow" aria-hidden="true" />

      <div className="section-shell workflow-shell">
        <div className="workflow-copy">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 id="workflow-heading" className="section-title">
            {title.lineOne}
            <em>{title.highlight}</em>
          </h2>
          <p className="section-description">{description}</p>
        </div>

        <div className="workflow-board">
          <div className="workflow-map">
            <DesktopWorkflowMap
              stages={stages}
              selectedIndex={selectedIndex}
              previewedIndex={previewedIndex}
              onSelect={selectStage}
              onPreview={previewStage}
            />
            <MobileWorkflowTimeline
              stages={stages}
              routeIndex={routeIndex}
            />

            <div className="workflow-stage-list" role="list">
              {stages.map((stage, index) => (
                <WorkflowStageNode
                  key={stage.id}
                  stage={stage}
                  index={index}
                  selected={selectedIndex === index}
                  previewed={previewedIndex === index}
                  complete={completedStages.some((item) => item.id === stage.id)}
                  upcoming={upcomingStages.some((item) => item.id === stage.id)}
                  position={desktopStagePositions[index]}
                  onSelect={selectStage}
                  onPreview={previewStage}
                  onKeyDown={handleKeyDown}
                  setButtonRef={setButtonRef}
                />
              ))}
            </div>
          </div>

          <SelectedStageDetails
            stage={selectedStage}
            selectedIndex={selectedIndex}
            totalStages={stages.length}
            previewedStage={previewedStage}
            onPrevious={selectPreviousStage}
            onNext={selectNextStage}
            canPrevious={selectedIndex > 0}
            canNext={selectedIndex < stages.length - 1}
          />
        </div>

        <dl className="workflow-proof">
          {proof.map((item) => (
            <div key={item.label}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionContainer>
  );
}
