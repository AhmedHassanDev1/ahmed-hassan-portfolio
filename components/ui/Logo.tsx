
// components/brand/Logo/logo.content.ts

export const logoContent = {
    initials: "AH",
    name: "Ahmed Hassan",
    role: "Full-Stack AI Product Developer",
} as const;

export const logoStyles = {
    root: `
    inline-flex
    items-center
    gap-4
    text-left
  `,

    mark: `
    grid
    size-16
    shrink-0
    place-items-center
    rounded-full
    border
    border-orange-500
    text-xl
    font-semibold
    text-orange-500
    transition-all
    duration-300
    hover:bg-orange-500/10
    hover:shadow-[0_0_30px_rgba(249,115,22,0.22)]
  `,

    content: `
    flex
    flex-col
    gap-1
  `,

    name: `
    text-lg
    font-semibold
    leading-none
    text-white
  `,

    role: `
    text-sm
    leading-relaxed
    text-neutral-500
  `,
} as const;



type LogoProps = {
    showDetails?: boolean;
    className?: string;
};

export function Logo({
    showDetails = true,
    className = "",
}: LogoProps) {
    return (
        <>
            <a
                href="#home"
                aria-label="Go to homepage"
                className={`${logoStyles.root} ${className}`}
            >


                {showDetails && (
                    <span className={logoStyles.content}>


                    </span>
                )}
            </a>
        </>
    );
}