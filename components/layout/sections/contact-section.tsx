import Image from "next/image";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

import {contactContent} from "@/content/contact-content"

export function ContactSection() {
  const { sectionId, eyebrow, title, description, background, form } =
    contactContent;

  return (
    <section
      id={sectionId}
      className="contact-section"
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="contact-shell">
        <div className="contact-background" aria-hidden="true">
          <Image
            src={background.src}
            alt={background.alt}
            fill
            sizes="(max-width: 820px) calc(100vw - 1.25rem), 1280px"
            className="contact-background-image"
          />
        </div>

        <div className="contact-overlay" aria-hidden="true" />

        <div className="contact-content">
          <header className="contact-heading">
            <p className="contact-eyebrow">
              <span>{eyebrow.label}</span>
              <span
                aria-hidden="true"
                className="contact-eyebrow-separator"
              >
                {eyebrow.separator}
              </span>
              <span className="contact-eyebrow-accent">
                {eyebrow.accent}
              </span>
            </p>

            <h2 id={`${sectionId}-title`} className="contact-title">
              {title.primary}
              <span className="contact-title-accent">{title.accent}</span>
            </h2>

            <p className="contact-description">{description}</p>
          </header>

          <form
            className="contact-form"
            action={form.action}
            method={form.method}
          >
            <input type="hidden" name="source" value={form.source} />

            <div className="contact-fields">
              {form.fields.map((field) => (
                <div className="contact-field" key={field.id}>
                  <label className="contact-label" htmlFor={field.id}>
                    {field.label}
                  </label>

                  {field.kind === "textarea" ? (
                    <textarea
                      id={field.id}
                      name={field.name}
                      className="contact-textarea"
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      rows={field.rows}
                      maxLength={field.maxLength}
                      required={field.required}
                    />
                  ) : (
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      className="contact-input"
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="contact-submit"
              aria-label={form.submit.ariaLabel}
            >
              <span>{form.submit.label}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="contact-submit-icon"
              />
            </button>

            <p className="contact-note">
              <LockKeyhole aria-hidden="true" className="contact-note-icon" />
              <span>{form.note}</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
