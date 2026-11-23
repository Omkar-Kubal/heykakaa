import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { PlayStoreLink } from "../components/play-store-link";
import { androidApps } from "@/lib/android-apps";

const instagramUrl = "https://www.instagram.com/hey.kakaa/";

export const metadata: Metadata = {
  title: "Contact | HeyKakaa",
  description: "Send feedback about a HeyKakaa app, ask a question, or start a collaboration conversation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="contact" />
      <main className="hk-page hk-contact-page" id="main-content">
        <div className="hk-contact-intro">
          <p className="hk-eyebrow">Contact</p>
          <h1>Let’s talk.</h1>
          <p>Feedback on an app, a question, or an idea to build together.</p>
        </div>
        <div className="hk-contact-grid">
          <section aria-labelledby="contact-heading">
            <p className="hk-eyebrow">Instagram</p>
            <h2 id="contact-heading">Daily build updates and DMs.</h2>
            <p>Send a message about SyncSpend, SyncTasks, or the Rooko build.</p>
            <a className="hk-primary-button" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              @hey.kakaa <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </section>
          <section aria-labelledby="brief-heading">
            <p className="hk-eyebrow">App feedback</p>
            <h2 id="brief-heading">Rate or report on Google Play.</h2>
            <p>Reviews help other people find the apps.</p>
            <div className="hk-contact-app-links">
              <PlayStoreLink appName="SyncSpend" href={androidApps.syncspend.playUrl}>Open SyncSpend <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
              <PlayStoreLink appName="SyncTasks" href={androidApps.synctasks.playUrl}>Open SyncTasks <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
              <PlayStoreLink appName="Sync Focus" href={androidApps.syncfocus.playUrl}>Open Sync Focus <ArrowUpRight aria-hidden="true" size={15} /></PlayStoreLink>
            </div>
          </section>
          <section className="hk-contact-guidance" aria-labelledby="brief-heading-guidance">
            <h2 id="brief-heading-guidance">A useful starting point</h2>
            <dl>
              <div><dt>App feedback</dt><dd>Which app are you using, and what would you like improved?</dd></div>
              <div><dt>A collaboration</dt><dd>What are you working on, and where could we work together?</dd></div>
              <div><dt>Anything else</dt><dd>Share a few details so I can understand what you have in mind.</dd></div>
            </dl>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
