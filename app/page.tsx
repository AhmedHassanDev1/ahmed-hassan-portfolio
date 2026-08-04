import HeroSection from "@/components/layout/sections/HeroSection";
import { ProjectsSection } from "@/components/layout/sections/ProjectsSection";
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  FooterSection,
  ServicesSection,
  SkillsSection,
  TestimonialsSection,
} from "@/components/layout/sections/portfolio-sections";
import { WorkflowSection } from "@/components/layout/sections/workflow-section";

export default function Home() {
  return (
    <main className="site-main">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkflowSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
