import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

const sectionContainerVariants = cva("relative isolate w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-16 md:py-20",
      default: "py-20 md:py-28 xl:py-32",
      lg: "py-24 md:py-32 xl:py-40",
    },

    overflow: {
      visible: "overflow-visible",
      hidden: "overflow-hidden",
    },
  },

  defaultVariants: {
    spacing: "default",
    overflow: "visible",
  },
});

type SectionContainerProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionContainerVariants> & {
    containerClassName?: string;
    contained?: boolean;
  };

function SectionContainer({
  className,
  containerClassName,
  spacing,
  overflow,
  contained = true,
  children,
  ...props
}: SectionContainerProps) {
  return (
    <section
      data-slot="section-container"
      className={cn(
        sectionContainerVariants({
          spacing,
          overflow,
        }),
        className
      )}
      {...props}
    >
      {contained ? (
        <PageContainer className={containerClassName}>
          {children}
        </PageContainer>
      ) : (
        children
      )}
    </section>
  );
}

export {
  SectionContainer,
  sectionContainerVariants,
};

export type { SectionContainerProps };