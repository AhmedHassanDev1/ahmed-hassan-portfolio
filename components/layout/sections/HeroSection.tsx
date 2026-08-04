import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
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
      <div className="flex min-h-svh flex-col bg-background lg:h-svh lg:min-h-0">
        {/* Main visual */}
        <div className="relative isolate min-h-[46rem] flex-1 overflow-hidden lg:min-h-0">
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] lg:object-center"
          />

          {/* Orange atmosphere */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0",
              "bg-[linear-gradient(100deg,rgba(255,77,15,0.94)_0%,rgba(190,44,18,0.7)_34%,rgba(55,15,13,0.38)_68%,rgba(4,4,4,0.84)_100%)]",
            )}
          />

          {/* Readability overlays */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_54%_40%,transparent_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.48)_100%)]"
          />

          {/* Content */}
          <div className="relative z-10 flex min-h-[46rem] flex-col px-6 pb-8 pt-24 sm:px-10 lg:h-full lg:min-h-0 lg:px-14 lg:pb-8 lg:pt-28 xl:px-20">
            {/* Top information */}
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-white">
                  {introduction}
                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                  {role}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 border border-white/15 bg-black/15 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute size-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative size-2 rounded-full bg-primary" />
                </span>

                {availability.label}
              </div>
            </div>

            {/* Editorial content */}
            <div className="my-auto grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.55fr)] lg:gap-16 lg:py-6">
              <div className="max-w-[54rem]">
                <p className="mb-4 text-lg font-medium text-white/90">
                  Hey, I&apos;m a
                </p>

                <h1
                  id="hero-heading"
                  aria-label="Full-Stack AI Product Developer"
                  className={cn(
                    "text-[clamp(3.75rem,8vw,8.5rem)]",
                    "font-semibold leading-[0.82]",
                    "tracking-[-0.07em] text-white",
                  )}
                >
                  <span className="block">Full-Stack</span>
                  <span className="block">AI Product</span>
                  <span className="block text-white/55">Developer</span>
                </h1>
              </div>

              <div className="max-w-md lg:justify-self-end">
                <p className="text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-white md:text-3xl xl:text-4xl">
                  I build intelligent products that solve real business
                  problems.
                </p>

                <p className="mt-5 max-w-sm text-sm leading-6 text-white/60 md:text-base md:leading-7">
                  {description}
                </p>

                <Button
                  size="lg"
                  nativeButton={false}
                  className="mt-7"
                  render={<Link href={actions.secondary.href} />}
                >
                  {actions.secondary.label}

                  <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* Capabilities */}
            <div className="grid shrink-0 gap-x-7 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((capability, index) => (
                <Link
                  key={capability.number}
                  href={capability.href}
                  className={cn(
                    "group flex items-start justify-between gap-4",
                    index > 0 && "sm:border-l sm:border-white/10 sm:pl-6",
                    index === 2 && "sm:border-l-0 sm:pl-0",
                    index === 2 && "lg:border-l lg:border-white/10 lg:pl-6",
                  )}
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
                      "transition-all duration-300",
                      "group-hover:-translate-y-0.5",
                      "group-hover:translate-x-0.5",
                      "group-hover:text-primary",
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Technology strip */}
        <div className="shrink-0 border-t border-white/10 bg-[#0d0d0d] px-6 py-7 sm:px-10 lg:px-14 lg:py-6 xl:px-20">
          <div className="grid gap-6 lg:grid-cols-[14rem_1fr] lg:items-center">
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
              className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 xl:flex xl:justify-end xl:gap-10"
            >
              {expertise.technologies.map((technology) => (
                <li
                  key={technology}
                  className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-white/65 transition-colors hover:text-white"
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
        </div>
      </div>
    </SectionContainer>
  );
}

export default HeroSection;
