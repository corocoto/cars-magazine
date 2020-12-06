const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const paths = require('./paths');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    plugins: [
        new htmlWebpackPlugin({
            template: paths.src + '/index.html',
            inject: 'head',
            scriptLoading: 'defer',
            minify: true
        })
    ],
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'single'
        }
    },
    performance: {
        hints: 'error',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});
   