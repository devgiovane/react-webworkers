const path = require("path");
const ProviderPlugin = require('webpack/lib/ProvidePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ mode }) => {
    const isDevelopment = mode !== 'production';
    return {
        mode: mode,
        devtool: isDevelopment ? "source-map" : "eval-source-map",
        entry: path.resolve(__dirname, 'src', 'index.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? '[name].bundle.js' : 'static/js/_[name].[contenthash].bundle.js',
            chunkFilename: isDevelopment ? '[name].chunk.js' : 'static/js/_[name].[contenthash].chunk.js'
        },
        devServer: {
            port: 3000,
            hot: true,
            open: true,
            allowedHosts: 'all'
        },
        resolve: {
            extensions: [ '.js', '.jsx', '.json' ]
        },
        plugins: [
            new ProviderPlugin({
                React: 'react'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].bundle.css' : 'static/css/_[name].[contenthash].bundle.css',
                chunkFilename: isDevelopment ? '[name].chunk.css' : 'static/css/_[name].[contenthash].chunk.css'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/i,
                    exclude: /node_module/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: path => path.endsWith('.module.css'),
                                    localIndentName: '_[name]__[local]--[hash:base64:12]'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/assets/image/[hash][ext][query]'
                    }
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'static/assets/font/[hash][ext][query]'
                    }
                }
            ]
        }
    }
}
