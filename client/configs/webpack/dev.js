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
  output: {
    publicPath: "/", // added this line to fix the case go directly to dynamic route (go directly route /products/:productId)
  },
});
