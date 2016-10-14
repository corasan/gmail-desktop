const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './app/index.js',
        // './dist/styles.css'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: `http://localhost:3000/`
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
            include: path.join(__dirname, 'app')
        },
        { test: /\.json$/, loader: 'json' },
        { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
    query: {
      presets: ['react', 'es2015', 'stage-0']
    }
    }
};
