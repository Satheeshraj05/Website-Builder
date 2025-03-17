/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.google.com',
      'sofontsy.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'picsum.photos',
      'loremflickr.com',
      'placekitten.com',
      'placeimg.com',
      'source.unsplash.com',
      'cloudflare-ipfs.com',
      'via.placeholder.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig

