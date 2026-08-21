export const footerContent = {
  brand: {
    logo: {
      initials: "AH",
      name: "Ahmed Hassan",
      role: "Full-Stack AI Product Developer",
      href: "#home",
    },
    description:
      "Building intelligent digital products and systems that solve real problems and create impact. From idea to launch, I turn complexity into simple, scalable solutions.",
    contactItems: [
      {
        id: "email",
        label: "ahmedhassan.dev20@gmail.com",
        href: "mailto:hello@ahmedhassan.dev",
        icon: "mail",
      },
      {
        id: "phone",
        label: "+20 11 5413 8204",
        href: "tel:+201154138204",
        icon: "phone",
      },
      {
        id: "location",
        label: "Giza, Egypt",
        href: null,
        icon: "location",
      },
      {
        id: "availability",
        label: "Available for new opportunities",
        href: "#contact",
        icon: "calendar",
      },
    ],
  },

  navigation: {
    title: "Navigation",
    ariaLabel: "Footer navigation",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Workflow", href: "#workflow" },
      { label: "Projects", href: "#projects" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },

  services: {
    title: "Services",
    links: [
      {
        label: "SaaS Product Development",
        href: "#services",
        icon: "saas",
      },
      {
        label: "Full-Stack Web Applications",
        href: "#services",
        icon: "layers",
      },
      {
        label: "AI Agents & Automation",
        href: "#services",
        icon: "sparkles",
      },
      {
        label: "RAG & Knowledge Systems",
        href: "#services",
        icon: "database",
      },
      {
        label: "Backend & API Architecture",
        href: "#services",
        icon: "code",
      },
      {
        label: "Dashboards & Internal Tools",
        href: "#services",
        icon: "dashboard",
      },
    ],
  },

  social: {
    title: "Connect",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/AhmedHassanDev1",
        icon: "github",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ahmed-hassan-02a006235/",
        icon: "linkedin",
      },
      
      {
        label: "Email Me",
        href: "mailto:Ahmedhassan.dev20@gmail.com",
        icon: "mail",
      },
    ],
  },

  newsletter: {
    title: "Let’s Stay in Touch",
    description: "Get updates on new projects, articles, and insights.",
    form: {
      action: "/api/newsletter",
      method: "post",
      inputId: "footer-newsletter-email",
      inputName: "email",
      inputType: "email",
      inputLabel: "Email address",
      inputPlaceholder: "Your email address",
      buttonLabel: "Subscribe",
    },
  },

  bottomBar: {
    copyright: "© 2026 Ahmed Hassan. All rights reserved.",
    status: {
      firstText: "Building",
      firstAccent: "products.",
      secondText: "Solving",
      secondAccent: "problems.",
    },
    legalAriaLabel: "Legal navigation",
    legalLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Use", href: "#terms" },
    ],
  },
} as const;

export type FooterContent = typeof footerContent;
