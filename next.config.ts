import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  // Updated for Next.js 15
  serverExternalPackages: ['axios'], // Moved from experimental
  experimental: {
    // Removed appDir as it's now stable
    // Removed serverComponentsExternalPackages (moved above)
    // Removed optimizeServerReact (deprecated)
  },
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
  // Add custom headers to prevent unwanted extensions from modifying the DOM
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://pokeapi.co; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  // Enable proper source maps for debugging
  productionBrowserSourceMaps: true,
  // Configure webpack to handle hydration warnings
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add hydration warning handling for client-side
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      };
    }

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;