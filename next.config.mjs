/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ek65wlrwd0szvdez.public.blob.vercel-storage.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "nft-cdn.alchemy.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: ""
      }
    ]
  }
};

export default nextConfig;
