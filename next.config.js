/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { 
    optimizeCss: true,
    optimisticClientCache: true, // Mise en cache optimiste pour navigation plus rapide
    serverComponentsExternalPackages: ['react', 'react-dom']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimisations de performance
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // Optimiser la navigation côté serveur
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  // Port par défaut défini explicitement
  serverRuntimeConfig: {
    port: 3002,
  },
  publicRuntimeConfig: {
    port: 3002,
  },
  // Optimisation des bundles
  output: 'standalone', // Optimise pour les déploiements en production
}

module.exports = nextConfig 