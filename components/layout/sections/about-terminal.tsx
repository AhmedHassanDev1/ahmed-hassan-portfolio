"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { cn } from "@/lib/utils";

type TerminalCheck = string;

type TerminalRow = {
  label: string;
  value: string;
};

type TerminalContent = {
  title: string;
  status: string;
  command: string;
  checks: readonly TerminalCheck[];
  rows: readonly TerminalRow[];
  ready: string;
  builderWord: string;
  builderSubtitle: string;
};

type AboutTerminalProps = {
  terminal: TerminalContent;
};

type AnimationStage = "idle" | "loading" | "builder";

type AnimationState = {
  stage: AnimationStage;
  commandLength: number;
  checksVisible: number;
  rowsVisible: number;
  readyVisible: boolean;
  replayVisible: boolean;
};

const INITIAL_STATE: AnimationState = {
  stage: "idle",
  commandLength: 0,
  checksVisible: 0,
  rowsVisible: 0,
  readyVisible: false,
  replayVisible: false,
};

const MATRIX = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
} as const;

const TYPE_INTERVAL = 36;
const AFTER_COMMAND_PAUSE = 360;
const CHECK_INTERVAL = 690;
const AFTER_CHECKS_PAUSE = 260;
const ROW_INTERVAL = 320;
const READY_DELAY = 420;
const BUILDER_DELAY = 760;
const DOT_REVEAL_STEP = 24;

function getReducedMotionPreference() {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getCompletedState(): AnimationState {
  return {
    stage: "builder",
    commandLength: Number.MAX_SAFE_INTEGER,
    checksVisible: Number.MAX_SAFE_INTEGER,
    rowsVisible: Number.MAX_SAFE_INTEGER,
    readyVisible: true,
    replayVisible: true,
  };
}

function DotMatrixWord({
  word,
  revealed,
}: {
  word: string;
  revealed: boolean;
}) {
  const letters = word.split("");

  return (
    <div className="about-builder" aria-label={word}>
      <span className="sr-only">{word}</span>
      <div className="about-builder-grid" aria-hidden="true">
        {letters.map((letter, letterIndex) => {
          const rows = MATRIX[letter as keyof typeof MATRIX];

          return (
            <span className="about-builder-letter" key={`${letter}-${letterIndex}`}>
              {rows.map((row, rowIndex) =>
                row.split("").map((cell, columnIndex) => {
                  const isActive = cell === "1";
                  const revealIndex = letterIndex * 6 + columnIndex + rowIndex * 0.25;

                  return (
                    <span
                      className={cn(
                        "about-builder-dot",
                        isActive && "is-active",
                        revealed && isActive && "is-revealed",
                      )}
                      key={`${rowIndex}-${columnIndex}`}
                      style={
                        {
                          "--dot-delay": `${Math.round(revealIndex * DOT_REVEAL_STEP)}ms`,
                        } as React.CSSProperties
                      }
                    />
                  );
                }),
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function AboutTerminal({ terminal }: AboutTerminalProps) {
  const [animationState, setAnimationState] =
    useState<AnimationState>(INITIAL_STATE);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }, []);

  const startSequence = useCallback(
    ({ replay = false } = {}) => {
      clearTimers();

      if (!replay && startedRef.current) return;
      startedRef.current = true;

      if (getReducedMotionPreference()) {
        setPrefersReducedMotion(true);
        setAnimationState(getCompletedState());
        return;
      }

      setPrefersReducedMotion(false);
      setAnimationState({ ...INITIAL_STATE, stage: "loading" });

      Array.from(terminal.command).forEach((_, index) => {
        schedule(() => {
          setAnimationState((current) => ({
            ...current,
            commandLength: index + 1,
          }));
        }, index * TYPE_INTERVAL);
      });

      let offset = terminal.command.length * TYPE_INTERVAL + AFTER_COMMAND_PAUSE;

      terminal.checks.forEach((_, index) => {
        schedule(() => {
          setAnimationState((current) => ({
            ...current,
            checksVisible: index + 1,
          }));
        }, offset + index * CHECK_INTERVAL);
      });

      offset += terminal.checks.length * CHECK_INTERVAL + AFTER_CHECKS_PAUSE;

      terminal.rows.forEach((_, index) => {
        schedule(() => {
          setAnimationState((current) => ({
            ...current,
            rowsVisible: index + 1,
          }));
        }, offset + index * ROW_INTERVAL);
      });

      offset += terminal.rows.length * ROW_INTERVAL + READY_DELAY;

      schedule(() => {
        setAnimationState((current) => ({
          ...current,
          readyVisible: true,
        }));
      }, offset);

      offset += BUILDER_DELAY;

      schedule(() => {
        setAnimationState((current) => ({
          ...current,
          stage: "builder",
          replayVisible: true,
        }));
      }, offset);
    },
    [clearTimers, schedule, terminal.checks, terminal.command, terminal.rows],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleMotionPreferenceChange() {
      const isReduced = mediaQuery.matches;
      setPrefersReducedMotion(isReduced);

      if (isReduced && startedRef.current) {
        clearTimers();
        setAnimationState(getCompletedState());
      }
    }

    const initialPreferenceTimer = window.setTimeout(() => {
      const isReduced = mediaQuery.matches;
      setPrefersReducedMotion(isReduced);

      if (isReduced && !startedRef.current) {
        startedRef.current = true;
        clearTimers();
        setAnimationState(getCompletedState());
      }
    }, 0);

    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.clearTimeout(initialPreferenceTimer);
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, [clearTimers]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || entry.intersectionRatio < 0.35 || startedRef.current) {
          return;
        }

        startSequence();
        observer.disconnect();
      },
      { threshold: [0, 0.35, 0.7] },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [clearTimers, startSequence]);

  const handleReplay = useCallback(() => {
    startedRef.current = true;
    startSequence({ replay: true });
  }, [startSequence]);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (
      prefersReducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--about-pointer-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--about-pointer-y", `${event.clientY - rect.top}px`);
    element.dataset.pointerActive = "true";
  }, [prefersReducedMotion]);

  const handlePointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.dataset.pointerActive = "false";
  }, []);

  const commandText = terminal.command.slice(0, animationState.commandLength);
  const showCursor = animationState.stage === "loading" && !prefersReducedMotion;
  const builderVisible = animationState.stage === "builder";

  return (
    <div
      ref={sectionRef}
      className="about-terminal"
      role="group"
      aria-label="Ahmed Hassan profile CLI"
      data-stage={animationState.stage}
      data-pointer-active="false"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="about-terminal-header">
        <div className="about-terminal-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="about-terminal-title">{terminal.title}</span>
        <span className="about-terminal-status">
          <span className="about-status-dot" aria-hidden="true" />
          <span className="sr-only">Status: </span>
          {terminal.status}
        </span>
      </div>

      <div className="about-terminal-body">
        <div
          className={cn(
            "about-cli-output",
            builderVisible && "is-dimmed",
          )}
          aria-hidden={builderVisible}
        >
          <p className="about-cli-command">
            <span>{commandText}</span>
            {showCursor && <span className="about-cursor caret-blink" aria-hidden="true" />}
          </p>

          <div className="about-cli-block">
            {terminal.checks.map((line, index) => (
              <p
                className={cn(
                  "about-cli-line",
                  index < animationState.checksVisible &&
                    "is-visible animate-in fade-in slide-in-from-bottom-1 duration-300",
                )}
                key={line}
              >
                <span className="about-check">[OK]</span>
                <span>{line}</span>
              </p>
            ))}
          </div>

          <dl className="about-profile-table">
            {terminal.rows.map((row, index) => (
              <div
                className={cn(
                  "about-profile-row",
                  index < animationState.rowsVisible &&
                    "is-visible animate-in fade-in slide-in-from-bottom-1 duration-300",
                )}
                key={row.label}
              >
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>

          <p
            className={cn(
              "about-profile-ready",
              animationState.readyVisible &&
                "is-visible animate-in fade-in slide-in-from-bottom-1 duration-300",
            )}
          >
            {terminal.ready}
          </p>
        </div>

        <div className={cn("about-builder-panel", builderVisible && "is-visible")}>
          <DotMatrixWord word={terminal.builderWord} revealed={builderVisible} />
          <p className="about-builder-subtitle">{terminal.builderSubtitle}</p>
        </div>
      </div>

      <div className="about-terminal-footer">
        <button
          className="about-replay-button"
          type="button"
          onClick={handleReplay}
          disabled={!animationState.replayVisible}
        >
          Replay
        </button>
      </div>
    </div>
  );
}
