import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @altheara/design ships TypeScript source rather than compiled JS,
  // so Next must transpile it like first-party code.
  transpilePackages: ["@altheara/design"],
};

export default nextConfig;
