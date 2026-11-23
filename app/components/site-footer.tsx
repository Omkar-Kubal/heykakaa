import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="hk-footer">
      <span>HeyKakaa · Building for Android.</span>
      <nav aria-label="Footer navigation">
        <Link href="/projects">Projects</Link>
        <Link href="/build-log">Build Log</Link>
        <Link href="/roadmap">Roadmap</Link>
        <Link href="/contact">Contact</Link>
        <a href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </nav>
      <span className="hk-footer-disclosure">Site visits and Google Play clicks are measured with Firebase Analytics.</span>
    </footer>
  );
}
