import type { Project } from "@/content/projects-content";
import { projectsContent } from "@/content/projects-content";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import { SectionContainer } from "../section-container";
import Image from "next/image";

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

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <div className="visual-toolbar">
        <span />
        <span />
        <span />
      </div>

      {kind === "map" && (
        <>
          <div className="map-grid" />
          <div className="route route-a" />
          <div className="route route-b" />
          <div className="metric metric-a">
            <b>72%</b>
            <small>efficiency</small>
          </div>
          <div className="metric metric-b">
            <b>184</b>
            <small>shipments</small>
          </div>
        </>
      )}

      {kind === "cloud" && (
        <>
          <div className="cloud-chart chart-one" />
          <div className="cloud-chart chart-two" />
          <div className="cloud-world" />
          <div className="cloud-table" />
        </>
      )}

      {kind === "graph" && (
        <div className="graph-nodes">
          {[0, 1, 2, 3, 4, 5, 6].map((node) => (
            <i key={node} style={{ "--node": node } as React.CSSProperties} />
          ))}
        </div>
      )}

      {kind === "network" && (
        <div className="network-nodes">
          {[0, 1, 2, 3, 4, 5].map((node) => (
            <i key={node} style={{ "--node": node } as React.CSSProperties} />
          ))}
        </div>
      )}
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

      <dl>
        <div>
          <dt>Category:</dt>
          <dd>{project.category}</dd>
        </div>
        <div>
          <dt>Capability:</dt>
          <dd>{project.capabilities.join(" / ")}</dd>
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
      {visualFirst && <ProjectVisual kind={project.visual} />}
      <ProjectCopy project={project} />
      {!visualFirst && <ProjectVisual kind={project.visual} />}
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
