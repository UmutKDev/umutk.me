/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "i.scdn.co"],
  },
};

module.exports = nextConfig;
