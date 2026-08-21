"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { desktopStagePositions } from "@/components/layout/sections/workflow/desktop-workflow-map";

interface WorkflowPipelineSceneProps {
  selectedIndex: number;
  previewedIndex: number | null;
}

export function WorkflowPipelineScene({
  selectedIndex,
  previewedIndex,
}: WorkflowPipelineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = previewedIndex ?? selectedIndex;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    // Calculate bezier points for each segment
    const getBezierPoint = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number },
      t: number,
    ) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
      };
    };

    const getSegmentCoords = (index: number) => {
      const from = desktopStagePositions[index];
      const to = desktopStagePositions[index + 1];
      const controlOffset = index % 2 === 0 ? -76 : 76;

      return {
        p0: from,
        p1: { x: from.x + 56, y: from.y + controlOffset },
        p2: { x: to.x - 56, y: to.y + controlOffset },
        p3: to,
      };
    };

    // Particles traveling along active segments
    interface PipelineParticle {
      segmentIndex: number;
      t: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
    }

    const particles: PipelineParticle[] = [];
    const maxParticles = 16;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        segmentIndex: Math.floor(Math.random() * Math.max(1, activeIndex)),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
        color: Math.random() > 0.3 ? "#ff4d0f" : "#ffffff",
      });
    }

    // Ripple state for active node
    let ripplePhase = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      ctx.clearRect(0, 0, 1000, 340);

      // 1. Draw traveling computational data packets
      for (const particle of particles) {
        // Only run on segments up to activeIndex
        const maxSegment = Math.max(0, activeIndex - 1);
        if (particle.segmentIndex > maxSegment) {
          particle.segmentIndex = Math.floor(Math.random() * (maxSegment + 1));
        }

        particle.t += particle.speed;
        if (particle.t > 1) {
          particle.t = 0;
          particle.segmentIndex = (particle.segmentIndex + 1) % (maxSegment + 1);
        }

        const coords = getSegmentCoords(particle.segmentIndex);
        const pt = getBezierPoint(
          coords.p0,
          coords.p1,
          coords.p2,
          coords.p3,
          particle.t,
        );

        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowColor = "#ff4d0f";
        ctx.shadowBlur = 8;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw energy aura & coordinate crosshairs on the active node
      const activeNodePos = desktopStagePositions[activeIndex];
      if (activeNodePos) {
        ripplePhase = (ripplePhase + 0.02) % 1;
        const radius = 16 + ripplePhase * 24;
        const alpha = Math.max(0, 1 - ripplePhase);

        ctx.save();
        ctx.beginPath();
        ctx.arc(activeNodePos.x, activeNodePos.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 77, 15, ${alpha * 0.65})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        // Crosshairs
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        ctx.lineWidth = 0.75;
        ctx.setLineDash([]);
        ctx.moveTo(activeNodePos.x - radius - 4, activeNodePos.y);
        ctx.lineTo(activeNodePos.x + radius + 4, activeNodePos.y);
        ctx.moveTo(activeNodePos.x, activeNodePos.y - radius - 4);
        ctx.lineTo(activeNodePos.x, activeNodePos.y + radius + 4);
        ctx.stroke();

        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [activeIndex, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={340}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] size-full select-none"
    />
  );
}
