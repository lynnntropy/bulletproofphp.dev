const withPlugins = require("next-compose-plugins");

const svgrWebpackLoader = {
  test: /\.svg$/,
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        svgo: true,
        svgoConfig: {
          floatPrecision: 2,
        },
      },
    },
  ],
};

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push(svgrWebpackLoader);

    // Important: return the modified config
    return config;
  },
};

module.exports = withPlugins([], config);
