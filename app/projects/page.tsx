import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PlayStoreLink } from "../components/play-store-link";
import { androidApps } from "@/lib/android-apps";

const availableApps = [androidApps.syncspend, androidApps.synctasks];

export const metadata: Metadata = {
  title: "Android Apps by HeyKakaa – SyncSpend, SyncTasks & Focus",
  description: "Free Android apps for everyday spending, planning, and focus, built by one independent developer.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="projects" />
      <main className="hk-page" id="main-content">
        <section className="hk-page-intro" aria-labelledby="projects-title">
          <div>
            <p className="hk-eyebrow">Projects</p>
            <h1 id="projects-title">Three apps. One developer. No clutter.</h1>
          </div>
          <p>Free Android apps for everyday spending, planning, and focus.</p>
        </section>

        <section className="hk-project-rows" aria-label="Android apps">
          {availableApps.map((app, index) => (
            <article className={`hk-project-row${index % 2 ? " hk-project-row--reverse" : ""}`} key={app.name}>
              <div className="hk-project-copy">
                <p className="hk-eyebrow">Android app · {app.shortDescription}</p>
                <h2>{app.name}</h2>
                <p>{app.description}</p>
                <ul className="hk-project-tags" aria-label={`${app.name} features`}>
                  {(app.name === "SyncSpend" ? ["Monthly view", "Analytics", "Backups"] : ["Today", "Upcoming", "Lists"]).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="hk-project-actions">
                  <PlayStoreLink appName={app.name} className="hk-primary-button" href={app.playUrl}>Get on Google Play <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
                  <Link className="hk-outline-button" href={`/projects/${app.name.toLowerCase()}`}>Learn more <ArrowUpRight aria-hidden="true" size={15} /></Link>
                </div>
              </div>
              <Link className="hk-project-visual" href={`/projects/${app.name.toLowerCase()}`} aria-label={`View ${app.name} details`}>
                <Image src={app.shareImage} alt={app.shareImageAlt} width={app.shareImageWidth} height={app.shareImageHeight} sizes="(max-width: 767px) 100vw, 52vw" />
              </Link>
            </article>
          ))}

          <article className="hk-project-row hk-project-row--focus" id="sync-focus">
            <div className="hk-project-copy">
              <p className="hk-eyebrow">Android app · {androidApps.syncfocus.shortDescription}</p>
              <h2>Sync Focus</h2>
              <p>{androidApps.syncfocus.description}</p>
              <ul className="hk-project-tags" aria-label="Sync Focus features"><li>Timer ring</li><li>Task planning</li><li>Progress</li></ul>
              <div className="hk-project-actions">
                <PlayStoreLink appName="Sync Focus" className="hk-primary-button" href={androidApps.syncfocus.playUrl}>Get on Google Play <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
                <Link className="hk-outline-button" href="/projects/syncfocus">Learn more <ArrowUpRight aria-hidden="true" size={15} /></Link>
              </div>
            </div>
            <Link className="hk-project-visual" href="/projects/syncfocus" aria-label="View Sync Focus details">
              <Image src={androidApps.syncfocus.banner} alt={androidApps.syncfocus.shareImageAlt} width={androidApps.syncfocus.shareImageWidth} height={androidApps.syncfocus.shareImageHeight} sizes="(max-width: 767px) 100vw, 52vw" />
            </Link>
          </article>

          <aside className="hk-next-project">
            <div>
              <p className="hk-eyebrow">Coming next · App #11</p>
              <h2>Rooko</h2>
              <p>Built in public. Follow every day of the build.</p>
            </div>
            <Link href="/build-log" className="hk-outline-button">Read the Build Log <ArrowUpRight aria-hidden="true" size={15} /></Link>
          </aside>
        </section>

        <section className="hk-project-fit" aria-labelledby="project-fit-title">
          <p className="hk-eyebrow">Which app?</p>
          <h2 id="project-fit-title">Find your fit.</h2>
          <div className="hk-project-fit-grid">
            <Link href="/projects/syncspend"><span>I want to track money</span><strong>SyncSpend</strong><ArrowUpRight aria-hidden="true" size={16} /></Link>
            <Link href="/projects/synctasks"><span>I want to plan my day</span><strong>SyncTasks</strong><ArrowUpRight aria-hidden="true" size={16} /></Link>
            <Link href="#sync-focus"><span>I want to focus</span><strong>Sync Focus</strong><ArrowUpRight aria-hidden="true" size={16} /></Link>
          </div>
        </section>

        <section className="hk-bottom-cta hk-project-cta" aria-labelledby="project-enquiry">
          <div>
            <p className="hk-eyebrow">Made by HeyKakaa</p>
            <h2 id="project-enquiry">Have a thought to share?</h2>
            <p>Feedback, questions, and ideas are welcome.</p>
          </div>
          <Link className="hk-primary-button" href="/contact">Get in touch <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
