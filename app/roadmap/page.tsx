import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Roadmap | HeyKakaa",
  description: "The App #11 roadmap is coming soon. Follow the day-by-day Build Log in the meantime.",
  alternates: { canonical: "/roadmap" },
  robots: { index: false, follow: false },
};

export default function RoadmapPage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="roadmap" />
      <main className="hk-page hk-roadmap-page" id="main-content">
        <p className="hk-eyebrow">App #11 / Roadmap</p>
        <h1>Coming soon.</h1>
        <p>The roadmap is taking shape. Follow the day-by-day build while it’s being prepared.</p>
        <Link href="/build-log" className="hk-primary-button">Read the Build Log <ArrowUpRight aria-hidden="true" size={16} /></Link>
      </main>
      <SiteFooter />
    </div>
  );
}
