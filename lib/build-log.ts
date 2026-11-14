import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import matter from "gray-matter";

export type BuildLogEntry = {
  day: number;
  slug: string;
  title: string;
  date: string;
  summary: string;
  reelUrl: string;
  tags: string[];
  status: "draft" | "published";
  body: string;
};

const requiredSections = [
  "Goal today",
  "What I did",
  "Decisions + why",
  "Docs / assets",
  "Learnings / blockers + Tomorrow",
] as const;

export const buildLogDirectory = join(process.cwd(), "content", "build-log");

function requiredText(value: unknown, name: string, filename: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${filename}: ${name} is required`);
  }
  return value.trim();
}

export function parseEntry(source: string, filename: string): BuildLogEntry {
  const match = /^day-(\d+)\.md$/.exec(basename(filename));
  if (!match) throw new Error(`${filename}: expected a day-NN.md filename`);

  const { data, content } = matter(source);
  const day = data.day;
  if (!Number.isInteger(day) || day < 1 || day !== Number(match[1])) {
    throw new Error(`${filename}: day number must match the filename`);
  }
  const date = /^date:\s*["']?(\d{4}-\d{2}-\d{2})["']?\s*$/m.exec(source)?.[1];
  const parsedDate = date ? new Date(`${date}T00:00:00Z`) : null;
  if (!date || !parsedDate || Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date) {
    throw new Error(`${filename}: date must be YYYY-MM-DD`);
  }
  const reelUrl = requiredText(data.reel_url, "reel_url", filename);
  if (!/^https:\/\/(www\.)?instagram\.com\//.test(reelUrl)) {
    throw new Error(`${filename}: reel_url must be an Instagram HTTPS URL`);
  }
  if (!Array.isArray(data.tags) || !data.tags.every((tag: unknown) => typeof tag === "string" && tag.trim())) {
    throw new Error(`${filename}: tags must be a list of words`);
  }
  if (data.status !== "draft" && data.status !== "published") {
    throw new Error(`${filename}: status must be draft or published`);
  }
  const headings = [...content.matchAll(/^##\s+(.+?)\s*$/gm)].map((found) => found[1]);
  for (const section of requiredSections) {
    if (!headings.includes(section)) throw new Error(`${filename}: missing section ${section}`);
  }
  const sectionPositions = requiredSections.map((section) => headings.indexOf(section));
  if (sectionPositions.some((position, index) => index > 0 && position < sectionPositions[index - 1])) {
    throw new Error(`${filename}: sections must follow the template order`);
  }
  return {
    day,
    slug: `day-${day}`,
    title: requiredText(data.title, "title", filename),
    date,
    summary: requiredText(data.summary, "summary", filename),
    reelUrl,
    tags: data.tags.map((tag: string) => tag.trim()),
    status: data.status,
    body: content.trim(),
  };
}

export function listPublishedEntries(directory = buildLogDirectory): BuildLogEntry[] {
  const entries = readdirSync(directory)
    .filter((filename) => /^day-\d+\.md$/.test(filename))
    .map((filename) => parseEntry(readFileSync(join(directory, filename), "utf8"), filename));
  const days = new Set<number>();
  for (const entry of entries) {
    if (days.has(entry.day)) throw new Error(`duplicate day number ${entry.day}`);
    days.add(entry.day);
  }
  return entries
    .filter((entry) => entry.status === "published")
    .sort((a, b) => b.day - a.day);
}

export function listTimelineEntries(directory = buildLogDirectory): BuildLogEntry[] {
  return listPublishedEntries(directory).sort((a, b) => a.day - b.day);
}

export function findPublishedEntry(directory: string, day: number): BuildLogEntry | undefined {
  return listPublishedEntries(directory).find((entry) => entry.day === day);
}
