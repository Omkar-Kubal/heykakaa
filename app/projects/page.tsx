import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AppGallery } from "./app-gallery";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Projects | HeyKakaa",
  description: "Explore SyncSpend and SyncTasks, two Android apps by HeyKakaa.",
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="projects" />
      <main className="hk-page" id="main-content">
        <section className="hk-page-intro" aria-labelledby="projects-title">
          <div>
            <p className="hk-eyebrow">The HeyKakaa collection / Android</p>
            <h1 id="projects-title">Built here.<br />Out in the world.</h1>
          </div>
          <p>Two Android apps for everyday spending and planning. Explore what’s available on Google Play.</p>
        </section>
        <AppGallery />
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
