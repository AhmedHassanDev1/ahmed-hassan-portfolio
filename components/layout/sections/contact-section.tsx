"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

import { contactContent } from "@/content/contact-content";

type ContactFormStatus = "idle" | "submitting" | "success" | "error";
type ContactFieldName = "name" | "email" | "message";
type ContactResponse = {
  success: boolean;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getInvalidFields(formData: FormData) {
  const invalidFields = new Set<ContactFieldName>();
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const message = getFormValue(formData, "message");

  if (
    name.length < FIELD_LIMITS.name.min ||
    name.length > FIELD_LIMITS.name.max
  ) {
    invalidFields.add("name");
  }

  if (email.length > FIELD_LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    invalidFields.add("email");
  }

  if (
    message.length < FIELD_LIMITS.message.min ||
    message.length > FIELD_LIMITS.message.max
  ) {
    invalidFields.add("message");
  }

  return invalidFields;
}

export function ContactSection() {
  const { sectionId, eyebrow, title, description, background, form } =
    contactContent;
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState<Set<ContactFieldName>>(
    () => new Set(),
  );
  const isSubmittingRef = useRef(false);
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const nextInvalidFields = getInvalidFields(formData);

    setInvalidFields(nextInvalidFields);

    if (nextInvalidFields.size > 0) {
      setStatus("error");
      setStatusMessage("Please check your details and try again.");
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(form.action, {
        method: form.method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getFormValue(formData, "name"),
          email: getFormValue(formData, "email"),
          message: getFormValue(formData, "message"),
          website: getFormValue(formData, "website"),
        }),
      });
      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Contact request failed.");
      }

      formElement.reset();
      setInvalidFields(new Set());
      setStatus("success");
      setStatusMessage("Message sent successfully. I'll get back to you soon.");
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      isSubmittingRef.current = false;
    }
  }

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
            onSubmit={handleSubmit}
            noValidate
          >
            <input type="hidden" name="source" value={form.source} />
            <div className="contact-honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

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
                      minLength={field.minLength}
                      maxLength={field.maxLength}
                      required={field.required}
                      aria-invalid={
                        invalidFields.has(field.name) ? "true" : undefined
                      }
                    />
                  ) : (
                    <input
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      className="contact-input"
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      minLength={
                        "minLength" in field ? field.minLength : undefined
                      }
                      maxLength={field.maxLength}
                      required={field.required}
                      aria-invalid={
                        invalidFields.has(field.name) ? "true" : undefined
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="contact-submit"
              aria-label={form.submit.ariaLabel}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Sending..." : form.submit.label}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="contact-submit-icon"
              />
            </button>

            {statusMessage ? (
              <p
                className={`contact-status contact-status--${status}`}
                aria-live="polite"
              >
                {statusMessage}
              </p>
            ) : null}

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
