const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {

    const endFileName = process.env.NODE_ENV === "production" ? "" : ".development";

    return {
        entry: "./src/index.tsx",
        mode: process.env.NODE_ENV || "development",
        devServer: {
            port: 3001,
            open: true,
            historyApiFallback: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            plugins: [new TsconfigPathsPlugin({})],
            fallback: {
                fs: false,
                tls: false,
                net: false,
                path: false,
                zlib: false,
                http: false,
                https: false,
                stream: false,
                crypto: require.resolve("crypto-browserify"),
                buffer: require.resolve("buffer/"),

                // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
            },
        },
        module: {
            rules: [{
                    test: /\.(js|jsx|tsx|ts)$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.svg$/,
                    use: ["file-loader", "svgo-loader"],
                },
                {
                    test: /\.mp4$/,
                    use: ["file-loader"],
                },
            ],
        },

        plugins: [
            new Dotenv({
                path: `.env${endFileName}`,
                safe: true,
            }),
            new HtmlWebpackPlugin({
                favicon: "./public/ICONO.png",
                template: "./public/index.html",
            }),
            new webpack.ProvidePlugin({
                Buffer: ["buffer", "Buffer"],
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),
        ],
    };
};