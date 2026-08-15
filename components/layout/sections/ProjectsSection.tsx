import type { Project, ProjectLayout } from "@/content/projects-content";
import { projectsContent } from "@/content/projects-content";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import { SectionContainer } from "../section-container";
import Image from "next/image";

const projectImageSizes: Record<ProjectLayout, string> = {
  featured:
    "(max-width: 820px) calc(100vw - 1.3rem), (max-width: 1200px) calc(61vw - 1.7rem), 730px",
  tall:
    "(max-width: 820px) calc(100vw - 1.3rem), (max-width: 1200px) calc(31vw - 1.2rem), 350px",
  compact:
    "(max-width: 820px) calc(100vw - 1.3rem), (max-width: 1200px) calc(31vw - 1.2rem), 350px",
  wide:
    "(max-width: 820px) calc(100vw - 1.3rem), (max-width: 1200px) calc(34vw - 1.2rem), 410px",
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 16 16"
      fill="none"
    >
      {diagonal ? (
        <path d="M4 12 12 4m0 0H6m6 0v6" />
      ) : (
        <path d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5" />
      )}
    </svg>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="project-visual">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={projectImageSizes[project.layout]}
        className="project-image"
      />

      <div className="visual-toolbar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function ProjectCopy({ project }: { project: Project }) {
  return (
    <div className="project-copy">
      <div className="project-meta">
        <span>{project.number}</span>
        <span>{project.eyebrow}</span>
      </div>

      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>

      <dl >
        <div className="text-sm">
          <dt>Category:</dt>
          <dd >{project.category}</dd>
        </div>
        <div className="text-sm">
          <dt >Capability:</dt>
          <dd >{project.capabilities.join(" / ")}</dd>
        </div>
      </dl>

      <a className="project-link" href={project.href}>
        {project.actionLabel}
        <Arrow diagonal />
      </a>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const visualFirst = project.layout === "compact";

  return (
    <article
      className={`project-card project-${project.layout}`}
      id={project.id}
      data-reveal-card
    >
      {visualFirst && <ProjectVisual project={project} />}
      <ProjectCopy project={project} />
      {!visualFirst && <ProjectVisual project={project} />}
    </article>
  );
}

export function ProjectsSection() {
  const { header, projects, footer } = projectsContent;

  return (
    <SectionContainer
      id="projects"
      aria-labelledby="projects-heading"
      spacing="none"
      overflow="hidden"
      contained={false}
      className="projects-section"
    >
      <div className="section-shell projects-shell">
        <header className="projects-header">
          <Image
            src={header.image}
            alt=""
            fill
            sizes="(max-width: 820px) 100vw, 1120px"
            className="object-cover object-center"
          />
          <div className="projects-header-content">
            <span className="eyebrow">{header.eyebrow}</span>
            <h2 id="projects-heading">
              {header.title}
              <em>{header.highlight}</em>
            </h2>
            <p>{header.description}</p>
            <a href={header.actionHref} className="header-link">
              {header.actionLabel}
              <Arrow />
            </a>
          </div>
        </header>

        <PointerRevealGroup className="projects-grid" id="all-projects">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </PointerRevealGroup>

        <a className="projects-footer" href={footer.href}>
          <span>{footer.text}</span>
          <strong>{footer.highlight}</strong>
          <Arrow />
        </a>
      </div>
    </SectionContainer>
  );
}
