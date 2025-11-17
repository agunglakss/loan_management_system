import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1:4000', '127.0.0.1', 'localhost', 'localhost:4000'],
};

export default nextConfig;
