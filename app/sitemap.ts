import type { MetadataRoute } from "next";
import { listPublishedEntries } from "@/lib/build-log";
import { createSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(listPublishedEntries());
}
