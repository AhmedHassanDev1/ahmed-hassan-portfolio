import HeroSection from "@/components/layout/sections/HeroSection";
import { ProjectsSection } from "@/components/layout/sections/ProjectsSection";
import {
  AboutSection,
  ServicesSection,
  SkillsSection,
} from "@/components/layout/sections/portfolio-sections";
import { WorkflowSection } from "@/components/layout/sections/workflow-section";
import FooterSection from "@/components/layout/sections/Footer-section";
import { ContactSection } from "@/components/layout/sections/contact-section";

export default function Home() {
  return (
    <main className="site-main">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkflowSection />
      <ProjectsSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
