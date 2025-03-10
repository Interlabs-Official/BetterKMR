const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

// common configuration for both browsers
const common = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  entry: {
    content: './content.js',
    service: './service.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.yml$/,
        use: ['yaml-loader'],
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'modify.css', to: 'modify.css' },
        { from: 'icon', to: 'icon' },
        { from: 'frameworks', to: 'frameworks' },
        { from: 'settings', to: 'settings' },
        { from: 'src', to: 'src' },
        { from: 'assets', to: 'assets' },
      ],
    }),
  ],
};

// chrome specific configuration
const chromeConfig = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist/chrome'),
  },
});

// firefox specific configuration
const firefoxConfig = merge(common, {
  output: {
    path: path.resolve(__dirname, 'dist/firefox'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: 'manifest.json', 
          to: 'manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());
            // Replace service_worker with scripts for Firefox
            if (manifest.background && manifest.background.service_worker) {
              manifest.background.scripts = [manifest.background.service_worker];
              delete manifest.background.service_worker;
            }
            return JSON.stringify(manifest, null, 2);
          }
        },
      ],
    }),
  ],
});

module.exports = (env) => {
  if (env.target === 'firefox') {
    return firefoxConfig;
  }
  return chromeConfig;
};