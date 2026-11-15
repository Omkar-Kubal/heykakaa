import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

export function getBuildLogRedirects(dayOneContentExists: boolean) {
  return [
    ...(!dayOneContentExists ? [
      { source: "/build-log/day-1", destination: "/build-log/introduction", permanent: false },
      { source: "/day-1", destination: "/build-log/introduction", permanent: false },
    ] : []),
    { source: "/day-:day(\\d+)", destination: "/build-log/day-:day", permanent: true },
  ];
}

const nextConfig: NextConfig = {
  async redirects() {
    const dayOneContent = join(process.cwd(), "content", "build-log", "day-01.md");
    return getBuildLogRedirects(existsSync(dayOneContent));
  },
};

export default nextConfig;
