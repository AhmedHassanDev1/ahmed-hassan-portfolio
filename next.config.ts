import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [320, 384, 414, 480],
    qualities: [75, 88],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  
  },
};
export default nextConfig;
