import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listTimelineEntries } from "@/lib/build-log";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Build Log | HeyKakaa",
  description: "Follow App #11 as I build a new Android app, one day at a time.",
  alternates: { canonical: "/build-log" },
};

export default function BuildLogPage() {
  const entries = listTimelineEntries();
  const nextDay = entries.length ? Math.max(...entries.map((entry) => entry.day)) + 1 : 1;

  return (
    <div className="hk-log-surface">
      <SiteHeader active="build-log" />
      <main className="hk-log-page" id="main-content">
        <div className="hk-log-intro">
          <p className="hk-log-eyebrow">Building in public / Android</p>
          <h1>Build Log</h1>
          <p>I’m building App #11 in public — an Android app to make time spent on Reels and Shorts easier to notice.</p>
        </div>

        <ol className="hk-build-timeline" aria-label="Build Log days">
          {entries.map((entry) => (
            <li className="hk-build-day" key={entry.day}>
              <span className="hk-build-dot" aria-hidden="true" />
              <div>
                <p className="hk-build-day-number">Day {String(entry.day).padStart(2, "0")}</p>
                <h2><Link href={`/build-log/${entry.slug}`}>{entry.title}</Link></h2>
                <p className="hk-build-summary">{entry.summary}</p>
                <div className="hk-build-links">
                  <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer">Instagram Reel <ArrowUpRight aria-hidden="true" size={17} /></a>
                  <Link className="hk-primary-button" href={`/build-log/${entry.slug}`}>Read Day {String(entry.day).padStart(2, "0")} <ArrowUpRight aria-hidden="true" size={17} /></Link>
                </div>
              </div>
            </li>
          ))}
          <li className="hk-build-day hk-build-day-upcoming">
            <span className="hk-build-dot" aria-hidden="true" />
            <div>
              <p className="hk-build-day-number">Day {String(nextDay).padStart(2, "0")}</p>
              <p className="hk-build-coming">Coming next</p>
            </div>
          </li>
        </ol>
      </main>
      <SiteFooter />
    </div>
  );
}
