import { PageContainer } from "@/components/layout/page-container";
import HeroSection from "@/components/layout/sections/HeroSection";
import {ProjectsSection} from "@/components/layout/sections/ProjectsSection";
import { WorkflowSection } from "@/components/layout/sections/workflow-section";


export default function Home() {
  return (
    <PageContainer className=" space-y-2">
      <HeroSection />
      <ProjectsSection />
      <WorkflowSection />
    </PageContainer>
  );
}
