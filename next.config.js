/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.windowworldla.com', 'images.unsplash.com'], // Allow images from the source website and Unsplash
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.windowworldla.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
