import Link from "next/link";


import {
  aboutContent,

  servicesContent,
  skillsContent,
} from "@/content/portfolio-content";
import { cn } from "@/lib/utils";
import { SectionContainer } from "../section-container";
import { AboutTerminal } from "./about-terminal";

import { SkillsGrid } from "./skills-grid";
import { ServicesGrid } from "./services-grid";


function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "section-heading",
        align === "center" && "section-heading-center",
      )}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}


export function AboutSection() {
  return (
    <SectionContainer
      id="about"
      aria-labelledby="about-heading"
      contained={false}
      className="about-section"
    >
      <div className="section-shell about-layout">
        <div className="about-intro">
          <span className="about-label">{aboutContent.eyebrow}</span>
          <h2 id="about-heading" className="about-title">
            {aboutContent.title}
          </h2>
          <p className="about-description">{aboutContent.description}</p>

          <ul className="about-principles" aria-label="Core principles">
            {aboutContent.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>

          <p className="about-statement">{aboutContent.statement}</p>
        </div>

        <div className="about-terminal-wrap">
          <AboutTerminal terminal={aboutContent.terminal} />
        </div>
      </div>
    </SectionContainer>
  );
}

export function SkillsSection() {
  return (
    <SectionContainer
      id="skills"
      aria-labelledby="skills-heading"
      contained={false}
      className="section-band"
    >
      <div className="section-shell">
        <SectionHeader
          eyebrow={skillsContent.eyebrow}
          title={skillsContent.title}
          description={skillsContent.description}
        />

        <SkillsGrid />
      </div>
    </SectionContainer>
  );
}

export function ServicesSection() {
  return (
    <SectionContainer
      id="services"
      aria-labelledby="services-heading"
      contained={false}
      className="section-band"
    >
      <div className="section-shell">
        <div className="section-heading section-heading-center services-heading">
          <span className="section-eyebrow">{servicesContent.eyebrow}</span>
          <h2 id="services-heading" className="section-title">
            {servicesContent.title.base}{" "}
            <span>{servicesContent.title.highlight}</span>
          </h2>
          <p className="section-description">{servicesContent.description}</p>
        </div>

        <ServicesGrid />
      </div>
    </SectionContainer>
  );
}






export function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-shell">
        <Link href="#home" className="footer-brand">
          Ahmed Hassan
        </Link>
        <nav aria-label="Footer navigation">
          {["About", "Projects", "Services", "Contact"].map((label) => (
            <Link key={label} href={`#${label.toLowerCase()}`}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
