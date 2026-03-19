import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/mentee/projects',
        permanent: true,
      },
      {
        source: '/',
        destination: '/mentee/projects',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
