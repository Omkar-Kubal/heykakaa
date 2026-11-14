import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/day-:day(\\d+)", destination: "/build-log/day-:day", permanent: true }];
  },
};

export default nextConfig;
