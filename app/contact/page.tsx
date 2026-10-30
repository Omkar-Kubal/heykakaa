import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

const instagramUrl = "https://www.instagram.com/hey.kakaa/";

export const metadata: Metadata = {
  title: "Contact | HeyKakaa",
  description: "Get in touch with HeyKakaa about SyncSpend, SyncTasks, or a collaboration.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="contact" />
      <main className="hk-page hk-contact-page" id="main-content">
        <div className="hk-contact-intro">
          <p className="hk-eyebrow">Contact</p>
          <h1>Let’s start a<br />conversation.</h1>
          <p>Questions about either app, feedback, or an idea to collaborate? Tell me what’s on your mind.</p>
        </div>
        <div className="hk-contact-grid">
          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Start a conversation</h2>
            <p>Reach me on Instagram. A short message with the context is a good place to start.</p>
            <a className="hk-primary-button" href={instagramUrl} target="_blank" rel="noopener noreferrer">
              Message @hey.kakaa <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <p>Opens my Instagram profile.</p>
          </section>
          <section aria-labelledby="brief-heading">
            <h2 id="brief-heading">A useful starting point</h2>
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
