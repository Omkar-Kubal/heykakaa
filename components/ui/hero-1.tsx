import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Hero({ eyebrow, title, subtitle, ctaLabel, ctaHref = "/projects" }: HeroProps) {
  return (
    <section id="hero" className="hk-center-hero" aria-labelledby="hero-title">
      <div className="hk-center-hero-grid" aria-hidden="true" />
      <div className="hk-center-hero-horizon" aria-hidden="true" />
      <div className="hk-center-hero-content">
        {eyebrow && (
          <span className="hk-center-hero-eyebrow">
            {eyebrow}<ChevronRight aria-hidden="true" size={16} />
          </span>
        )}
        <h1 id="hero-title">{title}</h1>
        <p>{subtitle}</p>
        {ctaLabel && (
          <Link href={ctaHref} className="hk-primary-button hk-center-hero-button">
            {ctaLabel}<ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        )}
      </div>
    </section>
  );
}
