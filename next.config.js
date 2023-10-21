/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      }
    ],
    domains: ['cdn.sanity.io', 'avatars.githubusercontent.com'],
  }
}

module.exports = nextConfig
