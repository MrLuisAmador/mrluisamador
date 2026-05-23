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
