import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNextDayNumber, listTimelineEntries } from "@/lib/build-log";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { BuildLogEntries } from "./build-log-entries";

export const metadata: Metadata = {
  title: "Rooko Build Log | HeyKakaa",
  description: "Follow App #11 as I build Rooko, an Android app that makes time on Reels and Shorts easier to notice.",
  alternates: { canonical: "/build-log" },
  openGraph: {
    type: "website",
    title: "Rooko Android Build Log | HeyKakaa",
    description: "Follow the daily story of researching and building Rooko, from idea through design and development.",
    url: "/build-log",
    images: [{ url: "/assets/build-log-introduction-og.webp", width: 1200, height: 675, alt: "Kaka documenting an Android app build" }],
  },
  twitter: { card: "summary_large_image", images: ["/assets/build-log-introduction-og.webp"] },
};

export default function BuildLogPage() {
  const entries = listTimelineEntries();
  const nextDay = getNextDayNumber(entries);

  return (
    <div className="hk-log-surface">
      <SiteHeader active="build-log" />
      <main className="hk-log-page" id="main-content">
        <div className="hk-log-intro">
          <p className="hk-log-eyebrow">Building in public / Android</p>
          <h1>Rooko Build Log</h1>
          <p>App #11: an Android app that makes time on Reels and Shorts easier to notice. One day at a time.</p>
          <div className="hk-build-intro-actions">
            <a className="hk-primary-button" href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Follow on Instagram <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
          <p className="hk-log-featured-guide">
            <strong>Want a repeatable planning process?</strong>{" "}
            <Link href="/guides/app-prd-srs">Read my PRD and SRS guide <ArrowUpRight aria-hidden="true" size={16} /></Link>
          </p>
        </div>

        <div className="hk-build-layout">
          <BuildLogEntries entries={entries} nextDay={nextDay} />
          <aside className="hk-build-rooko-card" aria-labelledby="build-rooko-title">
            <p className="hk-eyebrow">About Rooko</p>
            <h2 id="build-rooko-title">Awareness without guilt.</h2>
            <p>Follow the work as App #11 moves from the problem to its first release.</p>
            <ol className="hk-rooko-phases" aria-label="Rooko build phases">
              <li className="is-done"><span aria-hidden="true">✓</span> Problem</li>
              <li className="is-done"><span aria-hidden="true">✓</span> PRD &amp; SRS</li>
              <li className="is-done"><span aria-hidden="true">✓</span> Design kit</li>
              <li className="is-current"><span className="hk-rooko-phase-dot" aria-hidden="true" /> Screens</li>
            </ol>
            <Link href="/roadmap" className="hk-outline-button">See the full roadmap <ArrowUpRight aria-hidden="true" size={15} /></Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
