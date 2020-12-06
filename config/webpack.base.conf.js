const paths =require('./paths');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const pngquant=require('imagemin-pngquant');
const mozjpeg=require('imagemin-mozjpeg');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        modules: [
            `${paths.src}/js/Animator.js`,
            `${paths.src}/js/Navigator.js`,
            `${paths.src}/js/Paginator.js`,
        ],
        main: {
            import: `${paths.src}/js/index`,
            dependOn: 'modules'
        }
    },
    output: {
        path: paths.dist,
        filename: 'js/[contenthash:8].bundle.js',
        
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    } 
                ],
                type: 'asset/resource'

            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(paths.root, 'postcss.config.js')
                            },
                            sourceMap: true,
                        },
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: `${paths.src}/assets/img/`,
                    to: `${paths.dist}/assets/img/`
                }
            ]
        }),
        new ImageminPlugin({
            interlaced: true,
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            plugins: [
                mozjpeg({quality: 50}),
                pngquant()
            ]
        }),
        new HtmlWebpackPlugin({
            template: `${paths.src}/index.html`,
            inject: 'head',
        })
    ]
};
