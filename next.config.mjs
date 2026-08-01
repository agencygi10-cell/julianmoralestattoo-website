/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Force apex (julianmoralestattoo.com) as canonical — 308 redirect www → apex.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.julianmoralestattoo.com" }],
        destination: "https://julianmoralestattoo.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
