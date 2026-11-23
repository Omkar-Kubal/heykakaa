import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getNextDayNumber, listTimelineEntries } from "@/lib/build-log";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Roadmap | HeyKakaa",
  description: "Follow Rooko from problem research and design through its Google Play launch.",
  alternates: { canonical: "/roadmap" },
};

const roadmapSteps = [
  { label: "Problem", state: "done" },
  { label: "PRD & SRS", state: "done" },
  { label: "Design kit", state: "done" },
  { label: "Screens", state: "current" },
  { label: "Build", state: "next" },
  { label: "Test", state: "next" },
  { label: "Launch", state: "next" },
  { label: "Grow", state: "next" },
] as const;

const roadmapCards = [
  { group: "done", day: 1, title: "Define the problem", description: "Awareness without guilt, research questions." },
  { group: "done", day: 3, title: "PRD and SRS", description: "Requirements drafted and open questions listed." },
  { group: "done", day: 4, title: "Global design kit", description: "Monochrome, Google Sans, and Hugeicons for Flutter and Kotlin." },
  { group: "current", day: 5, title: "Design the screens", description: "Apply the kit to real screens and adjust." },
  { group: "next", title: "Build the app", description: "Flutter UI and the Kotlin Android layer." },
  { group: "next", title: "Test with real users", description: "Check the experience and refine it from feedback." },
  { group: "next", title: "Launch on Google Play", description: "Prepare the store listing and first release." },
  { group: "next", title: "Grow", description: "Share progress through the build log and Instagram." },
] as const;

export default function RoadmapPage() {
  const entries = listTimelineEntries();
  const nextDay = getNextDayNumber(entries);

  return (
    <div className="relative min-h-svh">
      <SiteHeader active="roadmap" />
      <main className="hk-page hk-roadmap-page" id="main-content">
        <section className="hk-roadmap-intro" aria-labelledby="roadmap-title">
          <p className="hk-eyebrow">App #11 / Roadmap</p>
          <h1 id="roadmap-title">From idea to Google Play.</h1>
          <p>Every step of building Rooko, with links to the day that covers it.</p>
        </section>

        <section className="hk-roadmap-progress" aria-label="Rooko build progress">
          <ol>
            {roadmapSteps.map((step, index) => (
              <li className={`hk-roadmap-step hk-roadmap-step--${step.state}`} key={step.label} aria-current={step.state === "current" ? "step" : undefined}>
                <span className="hk-roadmap-bar"><span className="hk-roadmap-fill" style={{ "--hk-step-delay": `${index * 100}ms` } as React.CSSProperties} /></span>
                <span className="hk-roadmap-step-label">{step.label}</span>
              </li>
            ))}
          </ol>
          <p className="hk-roadmap-current-label"><span className="hk-roadmap-now-dot" aria-hidden="true" /> Stage 4 of 8 · Screens</p>
        </section>

        <section className="hk-roadmap-columns" aria-label="Roadmap stages">
          {([
            { id: "done", title: "Done" },
            { id: "current", title: "In progress" },
            { id: "next", title: "Next" },
          ] as const).map((column) => (
            <div className={`hk-roadmap-column hk-roadmap-column--${column.id}`} key={column.id}>
              <h2>{column.title}</h2>
              {roadmapCards.filter((card) => card.group === column.id).map((card) => {
                const day = "day" in card ? (card.day === 5 ? nextDay : card.day) : undefined;
                const entry = day === undefined ? undefined : entries.find((item) => item.day === day);
                const cardContent = <>
                  {day !== undefined && <span className="hk-roadmap-day">Day {String(day).padStart(2, "0")}</span>}
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {entry && <span className="hk-roadmap-card-link">Read Day {String(day).padStart(2, "0")} <ArrowUpRight aria-hidden="true" size={14} /></span>}
                </>;

                return entry ? (
                  <Link className="hk-roadmap-card" href={`/build-log/${entry.slug}`} key={`${card.group}-${card.title}`}>{cardContent}</Link>
                ) : (
                  <article className="hk-roadmap-card" key={`${card.group}-${card.title}`}>{cardContent}</article>
                );
              })}
            </div>
          ))}
        </section>
        <Link href="/build-log" className="hk-outline-button hk-roadmap-log-link">Read the Rooko Build Log <ArrowUpRight aria-hidden="true" size={15} /></Link>
      </main>
      <SiteFooter />
    </div>
  );
}
