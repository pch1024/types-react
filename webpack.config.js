const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const tsImportPluginFactory = require("ts-import-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const srcPath = path.join(__dirname, "src");
const distPath = path.join(__dirname, "dist");

const env = process.env.NODE_ENV;
const isDev = env !== "production";

const outputPublicPath = isDev ? "/" : "./";
const cssLoader = isDev ? "style-loader" : {
    loader: MiniCssExtractPlugin.loader,
    options: {
        publicPath: "../"
    }
};
// 打包插件
const pluginsMode = () => isDev ? [] : [ new BundleAnalyzerPlugin() ];
// 重置 Ant Design Less 预设主题变量
const modifyVars = {
    // "primary-color": "#1DA57A",
    "border-radius-base": "2px"
};


module.exports = {
    context: srcPath,
    mode: env,
    devtool: "source-map",
    entry: "./main.tsx",
    output: {
        filename: "js/app.[hash].js",
        publicPath: outputPublicPath
    },
    resolve: {
        alias: {
            "@": srcPath
        },
        extensions: [ ".ts", ".tsx", ".js" ]
    },
    module: {
        rules: [
            /*{
             enforce: "pre",
             test: /\.(ts|tsx)$/,
             exclude: /node_modules/,
             loader: "eslint-loader"
             },*/
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    getCustomTransformers: () => ( {
                        before: [
                            tsImportPluginFactory({
                                libraryName: "antd",
                                libraryDirectory: "lib",
                                style: true
                            })
                        ]
                    } )
                }
            },
            {
                test: /\.less$/,
                // exclude: /node_modules/,
                use: [
                    cssLoader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars,
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    cssLoader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: "assets/[name].[ext]?[hash]" // 源文件
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: distPath,
        hot: true,
        open: true,
        port: 10000,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([ { from: "static" } ]),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            minify: true,
            title: "TSX",
            template: "index.ejs", //Name of template in ./src
            filename: "index.html", //Name of file in ./dist/
            favicon: "favicon.ico",
            publicPath: "./"
        }),
        new webpack.HotModuleReplacementPlugin(),
        ...pluginsMode()
    ]
};
