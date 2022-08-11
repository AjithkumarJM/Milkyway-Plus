const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const common = require("./common.config");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css into files
          "css-loader", // Turns css into commonjs
          "sass-loader", // Turns sass into css
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../public", "index.html"),
        favicon: path.join(__dirname, '../src/assets/images', 'logo.png'),
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
});
