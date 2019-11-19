const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "OPWidget",
    umdNamedDefine: true,
  },
  performance: {
    hints: false
  },
  optimization: { 
    namedModules: false,
    namedChunks: false,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
  },
   minimize: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 65535,
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
    ignored: /node_modules/,
  },
  node: {
    fs: 'empty'
  }
};