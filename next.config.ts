import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/mentee/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
