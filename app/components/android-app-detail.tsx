import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { AndroidApp } from "@/lib/android-apps";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { PlayStoreLink } from "./play-store-link";
import { JsonLd } from "./json-ld";
import { createSoftwareApplicationSchema } from "@/lib/app-schema";

export function AndroidAppDetail({ app }: { app: AndroidApp }) {
  return (
    <div className="relative min-h-svh">
      <JsonLd data={createSoftwareApplicationSchema(app)} />
      <SiteHeader active="projects" />
      <main className="hk-page hk-app-page" id="main-content">
        <Link className="hk-app-back" href="/projects"><ArrowLeft aria-hidden="true" size={16} /> All projects</Link>
        <section className="hk-app-hero" aria-labelledby="app-title">
          <div className="hk-app-copy">
            <p className="hk-eyebrow">Android app / HeyKakaa</p>
            <h1 id="app-title">{app.heading}</h1>
            <p>{app.description}</p>
            <PlayStoreLink appName={app.name} placement="app_detail" className="hk-primary-button" href={app.playUrl}>
              Get {app.name} on Google Play <ArrowUpRight aria-hidden="true" size={16} />
            </PlayStoreLink>
          </div>
          <Image
            className="hk-app-banner"
            src={app.shareImage}
            alt={app.shareImageAlt}
            width={app.shareImageWidth}
            height={app.shareImageHeight}
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </section>

        <section className="hk-app-audience" aria-labelledby="app-audience-title">
          <p className="hk-eyebrow">Made for everyday use</p>
          <h2 id="app-audience-title">Who {app.name} is for</h2>
          <p>{app.audience}</p>
        </section>

        <section className="hk-app-features" aria-labelledby="app-features-title">
          <div className="hk-app-section-heading">
            <p className="hk-eyebrow">What you can do</p>
            <h2 id="app-features-title">{app.name} features</h2>
          </div>
          <ul>
            {app.features.map((feature) => (
              <li key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="hk-app-end">
          <div>
            <p className="hk-eyebrow">Explore HeyKakaa</p>
            <h2>Follow what I’m building next.</h2>
            <p>Read the App #11 Build Log, or get in touch with a question or idea.</p>
          </div>
          <div className="hk-app-end-links">
            <Link className="hk-outline-button" href="/build-log">Read the Build Log <ArrowUpRight aria-hidden="true" size={15} /></Link>
            <Link className="hk-outline-button" href="/contact">Contact Kaka <ArrowUpRight aria-hidden="true" size={15} /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
