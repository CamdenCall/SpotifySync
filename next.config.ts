// next.config.js
module.exports = {
  webpack(config: any) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'), // Ensure Dart Sass is used
          },
        },
      ],
    });

    return config;
  },
};
