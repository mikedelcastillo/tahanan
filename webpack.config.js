const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './source/js/app.js',
  },
  output: {
    path: __dirname + "/public/js",
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  watch: true
};
