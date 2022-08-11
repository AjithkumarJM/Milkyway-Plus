const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const common = require("./common.config");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: "5000",
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // css into commonjs
          "sass-loader", // sass into css
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public", "index.html"),
      favicon: path.join(__dirname, "../src/assets/images", "logo.png"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
});
