export const contactContent = {
  sectionId: "contact",

  eyebrow: {
    label: "Contact",
    separator: "/",
    accent: "Start a project",
  },

  title: {
    primary: "Have an idea",
    accent: "worth building?",
  },

  description:
    "Tell me what you’re building, and I’ll help turn it into a useful, scalable digital product.",

  background: {
    src: "/contact-img.png",
    alt: "contact-img",
  },

  form: {
    action: "/api/contact",
    method: "post",
    source: "portfolio-contact-section",

    fields: [
      {
        kind: "input",
        id: "contact-name",
        name: "name",
        label: "Your name",
        placeholder: "Enter your name",
        type: "text",
        autoComplete: "name",
        required: true,
      },
      {
        kind: "input",
        id: "contact-email",
        name: "email",
        label: "Email address",
        placeholder: "Enter your email",
        type: "email",
        autoComplete: "email",
        required: true,
      },
      {
        kind: "textarea",
        id: "contact-message",
        name: "message",
        label: "Tell me about your idea",
        placeholder: "Describe your idea, goals, and what you need help with...",
        autoComplete: "off",
        rows: 5,
        maxLength: 2000,
        required: true,
      },
    ],

    submit: {
      label: "Send Message",
      ariaLabel: "Send project message",
    },

    note: "No spam. Just a focused conversation.",
  },
} as const;

export type ContactContent = typeof contactContent;
