const withMarkdoc = require('@markdoc/next.js')


/** @type {import('next').NextConfig} */
const nextConfig = {

  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  env: {
    TOKEN_USER: process.env.TOKEN_USER,
  },
  
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
