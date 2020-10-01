// const isProd = process.env.NODE_ENV === 'production';

// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   pwa: {
//     disable: !isProd,
//     dest: 'public',
//   },
// });

const { withPlugins } = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

// next.js configuration
const nextConfig = {
exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/faq': { page: '/faq' },
      '/terms': { page: '/terms' },
    }
  },
  };

module.exports = withPlugins([withOptimizedImages], nextConfig);
