/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'muntech.vercel.app',
          },
        ],
        destination: 'https://www.muntechs.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
