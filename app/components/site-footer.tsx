import Link from "next/link";
import { CookieSettingsButton } from "./cookie-settings-button";

export function SiteFooter() {
  return (
    <footer className="hk-footer">
      <span>HeyKakaa · Building for Android.</span>
      <nav aria-label="Footer navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/build-log">Build Log</Link>
        <Link href="/roadmap">Roadmap</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <a href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
      <span className="hk-footer-disclosure">Optional analytics cookies are used only if you accept.</span>
      <CookieSettingsButton />
    </footer>
  );
}
