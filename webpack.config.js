const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const dir = name => path.join(__dirname, name);
const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
    context: dir('src'),
    mode: env,
    devtool: 'source-map',
    entry: './app.tsx',
    output: {
        filename: 'js/app.js',
        publicPath: isDev ? '/' : './',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // {
            //   enforce: "pre",
            //   test: /\.(ts|tsx)$/,
            //   exclude: /node_modules/,
            //   loader: "eslint-loader"
            // },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: 'css',
                            }),
                        ],
                    }),
                },
            },
            {
                test: /\.(c|sc)ss$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: 'assets/[name].[hash].[ext]', // 源文件
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: dir('dist'),
        compress: true,
        hot: true,
        open: true,
        port: 9999,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'static',
            },
        ]),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        new MiniCssExtractPlugin({
            filename: 'css/app.css',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            minify: true,
            title: 'TSX',
            template: 'index.ejs',
            favicon: 'favicon.ico',
        }),
        isDev
            ? new webpack.HotModuleReplacementPlugin()
            : new BundleAnalyzerPlugin(),
    ],
};
