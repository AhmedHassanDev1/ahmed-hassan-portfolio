import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "rounded-full border border-transparent bg-clip-padding",
    "text-sm font-medium whitespace-nowrap select-none",
    "transition-all duration-300 outline-none",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_8px_30px_var(--brand-glow)]",
          "hover:-translate-y-0.5 hover:bg-primary/90",
          "hover:shadow-[0_12px_40px_var(--brand-glow)]",
        ],

        outline: [
          "border-border bg-white/[0.03] text-foreground",
          "backdrop-blur-xl",
          "hover:-translate-y-0.5",
          "hover:border-primary/40 hover:bg-white/[0.07]",
        ],

        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:-translate-y-0.5 hover:bg-secondary/80",
        ],

        ghost: [
          "text-foreground",
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted",
        ],

        destructive: [
          "bg-destructive text-white",
          "hover:bg-destructive/90",
          "focus-visible:border-destructive",
          "focus-visible:ring-destructive/25",
        ],

        link: [
          "h-auto rounded-none p-0 text-primary",
          "underline-offset-4 hover:underline",
        ],
      },

      size: {
        xs: "h-7 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",

        sm: "h-9 gap-2 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",

        default:
          "h-10 gap-2 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",

        lg: "h-12 gap-2.5 px-7 text-sm [&_svg:not([class*='size-'])]:size-4",

        xl: "h-14 gap-3 px-8 text-base [&_svg:not([class*='size-'])]:size-5",

        icon: "size-10 p-0",

        "icon-xs":
          "size-7 p-0 [&_svg:not([class*='size-'])]:size-3",

        "icon-sm":
          "size-9 p-0 [&_svg:not([class*='size-'])]:size-3.5",

        "icon-lg":
          "size-12 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };