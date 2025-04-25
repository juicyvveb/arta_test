import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { PathData } from 'webpack';

const config: webpack.Configuration = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: `index.html`,
      inject: "body",
      showErrors: true,
    }),
  ],
  devServer: {
    hot: true,
    static: "./dist/",
    watchFiles: ["./src/*"],
  },
  module: {
    rules: [
      {
        test: /.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename:(pathData: PathData) => {
            const fileWithDir = pathData.filename.replace('src/images/', '');
            return `assets/images/${fileWithDir}`;
          }
        },
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
};

export default config;
