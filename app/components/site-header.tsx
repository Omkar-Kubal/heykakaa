import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

type Page = "home" | "projects" | "contact";

const pages = [
  { href: "/", label: "Home", page: "home" },
  { href: "/projects", label: "Projects", page: "projects" },
  { href: "/contact", label: "Contact Us", page: "contact" },
] as const;

export function SiteHeader({ active }: { active: Page }) {
  return (
    <header className="hk-header">
      <div className="hk-header-inner">
        <Link href="/" aria-label="HeyKakaa home" className="hk-brand">
          <Image src="/assets/heykaka-avatar.png" alt="" width={40} height={40} priority />
        </Link>
        <nav className="hk-nav" aria-label="Main navigation">
          {pages.map(({ href, label, page }) => (
            <Link key={href} href={href} aria-current={active === page ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/projects" className="hk-outline-button hk-header-right">
          Explore Projects <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
        <details className="hk-mobile-menu">
          <summary aria-label="Open navigation menu"><Menu aria-hidden="true" size={19} /></summary>
          <nav aria-label="Mobile navigation">
            {pages.map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
