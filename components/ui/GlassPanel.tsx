import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const glassPanelVariants = cva(
  [
    "relative isolate overflow-hidden",
    "border-white/10 backdrop-blur-xl",
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_24px_80px_rgb(0_0_0/0.25)]",

    "before:pointer-events-none before:absolute before:inset-x-8",
    "before:top-0 before:h-px",
    "before:bg-gradient-to-r before:from-transparent",
    "before:via-white/25 before:to-transparent",
  ],
  {
    variants: {
      variant: {
        default: "bg-white/[0.045]",
        subtle: "bg-white/[0.025]",
        strong: "bg-surface-high/70",
      },

      radius: {
        card: "rounded-[var(--card-radius)]",
        panel: "rounded-[var(--panel-radius)]",
        canvas: "rounded-[var(--canvas-radius)]",
      },

      interactive: {
        true: [
          "transition-[transform,border-color,background-color,box-shadow]",
          "duration-300 ease-[var(--ease-standard)]",
          "hover:-translate-y-1 hover:border-primary/30",
          "hover:bg-white/[0.065]",
          "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_28px_90px_var(--brand-glow)]",
        ],
        false: "",
      },
    },

    defaultVariants: {
      variant: "default",
      radius: "panel",
      interactive: false,
    },
  }
);

type GlassPanelProps = React.ComponentProps<typeof Card> &
  VariantProps<typeof glassPanelVariants>;

function GlassPanel({
  className,
  variant,
  radius,
  interactive,
  ...props
}: GlassPanelProps) {
  return (
    <Card
      data-slot="glass-panel"
      className={cn(
        glassPanelVariants({
          variant,
          radius,
          interactive,
        }),
        className
      )}
      {...props}
    />
  );
}

export { GlassPanel, glassPanelVariants };
export type { GlassPanelProps };