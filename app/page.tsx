import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PatternWaves } from "./components/pattern-waves";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";

const milestones = [
  {
    date: "August 2026",
    title: "Make the numbers clearer",
    story: "I refined SyncSpend's monthly view and simplified its scope so the essentials were easier to see.",
  },
  {
    date: "September 2026",
    title: "Make room for the day",
    story: "SyncTasks reached its first release, bringing Today, Upcoming, and Lists together in one place.",
  },
  {
    date: "October 2026",
    title: "Keep refining",
    story: "SyncSpend grew with more ways to organize spending, clearer analytics, and account-aware backups.",
  },
  {
    date: "Late October 2026",
    title: "Make progress visible",
    story: "The latest SyncTasks updates made completed work easier to see and revisit.",
  },
] as const;

export const metadata: Metadata = {
  title: "@hey.kakaa | HeyKakaa",
  description: "Hey, I’m Kaka. I build for Android and share what I learn along the way.",
};

export default function Home() {
  return (
    <main>
      <section className="hk-hero" aria-labelledby="hero-title">
        <PatternWaves />
        <div className="hk-pattern-shade" aria-hidden="true" />
        <SiteHeader active="home" />
        <div className="hk-hero-inner">
          <div className="hk-hero-copy">
            <h1 id="hero-title">@hey.kakaa</h1>
            <p className="hk-hero-intro">Hey, I’m Kaka. I build for Android and share what I learn along the way.</p>
            <div className="hk-hero-actions">
              <Link href="/projects" className="hk-primary-button">Explore my projects <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </div>
            <p className="hk-hero-note">Creator notes from @hey.kakaa.</p>
          </div>
        </div>
      </section>

      <section className="hk-section hk-story" id="story" aria-labelledby="story-title">
        <div className="hk-story-intro">
          <p className="hk-eyebrow">Creator story / Android</p>
          <h2 className="hk-section-heading" id="story-title">A little timeline of what I’ve been making.</h2>
        </div>
        <ol className="hk-timeline">
          {milestones.map((milestone) => (
            <li key={milestone.date}>
              <time>{milestone.date}</time>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.story}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="hk-rule" />
      <section className="hk-bottom-cta" aria-labelledby="more-title">
        <div>
          <p className="hk-eyebrow">What I make</p>
          <h2 id="more-title">Built for Android.</h2>
          <p>Explore the projects, or follow what I’m making next.</p>
        </div>
        <Link href="/projects" className="hk-primary-button">Explore Projects <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
