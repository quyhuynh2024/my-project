// development config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshPlugin(),
    new webpack.EnvironmentPlugin({
      BASE_URL: "http://localhost:5000",
    }),
  ],
  output: {
    publicPath: "/", // added this line to fix the case go directly to dynamic route (go directly route /products/:productId)
  },
});
