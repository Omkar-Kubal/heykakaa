import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { JsonLd } from "../../components/json-ld";

const title = "How to Write a PRD and SRS for an Android App";
const description =
  "Learn how a product requirements document and software requirements specification work together, with reusable outlines and an Android app example.";
const canonicalPath = "/guides/app-prd-srs";
const image = "/assets/guide-app-prd-srs-og.webp";
const publishedAt = "2026-11-22T00:00:00+05:30";

export const metadata: Metadata = {
  title: title + " | HeyKakaa",
  description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    type: "article",
    title,
    description,
    url: canonicalPath,
    publishedTime: publishedAt,
    authors: ["https://www.heykakaa.com/"],
    images: [{ url: image, width: 1200, height: 675, alt: "Kaka explaining product requirements for an Android app" }],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  image: ["https://www.heykakaa.com" + image],
  datePublished: publishedAt,
  author: {
    "@type": "Person",
    name: "Kaka",
    url: "https://www.heykakaa.com/",
  },
  mainEntityOfPage: "https://www.heykakaa.com" + canonicalPath,
};

export default function AppPrdSrsGuidePage() {
  return (
    <div className="relative min-h-svh">
      <SiteHeader active="build-log" />
      <main className="hk-article-page hk-guide-page" id="main-content">
        <Link className="hk-article-back" href="/build-log"><ArrowLeft aria-hidden="true" size={17} /> App #11 Build Log</Link>
        <article>
          <header className="hk-article-header hk-guide-header">
            <div className="hk-article-header-content">
              <p className="hk-eyebrow">Android app planning / Practical guide</p>
              <h1>{title}</h1>
              <p className="hk-article-summary">A clear PRD explains the product you intend to make. An SRS describes the system behavior you can build and verify. Here’s a practical way to draft both for an Android app.</p>
              <p className="hk-guide-byline">By Kaka · <time dateTime="2026-11-22">November 22, 2026</time></p>
            </div>
          </header>

          <div className="hk-article-body hk-guide-body">
            <p>These documents are useful as working drafts. They help expose assumptions and open questions before implementation, but writing a requirement does not prove the product idea or a technical approach is valid.</p>

            <h2>PRD and SRS: what each document does</h2>
            <p>A <strong>Product Requirements Document (PRD)</strong> connects a user need to product scope. It describes who the product is for, what problem it addresses, what the first version should do, and how you will judge whether it helps.</p>
            <p>A <strong>Software Requirements Specification (SRS)</strong> makes the system expectations more precise. It describes functional behavior, data, platform constraints, interfaces, and how requirements can be tested.</p>
            <p>Start with the PRD, then derive the SRS from it. Keep a link between each system requirement and the user need or product feature it supports.</p>

            <h2>Draft the PRD around the problem</h2>
            <p>Write what you know, and label what you still need to check. A short PRD outline can include:</p>
            <ol>
              <li><strong>Overview:</strong> the product idea and its intended purpose.</li>
              <li><strong>Problem and evidence:</strong> the user situation, observations or sources that support it, and beliefs that are still assumptions.</li>
              <li><strong>Users and goals:</strong> who the first version serves and what outcome they want.</li>
              <li><strong>Scope:</strong> goals, non-goals, the first useful release, and later ideas.</li>
              <li><strong>Journey and features:</strong> the key steps and features, each tied to a user need.</li>
              <li><strong>Acceptance criteria:</strong> observable conditions that show a feature behaves as intended.</li>
              <li><strong>Success measures and open questions:</strong> what you will observe after release and what needs research.</li>
            </ol>
            <p>For an Android screen-time app concept, a PRD might describe a person who wants to understand short-form viewing without being shamed for it. Treat that as a target user hypothesis until you have evidence from research.</p>

            <h2>Turn product needs into an SRS</h2>
            <p>The SRS turns scoped features into behavior a developer and tester can discuss. Include the platform context, requirements, data boundaries, Android permissions, external services, accessibility needs, and verification approach.</p>
            <p>Give each functional requirement a stable ID and a testable condition. For example: “When the user returns from Android Settings, the app checks the current permission state and shows the appropriate next step.” The case to verify includes permission granted, declined, and revoked.</p>
            <p>Record technical choices as proposals until you have checked documentation and tested feasibility. In the App #11 planning notes, Flutter for the interface and a Kotlin Android module were proposed choices; they were not presented as completed implementation.</p>

            <h2>Use AI to organize an idea, then review it</h2>
            <p>Narrating an idea can reveal gaps, but an AI-generated document is a draft, not evidence. Keep your wording and facts separate from suggested decisions. Ask for missing information instead of allowing guesses to become requirements.</p>
            <pre><code>{"I will describe an Android app idea in rough notes. Capture the details\nuntil I say “done,” then draft a PRD with:\n\n- problem, intended user, and evidence versus assumptions\n- goals, non-goals, and a small first release\n- features tied to user needs and testable acceptance criteria\n- success measures, risks, and open questions\n\nPreserve my facts. Label your suggestions as proposals. Do not invent\ninterviews, market research, product features, or technical evidence.\nMark missing information as an open question."}</code></pre>
            <p>After reviewing the PRD, ask for a matching SRS. Check that each functional requirement maps to a PRD goal or feature, and flag permissions, platform behavior, and policy assumptions for verification against current Android documentation.</p>

            <h2>Review before building</h2>
            <ul>
              <li>Can a reader tell which user need each feature addresses?</li>
              <li>Are proposed features distinct from verified capabilities?</li>
              <li>Can each requirement be checked through a test or review?</li>
              <li>Are Android permissions, data handling, and failure cases accounted for?</li>
              <li>Are unresolved choices clearly visible?</li>
            </ul>
            <p>Keep the documents editable as you learn. A good first draft is a map of what to investigate and build next, not a promise that every idea is final.</p>

            <aside className="hk-guide-related" aria-label="Related reading">
              <p className="hk-eyebrow">See the example in context</p>
              <p><Link href="/build-log/day-3">Day 03: Turning an Android App Idea into a PRD and SRS <ArrowUpRight aria-hidden="true" size={15} /></Link></p>
              <p><Link href="/build-log/day-1">Day 01: Starting an Android Screen Time App <ArrowUpRight aria-hidden="true" size={15} /></Link></p>
              <p><Link href="/contact">Contact Kaka about a project <ArrowUpRight aria-hidden="true" size={15} /></Link></p>
            </aside>
          </div>
        </article>
        <JsonLd data={articleStructuredData} />
      </main>
      <SiteFooter />
    </div>
  );
}
