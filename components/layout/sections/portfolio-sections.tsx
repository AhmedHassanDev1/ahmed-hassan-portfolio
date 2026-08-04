import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PointerRevealGroup } from "@/components/ui/pointer-reveal";
import {
  aboutContent,
  contactContent,
  experienceContent,
  servicesContent,
  skillsContent,
  testimonialsContent,
} from "@/content/portfolio-content";
import { cn } from "@/lib/utils";
import { SectionContainer } from "../section-container";
import { AboutTerminal } from "./about-terminal";

type ServiceVisual = (typeof servicesContent.services)[number]["visual"];

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

function ServiceDiagram({
  visual,
  title,
}: {
  visual: ServiceVisual;
  title: string;
}) {
  const titleId = `service-diagram-${visual}-title`;
  const descriptionId = `service-diagram-${visual}-description`;

  return (
    <svg
      className="service-diagram"
      viewBox="0 0 360 210"
      role="img"
      aria-labelledby={`${titleId} ${descriptionId}`}
    >
      <title id={titleId}>{title} technical diagram</title>
      <desc id={descriptionId}>
        A flat technical system diagram representing {title}.
      </desc>
      <defs>
        <pattern
          id={`service-dot-grid-${visual}`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" className="diagram-grid-dot" />
        </pattern>
      </defs>
      <rect
        width="360"
        height="210"
        rx="18"
        className="diagram-field"
        fill={`url(#service-dot-grid-${visual})`}
      />

      {visual === "saas" && (
        <>
          <g className="diagram-panel diagram-shift-a">
            <rect x="22" y="42" width="78" height="68" rx="7" />
            <path d="M22 66h78" />
            <circle cx="42" cy="90" r="10" />
            <path d="M56 88h27M56 98h20" />
          </g>
          <g className="diagram-panel diagram-shift-b">
            <rect x="130" y="24" width="112" height="88" rx="7" />
            <path d="M130 48h112M150 72h70M150 87h52M150 102h82" />
            <rect x="146" y="124" width="96" height="48" rx="7" />
            <path d="M160 145h22M160 160h44M214 145h16M214 160h14" />
          </g>
          <g className="diagram-panel diagram-shift-c">
            <rect x="272" y="42" width="66" height="76" rx="7" />
            <path d="M287 68h34M287 86h24M287 104h30" />
            <circle cx="319" cy="105" r="8" />
          </g>
          <path className="diagram-path" d="M100 76h30M242 76h30M186 112v12" />
          <circle className="diagram-node" cx="100" cy="76" r="3" />
          <circle className="diagram-node" cx="130" cy="76" r="3" />
          <circle className="diagram-node" cx="242" cy="76" r="3" />
          <circle className="diagram-node" cx="272" cy="76" r="3" />
          <circle className="diagram-node" cx="186" cy="124" r="3" />
        </>
      )}

      {visual === "full-stack" && (
        <>
          <g className="diagram-panel diagram-shift-a">
            <rect x="26" y="48" width="96" height="88" rx="7" />
            <path d="M26 72h96M46 103l20-18 22 22 15-13" />
            <path d="M48 122h48" />
          </g>
          <g className="diagram-panel diagram-shift-b">
            <rect x="162" y="54" width="92" height="86" rx="7" />
            <path d="M176 80h64M176 98h64M176 116h48" />
            <path d="M162 74h92" />
          </g>
          <g className="diagram-stack diagram-shift-c">
            <ellipse cx="308" cy="78" rx="32" ry="12" />
            <path d="M276 78v48c0 7 14 12 32 12s32-5 32-12V78" />
            <path d="M276 102c0 7 14 12 32 12s32-5 32-12" />
          </g>
          <path className="diagram-path" d="M122 92h40M254 92h22" />
          <circle className="diagram-node" cx="122" cy="92" r="3" />
          <circle className="diagram-node" cx="162" cy="92" r="3" />
          <circle className="diagram-node" cx="254" cy="92" r="3" />
          <circle className="diagram-node" cx="276" cy="92" r="3" />
        </>
      )}

      {visual === "agents" && (
        <>
          <g className="diagram-agent">
            <circle cx="180" cy="105" r="36" />
            <text x="180" y="101" textAnchor="middle">AI</text>
            <text x="180" y="119" textAnchor="middle">AGENT</text>
          </g>
          {[
            { x: 26, y: 40, label: "Search" },
            { x: 268, y: 40, label: "API" },
            { x: 268, y: 134, label: "Database" },
            { x: 26, y: 134, label: "Email" },
          ].map((tool, index) => (
            <g
              key={tool.label}
              className={cn("diagram-panel", `diagram-tool-${index + 1}`)}
            >
              <rect x={tool.x} y={tool.y} width="66" height="46" rx="7" />
              <circle cx={tool.x + 18} cy={tool.y + 22} r="8" />
              <path d={`M${tool.x + 31} ${tool.y + 22}h22`} />
              <text x={tool.x + 33} y={tool.y + 27}>{tool.label}</text>
            </g>
          ))}
          <path className="diagram-path" d="M92 63c31 0 31 42 52 42" />
          <path className="diagram-path" d="M268 63c-31 0-31 42-52 42" />
          <path className="diagram-path" d="M268 157c-31 0-31-42-52-42" />
          <path className="diagram-path" d="M92 157c31 0 31-42 52-42" />
          {[144, 216].map((x) => (
            <circle key={x} className="diagram-node" cx={x} cy="105" r="3" />
          ))}
        </>
      )}

      {visual === "rag" && (
        <>
          {[
            { x: 18, label: "Docs" },
            { x: 88, label: "Chunks" },
            { x: 158, label: "Vectors" },
            { x: 232, label: "DB" },
            { x: 296, label: "Answer" },
          ].map((step, index) => (
            <g key={step.label} className={cn("diagram-panel", `diagram-step-${index + 1}`)}>
              <rect x={step.x} y="62" width="52" height="78" rx="6" />
              <text x={step.x + 26} y="81" textAnchor="middle">
                {step.label}
              </text>
              {index === 0 && <path d={`M${step.x + 17} 96h18M${step.x + 17} 108h18M${step.x + 17} 120h14`} />}
              {index === 1 && <path d={`M${step.x + 14} 98h24M${step.x + 14} 110h24M${step.x + 14} 122h24`} />}
              {index === 2 && <path d={`M${step.x + 12} 98h28M${step.x + 12} 112h28M${step.x + 12} 126h18`} />}
              {index === 3 && (
                <>
                  <ellipse cx={step.x + 26} cy="100" rx="20" ry="8" />
                  <path d={`M${step.x + 6} 100v24c0 5 9 8 20 8s20-3 20-8v-24`} />
                </>
              )}
              {index === 4 && <path d={`M${step.x + 13} 98h26M${step.x + 13} 112h20M${step.x + 13} 126h24`} />}
            </g>
          ))}
          <path className="diagram-path" d="M70 101h18M140 101h18M210 101h22M284 101h12" />
          {[70, 88, 140, 158, 210, 232, 284, 296].map((x) => (
            <circle key={x} className="diagram-node" cx={x} cy="101" r="3" />
          ))}
        </>
      )}

      {visual === "backend" && (
        <>
          <g className="diagram-panel diagram-gateway">
            <rect x="132" y="72" width="76" height="66" rx="8" />
            <path d="M170 88l20 12v24l-20 12-20-12v-24z" />
            <text x="170" y="157" textAnchor="middle">API Gateway</text>
          </g>
          {[
            { x: 242, y: 36, label: "Auth" },
            { x: 242, y: 84, label: "Service" },
            { x: 242, y: 132, label: "Cache" },
            { x: 40, y: 86, label: "Client" },
            { x: 112, y: 158, label: "Database" },
          ].map((item, index) => (
            <g key={item.label} className={cn("diagram-panel", `diagram-step-${index + 1}`)}>
              <rect x={item.x} y={item.y} width="76" height="34" rx="6" />
              <text x={item.x + 38} y={item.y + 22} textAnchor="middle">
                {item.label}
              </text>
            </g>
          ))}
          <path className="diagram-path" d="M116 103h16M208 91h34M208 105h34M208 119h34M170 138v20" />
          {[116, 132, 208, 242, 170].map((x, index) => (
            <circle
              key={`${x}-${index}`}
              className="diagram-node"
              cx={x}
              cy={index === 4 ? 158 : index < 2 ? 103 : 105}
              r="3"
            />
          ))}
        </>
      )}

      {visual === "dashboards" && (
        <>
          <g className="diagram-panel diagram-dashboard">
            <rect x="36" y="28" width="288" height="154" rx="8" />
            <path d="M78 28v154M78 66h246M188 66v116M256 66v116" />
            <path d="M104 126l16-18 18 10 18-28 18 16" />
            <rect x="204" y="92" width="34" height="18" rx="4" />
            <rect x="204" y="122" width="40" height="8" rx="3" />
            <rect x="204" y="140" width="30" height="8" rx="3" />
            <path d="M274 92h26M274 110h20M274 128h26M274 146h16" />
            <circle cx="304" cy="92" r="4" />
            <circle cx="304" cy="128" r="4" />
          </g>
          <g className="diagram-sidebar">
            <path d="M52 54h12M52 80h12M52 106h12M52 132h12M52 158h12" />
          </g>
          {[104, 120, 138, 156, 174, 304].map((x, index) => (
            <circle
              key={`${x}-${index}`}
              className="diagram-node"
              cx={x}
              cy={index < 5 ? [126, 108, 118, 90, 106][index] : 92}
              r="3"
            />
          ))}
        </>
      )}
    </svg>
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
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </GlassPanel>
            );
          })}
        </PointerRevealGroup>
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

        <PointerRevealGroup className="service-grid" aria-label="Services">
          {servicesContent.services.map((service) => (
            <GlassPanel
              key={service.title}
              radius="card"
              className="service-card"
              data-reveal-card
              tabIndex={0}
              role="group"
              aria-label={`${service.number}. ${service.title}: ${service.description}`}
            >
              <div className="service-card-visual">
                <ServiceDiagram visual={service.visual} title={service.title} />
              </div>
              <div className="service-card-copy">
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </GlassPanel>
          ))}
        </PointerRevealGroup>
      </div>
    </SectionContainer>
  );
}

export function ExperienceSection() {
  return (
    <SectionContainer
      id="experience"
      aria-labelledby="experience-heading"
      contained={false}
      className="section-band"
    >
      <div className="section-shell experience-shell">
        <SectionHeader
          eyebrow={experienceContent.eyebrow}
          title={experienceContent.title}
        />

        <PointerRevealGroup
          className="timeline-reveal-group"
          aria-label="Experience stages"
        >
          <ol className="timeline-list">
            {experienceContent.items.map((item) => (
              <li key={item.period} data-reveal-card>
                <span>{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </PointerRevealGroup>
      </div>
    </SectionContainer>
  );
}

export function TestimonialsSection() {
  return (
    <SectionContainer
      id="testimonials"
      aria-labelledby="testimonials-heading"
      contained={false}
    >
      <div className="section-shell">
        <SectionHeader
          eyebrow={testimonialsContent.eyebrow}
          title={testimonialsContent.title}
          align="center"
        />

        <PointerRevealGroup
          className="testimonial-grid"
          aria-label="Testimonials"
        >
          {testimonialsContent.quotes.map((item) => (
            <GlassPanel
              key={item.name}
              radius="card"
              className="quote-card"
              data-reveal-card
            >
              <blockquote>{item.quote}</blockquote>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </GlassPanel>
          ))}
        </PointerRevealGroup>
      </div>
    </SectionContainer>
  );
}

export function ContactSection() {
  return (
    <SectionContainer
      id="contact"
      aria-labelledby="contact-heading"
      contained={false}
      className="contact-section"
    >
      <PointerRevealGroup
        className="section-shell contact-shell"
        aria-label="Contact call to action"
        data-reveal-card
      >
        <div>
          <span className="section-eyebrow">{contactContent.eyebrow}</span>
          <h2 id="contact-heading" className="section-title">
            {contactContent.title}
          </h2>
          <p className="section-description">{contactContent.description}</p>

          <div className="contact-actions">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={contactContent.actions[0].href} />}
            >
              <Mail data-icon="inline-start" aria-hidden="true" />
              {contactContent.actions[0].label}
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href={contactContent.actions[1].href} />}
            >
              {contactContent.actions[1].label}
              <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <GlassPanel radius="panel" className="contact-panel">
          <a href={`mailto:${contactContent.email}`}>{contactContent.email}</a>
          <div className="contact-signal-grid">
            {contactContent.signals.map((signal) => {
              const Icon = signal.icon;

              return (
                <div key={signal.label}>
                  <Icon aria-hidden="true" />
                  <span>{signal.label}</span>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </PointerRevealGroup>
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
