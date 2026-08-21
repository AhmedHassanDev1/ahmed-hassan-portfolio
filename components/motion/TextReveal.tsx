"use client";

import type * as React from "react";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  lines?: readonly string[];
  delay?: number;
  stagger?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  lineClassName?: string;
  children?: React.ReactNode;
}

export function TextReveal({
  as: Component = "h1",
  lines,
  delay = 100,
  stagger = 90,
  duration = 600,
  threshold = 0.15,
  once = true,
  className,
  lineClassName,
  children,
  ...props
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, once]);

  if (lines && lines.length > 0) {
    return (
      <Component
        ref={elementRef}
        data-revealed={isRevealed ? "true" : "false"}
        className={cn("motion-text-reveal", className)}
        {...props}
      >
        {lines.map((line, index) => {
          const lineDelay = delay + index * stagger;
          const lineStyle = {
            "--reveal-delay": `${lineDelay}ms`,
            "--reveal-duration": `${duration}ms`,
          } as React.CSSProperties;

          return (
            <span
              key={`${line}-${index}`}
              className={cn("motion-text-line-wrapper", lineClassName)}
            >
              <span
                className="motion-text-line"
                style={lineStyle}
                data-revealed={isRevealed ? "true" : "false"}
              >
                {line}
              </span>
            </span>
          );
        })}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef}
      data-revealed={isRevealed ? "true" : "false"}
      className={cn("motion-text-reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="motion-text-line-wrapper">
        <span
          className="motion-text-line"
          data-revealed={isRevealed ? "true" : "false"}
        >
          {children}
        </span>
      </span>
    </Component>
  );
}
