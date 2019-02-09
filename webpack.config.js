const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    app: "./src/index.js",
  },
  module: {    
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
