/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avataaars.io"],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
