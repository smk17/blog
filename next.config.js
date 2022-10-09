const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ["p.tsx", "p.ts", "p.jsx", "p.js"],
  env: {
    // 站点名字
    title: "Seng Mitnick",
    // 站点描述
    description:
      "I am a web developer helping make the world a better place through JavaScript.",
  },
  rewrites: async function () {
    return [
      {
        source: "/blog",
        destination: "/blog/page/1",
      },
    ];
  },
};

module.exports = withAntdLess(nextConfig);
