import type { NextConfig } from "next";

const config: NextConfig = {
  experimental: { typedRoutes: true },
  transpilePackages: ["@breathflow/breath-engine", "@breathflow/types"],
};

export default config;
