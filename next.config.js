/** @type {import('next').NextConfig} */
import {withPayload} from '@payloadcms/next/withPayload'
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  reactCompiler: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: '/api/media/:path*', // Payload handles this via withPayload usually, but let's ensure rewrites exist if needed
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  turbopack: {},
}

export default withPayload(nextConfig)
