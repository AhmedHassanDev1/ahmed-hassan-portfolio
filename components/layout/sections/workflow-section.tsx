"use client";

import type { WorkflowNode } from "@/content/workflow-content";
import { workflowContent } from "@/content/workflow-content";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { SectionContainer } from "../section-container";

type Point = { x: number; y: number };

type ConnectorLayout = {
  width: number;
  height: number;
  paths: string[];
  points: Point[];
};

const EMPTY_CONNECTORS: ConnectorLayout = {
  width: 1,
  height: 1,
  paths: [],
  points: [],
};

function Arrow() {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" />
    </svg>
  );
}

function NodeIcon({ icon }: { icon: WorkflowNode["icon"] }) {
  if (icon === "trigger") {
    return <path d="M12 2 5.6 10h4.2L8 18l6.4-8h-4.2L12 2Z" />;
  }

  if (icon === "ai") {
    return <path d="m12 2 .8 3.2L16 6l-3.2.8L12 10l-.8-3.2L8 6l3.2-.8L12 2Zm-5 9 .6 2.4L10 14l-2.4.6L7 17l-.6-2.4L4 14l2.4-.6L7 11Z" />;
  }

  if (icon === "database") {
    return <path d="M5 5c0-1.1 3.1-2 7-2s7 .9 7 2-3.1 2-7 2-7-.9-7-2Zm0 0v5c0 1.1 3.1 2 7 2s7-.9 7-2V5m-14 5v5c0 1.1 3.1 2 7 2s7-.9 7-2v-5" />;
  }

  return <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Zm-8 12h4" />;
}

function WorkflowCard({
  node,
  cardRef,
}: {
  node: WorkflowNode;
  cardRef: (element: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={cardRef} className={`workflow-node workflow-node-${node.tone}`}>
      <span className="workflow-node-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <NodeIcon icon={node.icon} />
        </svg>
      </span>
      <span>
        <strong>{node.label}</strong>
        <small>{node.detail}</small>
      </span>
      <i aria-hidden="true" />
    </div>
  );
}

function connectorPath(from: Point, to: Point, vertical: boolean) {
  if (vertical) {
    const controlY = from.y + (to.y - from.y) / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${controlY}, ${to.x} ${controlY}, ${to.x} ${to.y}`;
  }

  const controlX = from.x + Math.max(42, (to.x - from.x) * 0.48);
  return `M ${from.x} ${from.y} C ${controlX} ${from.y}, ${to.x - Math.max(42, (to.x - from.x) * 0.48)} ${to.y}, ${to.x} ${to.y}`;
}

function WorkflowCanvas({ nodes }: { nodes: readonly WorkflowNode[] }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [connectors, setConnectors] = useState<ConnectorLayout>(EMPTY_CONNECTORS);

  const measureConnectors = useCallback(() => {
    const canvas = canvasRef.current;
    const cards = cardRefs.current;

    if (!canvas || cards.length < nodes.length || cards.some((card) => !card)) {
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const vertical = canvasRect.width <= 650;
    const rects = cards.map((card) => card!.getBoundingClientRect());

    const left = (rect: DOMRect): Point => ({
      x: rect.left - canvasRect.left,
      y: rect.top - canvasRect.top + rect.height / 2,
    });
    const right = (rect: DOMRect): Point => ({
      x: rect.right - canvasRect.left,
      y: rect.top - canvasRect.top + rect.height / 2,
    });
    const top = (rect: DOMRect): Point => ({
      x: rect.left - canvasRect.left + rect.width / 2,
      y: rect.top - canvasRect.top,
    });
    const bottom = (rect: DOMRect): Point => ({
      x: rect.left - canvasRect.left + rect.width / 2,
      y: rect.bottom - canvasRect.top,
    });

    const links: Array<[Point, Point]> = vertical
      ? [
          [bottom(rects[0]), top(rects[1])],
          [bottom(rects[0]), top(rects[2])],
          [bottom(rects[1]), top(rects[3])],
          [bottom(rects[2]), top(rects[3])],
        ]
      : [
          [right(rects[0]), left(rects[1])],
          [right(rects[0]), left(rects[2])],
          [right(rects[1]), left(rects[3])],
          [right(rects[2]), left(rects[3])],
        ];

    setConnectors({
      width: canvasRect.width,
      height: canvasRect.height,
      paths: links.map(([from, to]) => connectorPath(from, to, vertical)),
      points: links.flatMap(([from, to]) => [from, to]),
    });
  }, [nodes.length]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrame = requestAnimationFrame(measureConnectors);
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measureConnectors);
    });

    observer.observe(canvas);
    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [measureConnectors]);

  return (
    <div ref={canvasRef} className="workflow-canvas">
      <svg
        className="workflow-connectors"
        viewBox={`0 0 ${connectors.width} ${connectors.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="workflow-line" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity=".28" />
            <stop offset=".55" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--accent-soft)" stopOpacity=".82" />
          </linearGradient>
        </defs>

        {connectors.paths.map((path, index) => (
          <path key={index} d={path} />
        ))}

        {connectors.points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="3.5" />
        ))}
      </svg>

      {nodes.map((node, index) => (
        <div
          key={node.id}
          className={`workflow-node-position workflow-node-${
            ["start", "top", "bottom", "end"][index]
          }`}
        >
          <WorkflowCard
            node={node}
            cardRef={(element) => {
              cardRefs.current[index] = element;
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function WorkflowSection() {
  const { eyebrow, title, description, action, dashboard, nodes, proof } = workflowContent;

  return (
    <SectionContainer 
     id="workflow"
      aria-labelledby="hero-heading"
      spacing="none"
      overflow="hidden"
      contained={false}
      className="workflow-section">
      <div className="workflow-glow" aria-hidden="true" />

      <div className="workflow-shell">
        <div className="workflow-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="workflow-heading">
            {title.lineOne}
            <em>{title.highlight}</em>
          </h2>
          <p>{description}</p>
          <a href={action.href} className="workflow-link">
            {action.label}
            <Arrow />
          </a>
        </div>

        <div className="workflow-stage" aria-label="Full-stack AI product development process">
          <div className="workflow-dashboard" aria-hidden="true">
            <div className="workflow-dashboard-topbar">
              <span>{dashboard.label}</span>
              <span className="workflow-running"><i />{dashboard.status}</span>
            </div>
            <strong>{dashboard.name}</strong>
            <small>{dashboard.metric}</small>
            <div className="workflow-dashboard-lines">
              <i /><i /><i /><i />
            </div>
          </div>

          <WorkflowCanvas nodes={nodes} />
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
