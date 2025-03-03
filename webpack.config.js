const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        },
        host: 'localhost',
        port: 3001,  // Ensure this matches your development server port
        // Other devServer configuration...
    },
};