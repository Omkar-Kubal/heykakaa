import type { MetadataRoute } from "next";
import type { BuildLogEntry } from "./build-log";

const baseUrl = "https://www.heykakaa.com";

export function createSitemap(
  entries: readonly Pick<BuildLogEntry, "slug">[] = [],
): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/projects",
    "/projects/syncspend",
    "/projects/synctasks",
    "/build-log",
    "/guides/app-prd-srs",
    "/contact",
  ];

  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}` })),
    ...entries.map((entry) => ({ url: `${baseUrl}/build-log/${entry.slug}` })),
  ];
}
