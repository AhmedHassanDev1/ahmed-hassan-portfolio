"use client";

import type { CSSProperties } from "react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import { Reveal } from "@/components/motion";
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
        "technology-chip transition-all duration-200 hover:-translate-y-0.5",
        technology.type === "brand"
          ? "technology-chip-brand"
          : "technology-chip-generic",
      )}
      style={{ "--tech-color": technology.color } as TechnologyChipStyle}
    >
      <Icon
        aria-hidden={true}
        className="technology-chip-icon transition-transform duration-200 group-hover:scale-110"
        focusable={false}
      />
      <span>{technology.label}</span>
    </li>
  );
}

export function SkillsGrid() {
  return (
    <PointerRevealGroup className="system-grid" aria-label="Skill groups">
      {skillsContent.groups.map((group, index) => {
        const Icon = group.icon;

        return (
          <Reveal
            key={group.title}
            as="div"
            variant="fade-up"
            delay={(index % 4) * 80}
            duration={500}
            className="h-full"
          >
            <GlassPanel
              radius="card"
              interactive
              className="system-card h-full interactive-card-motion"
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
          </Reveal>
        );
      })}
    </PointerRevealGroup>
  );
}

