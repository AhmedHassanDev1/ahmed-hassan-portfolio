import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import {
  Magnetic,
  Reveal,
  Stagger,
  StaggerItem,
  TextReveal,
} from "@/components/motion";
import { Hero3DCanvas } from "@/components/visual/hero/Hero3DCanvas";
import { HeroHUDMarkers } from "@/components/visual/hero/HeroHUDMarkers";
import { heroContent } from "@/content/hero-content";
import { cn } from "@/lib/utils";

function HeroSection() {
  const {
    availability,
    introduction,
    role,
    description,
    actions,
    visual,
    capabilities,
    expertise,
  } = heroContent;

  return (
    <SectionContainer
      id="home"
      aria-labelledby="hero-heading"
      spacing="none"
      overflow="hidden"
      contained={false}
      className="portfolio-hero bg-background"
    >
      <div className="flex min-h-svh flex-col bg-background xl:h-svh xl:min-h-0">
        {/* Main visual */}
        <div className="relative isolate min-h-[46rem] flex-1 overflow-hidden xl:min-h-0">
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[24%_center] transition-transform duration-1000 ease-out sm:object-[32%_center] md:object-[32%_center] lg:object-center"
          />

          {/* 3D WebGL Neural & Tensor Field */}
          <Hero3DCanvas />

          {/* Orange atmosphere */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 motion-ambient-glow",
              "bg-[linear-gradient(100deg,rgba(255,77,15,0.92)_0%,rgba(185,45,18,0.66)_32%,rgba(74,19,14,0.34)_58%,rgba(8,8,8,0.74)_82%,rgba(2,2,2,0.94)_100%)]",
            )}
          />

          {/* Readability overlays */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_54%_40%,transparent_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.54)_100%)]"
          />

          {/* Floating 3D Telemetry HUD */}
          <HeroHUDMarkers />

          {/* Content */}
          <div className="relative z-10 flex min-h-[46rem] flex-col px-6 pb-8 pt-24 sm:px-10 lg:px-14 lg:pb-6 lg:pt-20 xl:h-full xl:min-h-0 xl:px-20 xl:pb-8 xl:pt-28">
            {/* Top information */}
            <div className="flex flex-wrap items-start justify-between gap-5">
              <Reveal variant="fade-down" delay={60} duration={450}>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {introduction}
                  </p>

                  <p className="mt-1 max-w-[19rem] break-words text-[0.68rem] font-medium uppercase leading-5 tracking-[0.11em] text-white/60 [overflow-wrap:anywhere] sm:max-w-none sm:text-xs sm:tracking-[0.16em]">
                    {role}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Editorial content */}
            <div className="my-auto grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.55fr)] lg:gap-12 lg:py-4 xl:gap-16 xl:py-6">
              <div className="max-w-[54rem]">
                <h1
                  id="hero-heading"
                  aria-label="Full-Stack AI Product Developer"
                  className={cn(
                    "text-[clamp(3.55rem,8vw,8.5rem)]",
                    "font-semibold leading-[0.82]",
                    "tracking-[-0.07em] text-white",
                  )}
                >
                  <TextReveal
                    as="span"
                    delay={120}
                    stagger={80}
                    duration={600}
                    lines={["Full-Stack", "AI Product"]}
                  />
                  <TextReveal
                    as="span"
                    delay={280}
                    duration={600}
                    className="text-[rgba(255,255,255,0.48)]"
                  >
                    Developer
                  </TextReveal>
                </h1>
              </div>

              <div className="max-w-md lg:justify-self-end">
                <Reveal variant="fade-up" delay={260} duration={550}>
                  <p className="max-w-[24rem] text-[1.4rem] font-semibold leading-[1.12] tracking-[-0.025em] text-white md:text-[1.75rem] xl:text-[2.15rem]">
                    I build intelligent products that solve real business
                    problems.
                  </p>
                </Reveal>

                <Reveal variant="fade-up" delay={320} duration={550}>
                  <p className="mt-6 max-w-[19.5rem] text-sm leading-6 text-white/60 sm:max-w-sm md:text-base md:leading-7">
                    {description}
                  </p>
                </Reveal>

                <Reveal variant="fade-up" delay={380} duration={500}>
                  <div className="mt-5 inline-flex max-w-full items-center gap-2 border border-white/15 bg-black/25 px-3.5 py-2 text-xs font-medium text-white/75 backdrop-blur-md">
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute size-full motion-radar-ping rounded-full bg-primary opacity-60" />
                      <span className="relative size-2 rounded-full bg-primary shadow-[0_0_12px_var(--brand-glow)]" />
                    </span>

                    <span>{availability.label}</span>
                  </div>
                </Reveal>

                <Reveal variant="fade-up" delay={440} duration={500}>
                  <div className="mt-6">
                    <Magnetic maxDisplacement={7}>
                      <Button
                        size="lg"
                        nativeButton={false}
                        render={<Link href={actions.secondary.href} />}
                      >
                        {actions.secondary.label}

                        <ArrowUpRight
                          data-icon="inline-end"
                          aria-hidden="true"
                          className="motion-arrow-icon"
                        />
                      </Button>
                    </Magnetic>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Capabilities */}
            <Stagger
              step={70}
              initialDelay={480}
              variant="fade-up"
              className="grid shrink-0 gap-x-7 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {capabilities.map((capability, index) => (
                <StaggerItem
                  key={capability.number}
                  index={index}
                  as="div"
                  className={cn(
                    index > 0 && "sm:border-l sm:border-white/10 sm:pl-6",
                    index === 2 && "sm:border-l-0 sm:pl-0",
                    index === 2 && "lg:border-l lg:border-white/10 lg:pl-6",
                  )}
                >
                  <Link
                    href={capability.href}
                    className="group flex items-start justify-between gap-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    <div>
                      <span className="text-xs font-semibold text-primary">
                        / {capability.number}
                      </span>

                      <h2 className="mt-2 text-sm font-medium text-white/75 transition-colors duration-300 group-hover:text-white">
                        {capability.title}
                      </h2>
                    </div>

                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "mt-1 size-4 shrink-0 text-white/35",
                        "transition-all duration-300 motion-arrow-icon",
                        "group-hover:text-primary",
                      )}
                    />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        {/* Technology strip */}
        <Reveal
          variant="fade-up"
          delay={560}
          duration={550}
          className="shrink-0 border-t border-white/10 bg-[#0d0d0d] px-6 py-5 sm:px-10 lg:px-14 lg:py-4 xl:px-20"
        >
          <div className="grid gap-4 lg:grid-cols-[14rem_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {expertise.eyebrow}
              </p>

              <p className="mt-1.5 text-xs leading-5 text-white/40">
                {expertise.description}
              </p>
            </div>

            <ul
              aria-label="Core technologies"
              className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 xl:flex xl:justify-end xl:gap-8"
            >
              {expertise.technologies.map((technology) => (
                <li
                  key={technology}
                  className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-white/65 transition-colors duration-200 hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full border border-primary/80"
                  />

                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
}

export default HeroSection;
