import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { buildLogDirectory, findPublishedEntryBySlug, listPublishedEntries } from "@/lib/build-log";
import { getArticleSectionId, getArticleSections, type ArticleSection } from "@/lib/article-progress";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ArticleMotion } from "./article-motion";
import { JsonLd } from "../../components/json-ld";
import { CopyCodeBlock } from "../../components/copy-code-block";

type Props = { params: Promise<{ daySlug: string }> };

function entryLabel(entry: NonNullable<ReturnType<typeof findPublishedEntryBySlug>>) {
  return entry.kind === "introduction" ? "Introduction" : `Day ${String(entry.day).padStart(2, "0")}`;
}

function createMarkdownComponents(sections: ArticleSection[]): Components {
  let headingIndex = 0;
  return {
    h2: ({ children }) => {
      const id = getArticleSectionId(sections, headingIndex);
      headingIndex += 1;
      return <h2 id={id}>{children}</h2>;
    },
    pre: ({ children }) => <CopyCodeBlock>{children}</CopyCodeBlock>,
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return listPublishedEntries().map((entry) => ({ daySlug: entry.slug }));
}

function getEntry(daySlug: string) {
  return findPublishedEntryBySlug(buildLogDirectory, daySlug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { daySlug } = await params;
  const entry = getEntry(daySlug);
  if (!entry) notFound();
  const path = `/build-log/${entry.slug}`;
  const title = entry.kind === "introduction" ? entry.title : `${entryLabel(entry)}: ${entry.title}`;
  const image = `/assets/build-log-${entry.slug}-og.webp`;
  return {
    title: `${title} | HeyKakaa`,
    description: entry.summary,
    alternates: { canonical: path },
    authors: [{ name: "Kaka", url: "https://www.heykakaa.com/" }],
    openGraph: {
      type: "article",
      title,
      description: entry.summary,
      url: path,
      publishedTime: `${entry.date}T00:00:00+05:30`,
      authors: ["https://www.heykakaa.com/"],
      images: [{ url: image, width: 1200, height: 675, alt: title }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function DayPage({ params }: Props) {
  const { daySlug } = await params;
  const entry = getEntry(daySlug);
  if (!entry) notFound();

  const entries = listPublishedEntries();
  const index = entries.findIndex((item) => item.slug === entry.slug);
  const relatedEntries = entries.filter((item) => item.slug !== entry.slug).slice(0, 3);
  const newer = entries[index - 1];
  const older = entries[index + 1];
  const dateLabel = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${entry.date}T00:00:00Z`));
  const sections = getArticleSections(entry.body);
  const markdownComponents = createMarkdownComponents(sections);
  const articleImage = `/assets/build-log-${entry.slug}-og.webp`;
  const articleTitle = entry.kind === "introduction" ? entry.title : `${entryLabel(entry)}: ${entry.title}`;
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    description: entry.summary,
    image: [`https://www.heykakaa.com${articleImage}`],
    datePublished: `${entry.date}T00:00:00+05:30`,
    author: {
      "@type": "Person",
      name: "Kaka",
      url: "https://www.heykakaa.com/",
    },
    mainEntityOfPage: `https://www.heykakaa.com/build-log/${entry.slug}`,
  };

  return (
    <div className="relative min-h-svh">
      <SiteHeader active="build-log" />
      <main className="hk-article-page" id="main-content">
        <ArticleMotion />
        <Link className="hk-article-back" href="/build-log"><ArrowLeft aria-hidden="true" size={17} /> All days</Link>
        <article>
          <header className={`hk-article-header${entry.coverImage ? " hk-article-header-with-cover" : ""}`}>
            <div className="hk-article-header-content">
              <p className="hk-eyebrow">{entry.series ?? "App #11"} / {entryLabel(entry)}</p>
              <h1>{entry.title}</h1>
              <p className="hk-article-summary">{entry.summary}</p>
              <p className="hk-guide-byline">By Kaka · <time dateTime={entry.date}>{dateLabel}</time></p>
            </div>
            {entry.coverImage && entry.coverAlt && entry.coverWidth && entry.coverHeight && (
              <figure className="hk-article-cover">
                <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer" className="hk-article-cover-link">
                  <Image
                    src={entry.coverImage}
                    alt={entry.coverAlt}
                    width={entry.coverWidth}
                    height={entry.coverHeight}
                    sizes="(max-width: 640px) 220px, 230px"
                    priority
                  />
                </a>
                <figcaption>
                  <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer">Watch the {entryLabel(entry)} Reel <ArrowUpRight aria-hidden="true" size={14} /></a>
                </figcaption>
              </figure>
            )}
          </header>
          {sections.length > 0 && (
            <nav className="hk-article-toc" aria-label="Article sections">
              <p>Jump to a section</p>
              <ul>
                {sections.map((section) => (
                  <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
                ))}
              </ul>
            </nav>
          )}
          <div className="hk-article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{entry.body}</ReactMarkdown>
          </div>
        </article>
        <div className="hk-article-end">
          <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer">Watch the {entryLabel(entry)} reel <ArrowUpRight aria-hidden="true" size={17} /></a>
          <a href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Follow @hey.kakaa <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
        {relatedEntries.length > 0 && (
          <section className="hk-article-related" aria-labelledby="related-entries-title">
            <p className="hk-eyebrow">Keep reading</p>
            <h2 id="related-entries-title">More from the Rooko build.</h2>
            <div className="hk-article-related-grid">
              {relatedEntries.map((related) => (
                <Link href={`/build-log/${related.slug}`} key={related.slug}>
                  <span>{entryLabel(related)}</span>
                  <strong>{related.title}</strong>
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ))}
            </div>
          </section>
        )}
        <nav className="hk-article-nav" aria-label="Build Log days">
          {older ? <Link href={`/build-log/${older.slug}`}><ArrowLeft aria-hidden="true" size={17} /> {entryLabel(older)}</Link> : <span />}
          {newer ? <Link href={`/build-log/${newer.slug}`}>{entryLabel(newer)} <ArrowRight aria-hidden="true" size={17} /></Link> : <span />}
        </nav>
        <JsonLd data={articleStructuredData} />
      </main>
      <SiteFooter />
    </div>
  );
}
