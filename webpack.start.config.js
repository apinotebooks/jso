const path = require('path')

module.exports = {
  entry: './src/JSO.js',
  output: {
    path: path.resolve(__dirname, 'examples'),
    filename: 'jso.js',
    library: 'jso',
    libraryTarget: 'umd'
  },
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults', useBuiltIns: 'entry', corejs: 3}],
              '@babel/preset-react'
            ]
          }
        }
      }

    ]
  }
}
