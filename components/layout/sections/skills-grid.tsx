"use client";

import type { CSSProperties } from "react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import { skillsContent, type Technology } from "@/content/portfolio-content";
import { cn } from "@/lib/utils";

type TechnologyChipStyle = CSSProperties & {
  "--tech-color"?: string;
};

function TechnologyChip({ technology }: { technology: Technology }) {
  const Icon = technology.icon;

  return (
    <li
      className={cn(
        "technology-chip",
        technology.type === "brand"
          ? "technology-chip-brand"
          : "technology-chip-generic",
      )}
      style={{ "--tech-color": technology.color } as TechnologyChipStyle}
    >
      <Icon
        aria-hidden={true}
        className="technology-chip-icon"
        focusable={false}
      />
      <span>{technology.label}</span>
    </li>
  );
}

export function SkillsGrid() {
  return (
    <PointerRevealGroup className="system-grid" aria-label="Skill groups">
      {skillsContent.groups.map((group) => {
        const Icon = group.icon;

        return (
          <GlassPanel
            key={group.title}
            radius="card"
            interactive
            className="system-card"
            data-reveal-card
          >
            <div className="card-icon" aria-hidden="true">
              <Icon />
            </div>
            <h3>{group.title}</h3>
            <ul className="tag-list">
              {group.items.map((technology) => (
                <TechnologyChip
                  key={technology.label}
                  technology={technology}
                />
              ))}
            </ul>
          </GlassPanel>
        );
      })}
    </PointerRevealGroup>
  );
}
