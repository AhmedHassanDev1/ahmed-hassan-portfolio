"use client";

import type * as React from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const REVEAL_CARD_SELECTOR = "[data-reveal-card]";
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const PROXIMITY_DISTANCE = 360;
const MAX_PROXIMITY_STRENGTH = 0.28;

type RevealCardSnapshot = {
  element: HTMLElement;
  rect: DOMRect;
};

type PointerPosition = {
  x: number;
  y: number;
};

type PointerRevealOptions = {
  disabled?: boolean;
};

type PointerRevealGroupProps = React.ComponentProps<"div"> &
  PointerRevealOptions & {
    revealRadius?: string;
    revealColor?: string;
  };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDistanceToRect(point: PointerPosition, rect: DOMRect) {
  const closestX = clamp(point.x, rect.left, rect.right);
  const closestY = clamp(point.y, rect.top, rect.bottom);
  const deltaX = point.x - closestX;
  const deltaY = point.y - closestY;

  return Math.hypot(deltaX, deltaY);
}

function getLocalPoint(point: PointerPosition, rect: DOMRect) {
  return {
    x: clamp(point.x - rect.left, 0, rect.width),
    y: clamp(point.y - rect.top, 0, rect.height),
  };
}

function clearCardReveal(cards: readonly HTMLElement[]) {
  cards.forEach((card) => {
    card.style.setProperty("--reveal-opacity", "0");
    card.style.setProperty("--proximity-strength", "0");
  });
}

export function usePointerReveal<TElement extends HTMLElement>({
  disabled = false,
}: PointerRevealOptions = {}) {
  const groupRef = useRef<TElement | null>(null);

  useEffect(() => {
    const root = groupRef.current;

    if (!root || disabled) return;

    const rootElement: TElement = root;
    const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    let cards: RevealCardSnapshot[] = [];
    let lastPointer: PointerPosition | null = null;
    let frame = 0;
    let rectsDirty = true;
    let enabled = finePointerQuery.matches && !reducedMotionQuery.matches;

    function getCardElements() {
      return cards.map(({ element }) => element);
    }

    function refreshCards() {
      const cardElements = Array.from(
        rootElement.querySelectorAll<HTMLElement>(REVEAL_CARD_SELECTOR),
      );

      if (rootElement.matches(REVEAL_CARD_SELECTOR)) {
        cardElements.unshift(rootElement);
      }

      cards = cardElements.map((element) => ({
        element,
        rect: element.getBoundingClientRect(),
      }));
      rectsDirty = false;
    }

    function cancelScheduledFrame() {
      if (frame === 0) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function setGroupActive(active: boolean) {
      rootElement.dataset.revealActive = active ? "true" : "false";
    }

    function clearReveal() {
      cancelScheduledFrame();
      setGroupActive(false);
      lastPointer = null;
      clearCardReveal(getCardElements());
    }

    function updateCardVariables() {
      frame = 0;

      if (!enabled || document.hidden || !lastPointer) return;
      if (rectsDirty) refreshCards();

      const pointer = lastPointer;

      setGroupActive(true);

      cards.forEach(({ element, rect }) => {
        const localPoint = getLocalPoint(pointer, rect);
        const inside =
          pointer.x >= rect.left &&
          pointer.x <= rect.right &&
          pointer.y >= rect.top &&
          pointer.y <= rect.bottom;
        const distance = inside ? 0 : getDistanceToRect(pointer, rect);
        const proximityStrength = inside
          ? 0
          : Math.max(
              0,
              1 - distance / PROXIMITY_DISTANCE,
            ) * MAX_PROXIMITY_STRENGTH;
        const revealOpacity = inside ? 1 : proximityStrength;

        element.style.setProperty("--pointer-x", `${localPoint.x}px`);
        element.style.setProperty("--pointer-y", `${localPoint.y}px`);
        element.style.setProperty("--reveal-opacity", revealOpacity.toFixed(3));
        element.style.setProperty(
          "--proximity-strength",
          proximityStrength.toFixed(3),
        );
      });
    }

    function scheduleUpdate() {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateCardVariables);
    }

    function handlePointerMove(event: PointerEvent) {
      if (!enabled || document.hidden) return;

      lastPointer = {
        x: event.clientX,
        y: event.clientY,
      };
      scheduleUpdate();
    }

    function handlePointerEnter(event: PointerEvent) {
      if (!enabled || document.hidden) return;

      rectsDirty = true;
      handlePointerMove(event);
    }

    function handlePointerLeave() {
      clearReveal();
    }

    function handleVisibilityChange() {
      if (document.hidden) clearReveal();
      rectsDirty = true;
    }

    function handleEnvironmentChange() {
      enabled = finePointerQuery.matches && !reducedMotionQuery.matches;
      rectsDirty = true;

      if (!enabled) clearReveal();
    }

    function markRectsDirty() {
      rectsDirty = true;
    }

    rootElement.addEventListener("pointerenter", handlePointerEnter);
    rootElement.addEventListener("pointermove", handlePointerMove);
    rootElement.addEventListener("pointerleave", handlePointerLeave);
    rootElement.addEventListener("pointercancel", handlePointerLeave);
    window.addEventListener("resize", markRectsDirty);
    window.addEventListener("scroll", markRectsDirty, true);
    window.addEventListener("blur", clearReveal);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    finePointerQuery.addEventListener("change", handleEnvironmentChange);
    reducedMotionQuery.addEventListener("change", handleEnvironmentChange);

    handleEnvironmentChange();

    return () => {
      rootElement.removeEventListener("pointerenter", handlePointerEnter);
      rootElement.removeEventListener("pointermove", handlePointerMove);
      rootElement.removeEventListener("pointerleave", handlePointerLeave);
      rootElement.removeEventListener("pointercancel", handlePointerLeave);
      window.removeEventListener("resize", markRectsDirty);
      window.removeEventListener("scroll", markRectsDirty, true);
      window.removeEventListener("blur", clearReveal);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      finePointerQuery.removeEventListener("change", handleEnvironmentChange);
      reducedMotionQuery.removeEventListener("change", handleEnvironmentChange);
      clearReveal();
    };
  }, [disabled]);

  return groupRef;
}

export function PointerRevealGroup({
  className,
  children,
  disabled,
  revealRadius = "16rem",
  revealColor = "255 119 64",
  style,
  ...props
}: PointerRevealGroupProps) {
  const groupRef = usePointerReveal<HTMLDivElement>({ disabled });

  return (
    <div
      ref={groupRef}
      data-reveal-group
      className={cn("pointer-reveal-group", className)}
      style={
        {
          "--reveal-radius": revealRadius,
          "--reveal-color": revealColor,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
