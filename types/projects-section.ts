type ProjectIcon = "arrow-right" | "arrow-up-right";

type ProjectLayout = "large" | "portrait" | "wide";

type ProjectAction = {
  label: string;
  href: string;
  icon: ProjectIcon;
};

export type Project = {
  id: string;
  number: string;
  name: string;
  badge: string;
  type: string;
  description: string;
  category: string;
  capabilities: string[];
  technologies: string[];
  image: string;
  imageAlt: string;
  action: ProjectAction;
  featured: boolean;
  layout: ProjectLayout;
};

export type ProjectsContentType = {
  header: {
    eyebrow: string;
    title: {
      beforeHighlight: string;
      highlight: string;
    };
    description: string;
    action: ProjectAction;
  };

  projects: Project[];

  footer: {
    text: string;
    highlight: string;
    action: ProjectAction;
  };
};
