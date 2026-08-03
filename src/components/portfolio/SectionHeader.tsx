import { forwardRef } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  titleId?: string;
  children?: React.ReactNode;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ eyebrow, title, subtitle, titleId, children }, ref) => (
    <div ref={ref} className="mb-16 text-center">
      <span
        data-anim
        className="inline-block rounded-full glass border border-brand/20 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark"
      >
        {eyebrow}
      </span>
      <div data-anim className="mx-auto mt-3 h-1 w-12 rounded-full bg-gradient-warm" />
      <h2
        id={titleId}
        data-anim
        className="mt-4 font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      <p data-anim className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        {subtitle}
      </p>
      {children}
    </div>
  ),
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
