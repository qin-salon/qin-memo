/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  rewrites: async () => {
    return [{ source: "/", destination: "/root" }];
  },
  future: { strictPostcssConfiguration: true },
  pageExtensions: ["page.tsx", "page.ts"],
  i18n: { locales: ["ja"], defaultLocale: "ja" },
  images: { domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"] },
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  poweredByHeader: false,
};

module.exports = nextConfig;
