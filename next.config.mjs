/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');
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

export default withNextIntl(nextConfig);

