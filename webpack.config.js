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
    // globalObject: "this"
  },
  // optimization: {
  //   runtimeChunk: {
  //      name: "vendors"
  //   },
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all"
  //       }
  //     }
  //   }
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    // symlinks: false
    // alias: {
    //   'styled-components': require.resolve('styled-components'),
    // }
  },
  // externals: {
  //   "styled-components": {
  //     commonjs: 'styled-components',
  //     commonjs2: 'styled-components',
  //     amd: 'styled-components',
  //     root: '_',
  //   },
  // },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // include: path.resolve(__dirname, 'src/assets'),
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
