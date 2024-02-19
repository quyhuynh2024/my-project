// development config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshPlugin()],
});
