/** @type {import('next').NextConfig} */
import {withPayload} from '@payloadcms/next/withPayload'
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['lucide-react'],
  },
}

export default withPayload(nextConfig)
