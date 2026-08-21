"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Loader2, LockKeyhole } from "lucide-react";

import { contactContent } from "@/content/contact-content";
import { Magnetic, Reveal } from "@/components/motion";

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

function validateContactFields(
  formData: FormData,
): Partial<Record<ContactFieldName, string>> {
  const errors: Partial<Record<ContactFieldName, string>> = {};
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const message = getFormValue(formData, "message");

  if (!name || name.length < FIELD_LIMITS.name.min) {
    errors.name = "Please enter your name (at least 2 characters).";
  } else if (name.length > FIELD_LIMITS.name.max) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > FIELD_LIMITS.email.max) {
    errors.email = "Email cannot exceed 254 characters.";
  }

  if (!message || message.length < FIELD_LIMITS.message.min) {
    errors.message = "Please enter a message of at least 10 characters.";
  } else if (message.length > FIELD_LIMITS.message.max) {
    errors.message = "Message cannot exceed 5,000 characters.";
  }

  return errors;
}

export function ContactSection() {
  const { sectionId, eyebrow, title, description, background, form } =
    contactContent;
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<ContactFieldName, string>>
  >({});
  const isSubmittingRef = useRef(false);
  const isSubmitting = status === "submitting";

  function handleFieldChange(fieldName: ContactFieldName) {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }

    if (status === "error") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const errors = validateContactFields(formData);
    const errorKeys = Object.keys(errors) as ContactFieldName[];

    if (errorKeys.length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setStatusMessage("Please check the highlighted fields above.");

      const firstInvalidField = form.fields.find(
        (f) => f.name === errorKeys[0],
      );
      if (firstInvalidField) {
        const element = document.getElementById(firstInvalidField.id);
        if (element) {
          element.focus();
        }
      }
      return;
    }

    setFieldErrors({});
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

      let result: ContactResponse | null = null;
      try {
        result = (await response.json()) as ContactResponse;
      } catch {
        // Handle non-JSON response gracefully
      }

      if (!response.ok || !result?.success) {
        const errorMessage =
          result?.message ?? "Unable to send message. Please try again.";
        throw new Error(errorMessage);
      }

      formElement.reset();
      setFieldErrors({});
      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again or reach out directly.",
      );
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
          <Reveal variant="fade-up" duration={480} className="contact-heading">
            <header>
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
          </Reveal>

          <Reveal
            variant="reveal"
            delay={80}
            duration={550}
            className="w-full max-w-[39rem]"
          >
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
                {form.fields.map((field) => {
                  const hasError = Boolean(fieldErrors[field.name]);
                  const errorId = `${field.id}-error`;

                  return (
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
                          aria-invalid={hasError ? "true" : undefined}
                          aria-describedby={hasError ? errorId : undefined}
                          onChange={() => handleFieldChange(field.name)}
                          disabled={isSubmitting}
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
                          aria-invalid={hasError ? "true" : undefined}
                          aria-describedby={hasError ? errorId : undefined}
                          onChange={() => handleFieldChange(field.name)}
                          disabled={isSubmitting}
                        />
                      )}

                      {hasError && (
                        <span
                          id={errorId}
                          className="contact-field-error"
                          role="alert"
                        >
                          {fieldErrors[field.name]}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <Magnetic maxDisplacement={6} className="w-full">
                <button
                  type="submit"
                  className="contact-submit"
                  aria-label={form.submit.ariaLabel}
                  aria-busy={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="contact-submit-spinner"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>{form.submit.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="contact-submit-icon motion-arrow-icon"
                      />
                    </>
                  )}
                </button>
              </Magnetic>

              {statusMessage ? (
                <p
                  className={`contact-status contact-status--${status}`}
                  role={status === "error" ? "alert" : "status"}
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
