import React from "react";
import { cn } from "~/lib/utils";

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
}

export function Section({
  title,
  subtitle,
  children,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
}: SectionProps) {
  return (
    <section className={cn("py-12", className)}>
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className={cn("text-3xl font-bold tracking-tight", titleClassName)}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className={cn("mt-2 text-lg text-muted-foreground", subtitleClassName)}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={cn("", contentClassName)}>
        {children}
      </div>
    </section>
  );
}