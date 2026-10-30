"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const apps = [
  {
    title: "SyncSpend: Daily Expense Log",
    description: "Track expenses fast, review your spending, and optionally sync with Notion.",
    banner: "/assets/syncspend-banner.jpg",
    icon: "/assets/syncspend-icon.png",
    url: "https://play.google.com/store/apps/details?id=com.appylab.syncspend",
  },
  {
    title: "SyncTasks: Tasks & To-Do",
    description: "Plan your day, capture tasks fast, set reminders, and stay focused.",
    banner: "/assets/synctasks-banner.jpg",
    icon: "/assets/synctasks-icon.png",
    url: "https://play.google.com/store/apps/details?id=com.appylab.synctasks",
  },
] as const;

export function AppGallery() {
  const [query, setQuery] = useState("");
  const filtered = apps.filter((app) => `${app.title} ${app.description}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="hk-gallery" aria-label="Android apps">
      <hr className="hk-rule" />
      <div className="hk-gallery-toolbar">
        <div>
          <h2>Our apps</h2>
          <p role="status">{filtered.length} of {apps.length} apps</p>
        </div>
        <label className="hk-gallery-search" htmlFor="project-search">
          Find an app
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or what it does..."
            aria-controls="project-results"
          />
        </label>
      </div>
      <div id="project-results" className="hk-gallery-grid">
        {filtered.length === 0 && <p className="hk-empty">No apps match “{query}”.</p>}
        {filtered.map((app) => (
          <article className="hk-card" key={app.title}>
            <a className="hk-card-banner" href={app.url} target="_blank" rel="noopener noreferrer" aria-label={`Get ${app.title} on Google Play`}>
              <Image src={app.banner} alt={`${app.title} banner`} width={1024} height={500} />
            </a>
            <div className="hk-card-title-row">
              <Image className="hk-card-icon" src={app.icon} alt="" width={56} height={56} />
              <div>
                <h3>{app.title}</h3>
                <span className="hk-pill">Free</span>
              </div>
            </div>
            <p className="hk-card-description">{app.description}</p>
            <div className="hk-card-bottom">
              <span>Available on Google Play</span>
              <a className="hk-small-button" href={app.url} target="_blank" rel="noopener noreferrer">
                View app <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
