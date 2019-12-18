const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  entry: {
    app: ['./src/index.jsx'],
    polyfills: ['core-js/stable', 'regenerator-runtime/runtime'],
  },
  // To exclude amCharts exporting stuff, which aren't used
  externals: (context, request, callback) => {
    if (/xlsx|canvg|pdfmake/.test(request)) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  },
};
