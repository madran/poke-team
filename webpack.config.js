var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractText = new ExtractTextPlugin({
    filename: 'bundle.css'
});

var provide = new webpack.ProvidePlugin({
   $: 'jquery',
   jQuery: 'jquery',
   Popper: 'popper.js'
});

module.exports = {
    context: path.resolve(__dirname, 'public'),
    entry: './js/PokeTeam.jsx',
    output: {
        path: path.resolve(__dirname, 'public/packs'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'es2015']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractText.extract({
                    use: ['css-loader']
                })
            }
        ]
    },
    plugins: [
        extractText,
        provide
    ]
};