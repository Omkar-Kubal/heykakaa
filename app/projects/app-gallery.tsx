"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { androidApps } from "@/lib/android-apps";
import { PlayStoreLink } from "../components/play-store-link";

const apps = [androidApps.syncspend, androidApps.synctasks];

export function AppGallery() {
  const [query, setQuery] = useState("");
  const filtered = apps.filter((app) => `${app.name} ${app.shortDescription} ${app.description}`.toLowerCase().includes(query.trim().toLowerCase()));

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
          <article className="hk-card" key={app.name}>
              <PlayStoreLink appName={app.name} className="hk-card-banner" href={app.playUrl} ariaLabel={`Get ${app.name} on Google Play`}>
                <Image src={app.shareImage} alt={app.shareImageAlt} width={app.shareImageWidth} height={app.shareImageHeight} />
              </PlayStoreLink>
            <div className="hk-card-title-row">
              <Image className="hk-card-icon" src={app.icon} alt="" width={56} height={56} />
              <div>
                <h3><a href={`/projects/${app.name.toLowerCase()}`}>{app.name}: {app.shortDescription}</a></h3>
                <span className="hk-pill">Android app</span>
              </div>
            </div>
            <p className="hk-card-description">{app.description}</p>
            <div className="hk-card-bottom">
              <span>Available on Google Play</span>
              <PlayStoreLink appName={app.name} className="hk-small-button" href={app.playUrl}>
                View app <ArrowUpRight aria-hidden="true" size={13} />
              </PlayStoreLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
