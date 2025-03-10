/* 
   A lot of this was difficult to figure out, which is what made me quit the first time.
   I'm not sure if this is the best way to do this, but it works.
   A lot of this code is not mine.
*/
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const fs = require('fs');

// Find all module files
const moduleFiles = fs.readdirSync('./src/modules')
  .filter(file => file.endsWith('.js'))
  .reduce((entries, file) => {
    const name = `modules/${file.replace('.js', '')}`;
    entries[name] = `./src/modules/${file}`;
    return entries;
  }, {});

// common configuration for both browsers
const common = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  entry: {
    content: './content.js',
    service: './service.js',
    'settings/script': './settings/script.js',
    ...moduleFiles
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
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jsyaml: 'js-yaml'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'modify.css', to: 'modify.css' },
        { from: 'icon', to: 'icon' },
        { from: 'frameworks', to: 'frameworks' },
        { from: 'settings', to: 'settings', 
          globOptions: {
            ignore: ['**/settings/script.js'] // don't copy this as it's bundled by webpack
          }
        },
        { from: 'src', to: 'src',
          globOptions: {
            ignore: ['**/src/modules/*.js'] // don't copy module JS files as they're bundled
          }
        },
        { from: 'assets', to: 'assets' },
        { from: 'details', to: 'details' },
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
            // replace service_worker with scripts for Firefox
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