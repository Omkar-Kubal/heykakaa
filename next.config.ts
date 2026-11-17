import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export function getBuildLogRedirects(dayOneContentExists: boolean) {
  return [
    ...(!dayOneContentExists ? [
      { source: "/build-log/day-1", destination: "/build-log/introduction", permanent: false },
      { source: "/day-1", destination: "/build-log/introduction", permanent: false },
    ] : []),
    { source: "/day-:day(\\d+)", destination: "/build-log/day-:day", permanent: true },
  ];
}

export function getBuildLogRedirectsForDirectory(directory: string) {
  const dayOnePath = join(directory, "day-01.md");
  const dayOnePublished = existsSync(dayOnePath)
    && matter(readFileSync(dayOnePath, "utf8")).data.status === "published";
  return getBuildLogRedirects(dayOnePublished);
}

const nextConfig: NextConfig = {
  async redirects() {
    const buildLogDirectory = join(process.cwd(), "content", "build-log");
    return getBuildLogRedirectsForDirectory(buildLogDirectory);
  },
};

export default nextConfig;
