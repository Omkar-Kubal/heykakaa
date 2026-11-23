"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BuildLogEntry } from "@/lib/build-log";

const filters = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "design", label: "Design" },
  { id: "dev", label: "Dev" },
] as const;

function belongsToFilter(entry: BuildLogEntry, filter: string) {
  if (filter === "all") return true;
  const text = `${entry.title} ${entry.summary} ${entry.tags.join(" ")}`.toLowerCase();
  if (filter === "research") return /research|problem|interview|validation/.test(text);
  if (filter === "design") return /design|screen|wireframe|visual|prototype/.test(text);
  return /build|development|code|flutter|implementation|setup/.test(text);
}

export function BuildLogEntries({ entries, nextDay }: { entries: BuildLogEntry[]; nextDay: number }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const filteredEntries = useMemo(() => entries.filter((entry) => belongsToFilter(entry, filter)), [entries, filter]);

  return (
    <section className="hk-build-entry-list" aria-label="Rooko build entries">
      <div className="hk-build-filters" role="group" aria-label="Filter build log entries">
        {filters.map((item) => (
          <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="hk-build-filter-status" role="status">{filteredEntries.length} {filteredEntries.length === 1 ? "entry" : "entries"}</p>
      <ol className="hk-build-timeline" aria-label="Build Log entries">
        {filteredEntries.map((entry) => (
          <li className="hk-build-day" key={`${filter}-${entry.slug}`}>
            <span className="hk-build-dot" aria-hidden="true" />
            <div className="hk-build-day-content">
              <p className="hk-build-day-number">{entry.kind === "introduction" ? "Introduction" : `Day ${String(entry.day).padStart(2, "0")}`}</p>
              <h2><Link href={`/build-log/${entry.slug}`}>{entry.title}</Link></h2>
              <p className="hk-build-summary">{entry.summary}</p>
              <div className="hk-build-links">
                <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer">Instagram Reel <ArrowUpRight aria-hidden="true" size={16} /></a>
                <Link className="hk-primary-button" href={`/build-log/${entry.slug}`}>Read {entry.kind === "introduction" ? "introduction" : `Day ${String(entry.day).padStart(2, "0")}`} <ArrowUpRight aria-hidden="true" size={16} /></Link>
              </div>
            </div>
          </li>
        ))}
        {filteredEntries.length === 0 && <li className="hk-build-empty">No entries in this phase yet. Follow along for the next update.</li>}
        {filter === "all" && (
          <li className="hk-build-day hk-build-day-upcoming" key="upcoming">
            <span className="hk-build-dot hk-build-dot--pulse" aria-hidden="true" />
            <div>
              <p className="hk-build-day-number">Day {String(nextDay).padStart(2, "0")}</p>
              <p className="hk-build-coming">Coming next</p>
              <p className="hk-build-summary">Follow on Instagram to catch it first.</p>
            </div>
          </li>
        )}
      </ol>
    </section>
  );
}
