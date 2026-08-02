import { cn } from "@/lib/utils";

type PageContainerProps = React.ComponentProps<"div">;

export function PageContainer({
  className,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)]",
        "px-5 md:px-10 xl:px-20",
        className
      )}
      {...props}
    />
  );
}