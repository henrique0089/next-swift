/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: '3333-henrique0089-nextswift-l7jc5jg033c.ws-us108.gitpod.io',
      },
    ],
  },
}

module.exports = nextConfig
