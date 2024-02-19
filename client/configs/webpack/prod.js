// production config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");
const path = require("path");

module.exports = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/bundle.[contenthash].min.js",
    path: path.resolve(__dirname, "../../dist"),
  },
});
