"use client";

import type * as React from "react";
import { useCallback, useEffect, useRef } from "react";

import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  maxDisplacement?: number;
  damping?: number;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Magnetic({
  maxDisplacement = 6,
  damping = 0.2,
  disabled = false,
  className,
  children,
  style,
  ...props
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const animate = useCallback(() => {
    if (!containerRef.current) return;

    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * damping;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * damping;

    const { x, y } = currentPos.current;
    containerRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

    const distance = Math.hypot(targetPos.current.x - x, targetPos.current.y - y);

    if (isHovered.current || distance > 0.05) {
      rafId.current = window.requestAnimationFrame(animate);
    } else {
      currentPos.current = { x: 0, y: 0 };
      containerRef.current.style.transform = "translate3d(0, 0, 0)";
      rafId.current = null;
    }
  }, [damping]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion) return;
    if (event.pointerType !== "mouse") return;

    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);

    targetPos.current = {
      x: deltaX * maxDisplacement,
      y: deltaY * maxDisplacement,
    };

    if (rafId.current === null) {
      rafId.current = window.requestAnimationFrame(animate);
    }
  };

  const handlePointerEnter = () => {
    if (disabled || prefersReducedMotion) return;
    isHovered.current = true;
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    targetPos.current = { x: 0, y: 0 };

    if (rafId.current === null) {
      rafId.current = window.requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("motion-magnetic-wrapper inline-block", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ willChange: "transform", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
