import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { PlayStoreLink } from "../../app/components/play-store-link";

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaAppName?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/projects",
  ctaAppName,
  secondaryCtaLabel,
  secondaryCtaHref,
}: HeroProps) {
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
        {(ctaLabel || secondaryCtaLabel) && (
          <div className="hk-center-hero-actions">
            {ctaLabel && (ctaAppName ? (
              <PlayStoreLink appName={ctaAppName} href={ctaHref} className="hk-primary-button hk-center-hero-button">
                {ctaLabel}<ArrowUpRight aria-hidden="true" size={18} />
              </PlayStoreLink>
            ) : (
              <Link href={ctaHref} className="hk-primary-button hk-center-hero-button">
                {ctaLabel}<ArrowUpRight aria-hidden="true" size={18} />
              </Link>
            ))}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link href={secondaryCtaHref} className="hk-outline-button hk-center-hero-secondary">
                {secondaryCtaLabel}<ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
