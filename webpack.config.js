const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

let plugins_dev = [
  new CopyWebpackPlugin(
    [
      {
        from: './static/',
        to: './dist/',
      },
    ],
    { debug: true },
  ),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    hash: true,
    inject: true,
    minify: true,
    title: 'PCH1024',
    template: 'index.ejs',
    favicon: 'favicon.ico',
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
];
let plugins_build = [
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin(
    [
      {
        from: './static/',
        to: './static/',
      },
    ],
    { debug: true },
  ),
  new MiniCssExtractPlugin({
    filename: 'css/app.css',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    inject: true,
    minify: true,
    title: 'PCH1024',
    template: 'index.ejs',
    favicon: 'favicon.ico',
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  new BundleAnalyzerPlugin(),
];

module.exports = {
  mode: env,
  devtool: 'inline-source-map',
  entry: './src/app.tsx',
  output: {
    filename: 'app.js',
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    port: 9000,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          filename: './js/[name].bundle.js',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: isDev ? plugins_dev : plugins_build,
};
