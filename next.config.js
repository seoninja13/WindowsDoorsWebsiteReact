/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.windowworldla.com'], // Allow images from the source website
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.windowworldla.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
