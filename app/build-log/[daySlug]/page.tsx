import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { buildLogDirectory, findPublishedEntry, listPublishedEntries } from "@/lib/build-log";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

type Props = { params: Promise<{ daySlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listPublishedEntries().map((entry) => ({ daySlug: entry.slug }));
}

function getEntry(daySlug: string) {
  const match = /^day-([1-9]\d*)$/.exec(daySlug);
  return match ? findPublishedEntry(buildLogDirectory, Number(match[1])) : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { daySlug } = await params;
  const entry = getEntry(daySlug);
  if (!entry) notFound();
  const path = `/build-log/${entry.slug}`;
  return {
    title: `Day ${entry.day}: ${entry.title} | HeyKakaa`,
    description: entry.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `Day ${entry.day}: ${entry.title}`,
      description: entry.summary,
      url: path,
      images: [`${path}/opengraph-image`],
    },
  };
}

export default async function DayPage({ params }: Props) {
  const { daySlug } = await params;
  const entry = getEntry(daySlug);
  if (!entry) notFound();

  const entries = listPublishedEntries();
  const index = entries.findIndex((item) => item.day === entry.day);
  const newer = entries[index - 1];
  const older = entries[index + 1];
  const dateLabel = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${entry.date}T00:00:00Z`));

  return (
    <div className="relative min-h-svh">
      <SiteHeader active="build-log" />
      <main className="hk-article-page" id="main-content">
        <Link className="hk-article-back" href="/build-log"><ArrowLeft aria-hidden="true" size={17} /> All days</Link>
        <article>
          <header className="hk-article-header">
            <p className="hk-eyebrow">App #11 / Day {String(entry.day).padStart(2, "0")}</p>
            <h1>{entry.title}</h1>
            <p className="hk-article-summary">{entry.summary}</p>
            <time dateTime={entry.date}>{dateLabel}</time>
          </header>
          <div className="hk-article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.body}</ReactMarkdown>
          </div>
        </article>
        <div className="hk-article-end">
          <a href={entry.reelUrl} target="_blank" rel="noopener noreferrer">Watch the Day {String(entry.day).padStart(2, "0")} reel <ArrowUpRight aria-hidden="true" size={17} /></a>
          <a href="https://www.instagram.com/hey.kakaa/" target="_blank" rel="noopener noreferrer">Follow @hey.kakaa <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
        <nav className="hk-article-nav" aria-label="Build Log days">
          {older ? <Link href={`/build-log/${older.slug}`}><ArrowLeft aria-hidden="true" size={17} /> Day {String(older.day).padStart(2, "0")}</Link> : <span />}
          {newer ? <Link href={`/build-log/${newer.slug}`}>Day {String(newer.day).padStart(2, "0")} <ArrowRight aria-hidden="true" size={17} /></Link> : <span />}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
