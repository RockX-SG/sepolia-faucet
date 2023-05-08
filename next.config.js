/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // swcMinify: true,
  swcMinify: false,
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize default plugin options
                      inlineStyles: {
                        onlyMatchedOnce: false,
                      },
                      // or disable plugins
                      removeDoctype: false,
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
              ],
            },
            titleProp: true,
            ref: true,
          },
        },
        'file-loader',
      ],
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });
    if (options.isServer) {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        bufferutil: 'commonjs bufferutil',
      });
    }
    return config;
  },
  async rewrites() {
    return [
      process.env.NODE_ENV === 'development' && {
        source: '/api/v1/:path*',
        destination: 'https://beta-stake.rockx.com/api/v1/:path*',
      },
    ].filter(Boolean);
  },
};

module.exports = nextConfig;
