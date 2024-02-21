// production config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: path.resolve(__dirname, "../../dist"),
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BASE_URL: "https://jsonplaceholder.typicode.com/albums",
    }),
  ],
});
