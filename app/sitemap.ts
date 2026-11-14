import type { MetadataRoute } from "next";
import { listPublishedEntries } from "@/lib/build-log";

const baseUrl = "https://www.heykakaa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/build-log", "/roadmap", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}` })),
    ...listPublishedEntries().map((entry) => ({ url: `${baseUrl}/build-log/${entry.slug}`, lastModified: entry.date })),
  ];
}
