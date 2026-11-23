import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/ui/hero-1";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { PlayStoreLink } from "./components/play-store-link";
import { HomeStickyCta } from "./components/home-sticky-cta";
import { CountUpNumber } from "./components/count-up-number";
import { TestimonialIllustration } from "./components/testimonial-illustration";
import { androidApps } from "@/lib/android-apps";

const featuredApps = [androidApps.syncspend, androidApps.synctasks];

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
  title: "HeyKakaa – Android Apps for Spending, Tasks & Focus",
  description: "Simple Android apps for spending, tasks, and focus. Meet Kaka and follow the Rooko build log.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <div className="hk-home-top">
        <SiteHeader active="home" />
        <Hero
          eyebrow="Indie Android developer"
          title="Simple Android apps for spending, tasks and focus."
          subtitle="Hey, I’m Kaka. I build free Android apps and share every day of the next one, Rooko, in public."
          ctaLabel="Get SyncSpend on Google Play"
          ctaHref={androidApps.syncspend.playUrl}
          ctaAppName="SyncSpend"
          secondaryCtaLabel="Follow the Rooko build"
          secondaryCtaHref="/build-log"
        />
      </div>

      <section className="hk-home-trust-strip" aria-label="HeyKakaa at a glance">
        <div className="hk-home-trust-item">
          <CountUpNumber value={3} suffix="" />
          <span>Android apps live</span>
        </div>
        <div className="hk-home-trust-item">
          <strong>Free</strong>
          <span>on Google Play</span>
        </div>
        <div className="hk-home-trust-item">
          <strong>App #11</strong>
          <span>built in public as Rooko</span>
        </div>
      </section>

      <hr className="hk-rule" />

      <section className="hk-section hk-home-apps-section" aria-labelledby="home-apps-title">
        <div className="hk-home-section-intro">
          <p className="hk-eyebrow">My apps</p>
          <h2 className="hk-section-heading" id="home-apps-title">Pick the one that fits your day.</h2>
        </div>
        <div className="hk-home-app-grid">
          {featuredApps.map((app) => (
            <article className="hk-home-app-card" key={app.name}>
              <Link className="hk-home-app-image" href={`/projects/${app.name.toLowerCase()}`} aria-label={`Learn about ${app.name}`}>
                <Image src={app.shareImage} alt={app.shareImageAlt} width={app.shareImageWidth} height={app.shareImageHeight} sizes="(max-width: 767px) 100vw, 50vw" />
              </Link>
              <div className="hk-home-app-heading">
                <Image src={app.icon} alt="" width={48} height={48} />
                <div>
                  <h3>{app.name}</h3>
                  <span>{app.shortDescription}</span>
                </div>
              </div>
              <p>{app.description}</p>
              <div className="hk-home-app-actions">
                <PlayStoreLink appName={app.name} placement="home_app_card" href={app.playUrl} className="hk-primary-button">
                  Get {app.name}<ArrowUpRight aria-hidden="true" size={15} />
                </PlayStoreLink>
                <Link href={`/projects/${app.name.toLowerCase()}`}>Learn more <ArrowUpRight aria-hidden="true" size={14} /></Link>
              </div>
            </article>
          ))}
          <article className="hk-home-app-card" id="sync-focus">
            <Link className="hk-home-app-image" href="/projects/syncfocus" aria-label="Learn about Sync Focus">
              <Image src={androidApps.syncfocus.shareImage} alt={androidApps.syncfocus.shareImageAlt} width={androidApps.syncfocus.shareImageWidth} height={androidApps.syncfocus.shareImageHeight} sizes="(max-width: 767px) 100vw, 50vw" />
            </Link>
            <div className="hk-home-app-heading">
              <Image src={androidApps.syncfocus.icon} alt="" width={48} height={48} />
              <div>
                <h3>Sync Focus</h3>
                <span>{androidApps.syncfocus.shortDescription}</span>
              </div>
            </div>
            <p>{androidApps.syncfocus.description}</p>
            <div className="hk-home-app-actions">
              <PlayStoreLink appName="Sync Focus" placement="home_app_card" href={androidApps.syncfocus.playUrl} className="hk-primary-button">Get Sync Focus <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
              <Link href="/projects/syncfocus">Learn more <ArrowUpRight aria-hidden="true" size={14} /></Link>
            </div>
          </article>
        </div>
      </section>

      <hr className="hk-rule" />

      <section className="hk-section hk-home-testimonials" aria-labelledby="home-testimonials-title">
        <div className="hk-home-section-intro">
          <p className="hk-eyebrow">From SyncSpend users</p>
          <h2 className="hk-section-heading" id="home-testimonials-title">A few kind words.</h2>
        </div>
        <div className="hk-home-testimonial-grid">
          <figure className="hk-home-testimonial">
            <TestimonialIllustration variant="rohith" />
            <blockquote>“Hey, your product is very nice!”</blockquote>
            <figcaption><strong>Rohith</strong><span>SyncSpend user</span></figcaption>
          </figure>
          <figure className="hk-home-testimonial">
            <TestimonialIllustration variant="arjun" />
            <blockquote>“I have been using the Sync Spend app and really find it useful.”</blockquote>
            <figcaption><strong>Arjun</strong><span>SyncSpend user</span></figcaption>
          </figure>
        </div>
      </section>

      <hr className="hk-rule" />

      <section className="hk-section hk-rooko-section" aria-labelledby="current-build-title">
        <div className="hk-rooko-copy">
          <p className="hk-eyebrow">Now building · App #11</p>
          <h2 className="hk-section-heading" id="current-build-title">Watch Rooko get built, day by day.</h2>
          <p>An Android app that makes time spent on Reels and Shorts easier to notice, without guilt.</p>
          <ol className="hk-rooko-phases" aria-label="Rooko build phases">
            <li className="is-done"><span aria-hidden="true">✓</span> Problem</li>
            <li className="is-done"><span aria-hidden="true">✓</span> PRD &amp; SRS</li>
            <li className="is-done"><span aria-hidden="true">✓</span> Design kit</li>
            <li className="is-current"><span className="hk-rooko-phase-dot" aria-hidden="true" /> Screens</li>
          </ol>
          <div className="hk-rooko-actions">
            <Link href="/build-log" className="hk-primary-button">Read the Build Log <ArrowUpRight aria-hidden="true" size={16} /></Link>
            <a href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Follow @hey.kakaa <ArrowUpRight aria-hidden="true" size={15} /></a>
          </div>
        </div>
        <Link className="hk-rooko-preview" href="/build-log" aria-label="Open the Rooko build log">
          <Image src="/assets/build-log-introduction-og.webp" alt="Rooko build log introduction cover" width={1200} height={675} sizes="(max-width: 767px) 100vw, 45vw" />
          <span>Rooko · App #11</span>
        </Link>
      </section>

      <hr className="hk-rule" />

      <section className="hk-section hk-story" id="story" aria-labelledby="story-title">
        <div className="hk-story-intro">
          <p className="hk-eyebrow">Journey</p>
          <h2 className="hk-section-heading" id="story-title">A little timeline of what I’ve been making.</h2>
        </div>
        <ol className="hk-timeline">
          {milestones.map((milestone) => (
            <li key={milestone.date}>
              <span className="hk-timeline-node" aria-hidden="true" />
              <time>{milestone.date}</time>
              <div>
                <h3>{milestone.title}</h3>
                <p>{milestone.story}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="hk-bottom-cta" aria-labelledby="more-title">
        <div>
          <p className="hk-eyebrow">Free on Google Play · New build log every day</p>
          <h2 id="more-title">Try the apps. Follow Rooko.</h2>
          <p>Pick an app for your day, or follow App #11 as it takes shape.</p>
        </div>
        <div className="hk-bottom-cta-actions">
          <PlayStoreLink appName="SyncSpend" placement="home_bottom_cta" href={androidApps.syncspend.playUrl} className="hk-primary-button">Get SyncSpend <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
          <PlayStoreLink appName="SyncTasks" placement="home_bottom_cta" href={androidApps.synctasks.playUrl} className="hk-outline-button">Get SyncTasks <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
        </div>
      </section>
      <HomeStickyCta />
      <SiteFooter />
    </main>
  );
}
