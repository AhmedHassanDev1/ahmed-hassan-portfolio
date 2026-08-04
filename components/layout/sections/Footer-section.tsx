import type { SVGProps } from "react";
import type { LucideIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import {
  Boxes,
  CalendarDays,
  BarChart3,
  Code2,
  Database,

  Layers3,
 
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  SquareTerminal,
} from "lucide-react";

import { Logo } from "@/components/ui/Logo";

import { footerContent } from "@/content/footer-content";

type IconProps = SVGProps<SVGSVGElement>;
const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  location: MapPin,
  calendar: CalendarDays,
  saas: Boxes,
  layers: Layers3,
  sparkles: Sparkles,
  database: Database,
  code: Code2,
  dashboard: BarChart3,
  github: FaGithub,
  linkedin: FaLinkedin,
};

function XBrandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 4.75 18.75 19.25M19 4.75 5.25 19.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterIcon({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  if (name === "x") {
    return <XBrandIcon className={className} />;
  }

  const Icon = iconMap[name];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} aria-hidden="true" />;
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Footer() {
  const { brand, navigation, services, social, newsletter, bottomBar } =
    footerContent;

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <section className="footer-column footer-brand-column">
          <Logo  />

          <p className="footer-description">{brand.description}</p>

          <ul className="footer-contact-list">
            {brand.contactItems.map((item) => {
              const content = (
                <>
                  <FooterIcon
                    name={item.icon}
                    className="footer-contact-icon"
                  />
                  <span>{item.label}</span>
                </>
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <a href={item.href} className="footer-contact-link">
                      {content}
                    </a>
                  ) : (
                    <div className="footer-contact-item">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="footer-column">
          <h2 className="footer-heading">{navigation.title}</h2>

          <nav aria-label={navigation.ariaLabel}>
            <ul className="footer-nav-list">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">
                    <span>{link.label}</span>
                    <span className="footer-nav-arrow" aria-hidden="true">
                      ›
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section className="footer-column">
          <h2 className="footer-heading">{services.title}</h2>

          <ul className="footer-services-list">
            {services.links.map((service) => (
              <li key={service.label}>
                <a href={service.href} className="footer-service-link">
                  <FooterIcon
                    name={service.icon}
                    className="footer-service-icon"
                  />
                  <span>{service.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="footer-column">
          <h2 className="footer-heading">{social.title}</h2>

          <ul className="footer-social-list">
            {social.links.map((link) => {
              const external = isExternalLink(link.href);

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-social-link"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                  >
                    <FooterIcon
                      name={link.icon}
                      className="footer-social-icon"
                    />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="footer-column footer-newsletter-column">
          <h2 className="footer-heading">{newsletter.title}</h2>

          <p className="footer-newsletter-description">
            {newsletter.description}
          </p>

          <form
            className="footer-newsletter-form"
            action={newsletter.form.action}
            method={newsletter.form.method}
          >
            <label
              htmlFor={newsletter.form.inputId}
              className="footer-sr-only"
            >
              {newsletter.form.inputLabel}
            </label>

            <input
              id={newsletter.form.inputId}
              name={newsletter.form.inputName}
              type={newsletter.form.inputType}
              placeholder={newsletter.form.inputPlaceholder}
              className="footer-newsletter-input"
              autoComplete="email"
              required
            />

            <button type="submit" className="footer-newsletter-submit">
              <span>{newsletter.form.buttonLabel}</span>
              <Send aria-hidden="true" />
            </button>
          </form>
        </section>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">{bottomBar.copyright}</p>

        <div className="footer-status">
          <SquareTerminal className="footer-status-code" aria-hidden="true" />
          <span className="footer-status-dot" aria-hidden="true" />
          <span>{bottomBar.status.firstText}</span>
          <span className="footer-status-accent">
            {bottomBar.status.firstAccent}
          </span>
          <span>{bottomBar.status.secondText}</span>
          <span className="footer-status-accent">
            {bottomBar.status.secondAccent}
          </span>
        </div>

        <nav className="footer-legal" aria-label={bottomBar.legalAriaLabel}>
          {bottomBar.legalLinks.map((link, index) => (
            <span key={link.href} className="footer-legal-item">
              {index > 0 ? (
                <span className="footer-legal-separator" aria-hidden="true" />
              ) : null}
              <a href={link.href} className="footer-legal-link">
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
