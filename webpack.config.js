const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: false,
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 5000,
    stats: "errors-only",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "game", "assets", "atlas"),
          to: path.join(__dirname, "dist", "assets"),
        },
        {
          from: path.join(__dirname, "public"),
          to: path.join(__dirname, "dist"),
        },
      ],
    }),
  ],
};
