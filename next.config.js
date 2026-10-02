/** @type {import('next').NextConfig} */
import {withPayload} from '@payloadcms/next/withPayload'
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  reactCompiler: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ['image/avif', 'image/webp'],
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
        source: '/api/media/file/:path*',
        destination: '/media/:path*',
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  turbopack: {},
}

export default withPayload(nextConfig)
