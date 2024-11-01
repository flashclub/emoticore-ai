/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ricepuritytest.xyz",
        port: "",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "localhost",
        port: "3000",
        protocol: "http",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig

