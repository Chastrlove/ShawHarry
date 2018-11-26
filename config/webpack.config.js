const path = require("path");
const paths = require("./path");
const _ = require("lodash");
const fs = require("fs");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const postCssConfig = require("../postcss.config");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const publicPath = "/";

const { entry: entryPath, src, appPublic, appBuild } = paths;

const outputPath = appBuild;

const { entry, template } = createEntry();

function createEntry() {
  let entry = {};
  let template = {};
  _.chain(fs.readdirSync(entryPath))
    .filter((file) => {
      return (
        fs.lstatSync(path.join(entryPath, file)).isDirectory() &&
        fs.existsSync(path.join(entryPath, file, "index.js"))
      );
    })
    .forEach((file) => {
      entry[file] = [path.join(entryPath, `${file}/index.js`)];
      template[file] = path.join(entryPath, `${file}/index.hbs`);
    })
    .value();
  return {
    entry,
    template,
  };
}

module.exports = (env) => {
  const devMode = env !== "production";
  return {
    mode: env,
    devtool: devMode && "cheap-module-source-map",
    devServer: {
      host: "localhost",
      port: 3010,
      hot: true,
      inline: true,
      compress: true,
      // contentBase: "/", // 服务器启动的根目录，默认为当前执行目录，一般不需要设置
      watchContentBase: true,
      publicPath: publicPath, // dev-server静态资源存放的位置
    },
    entry: entry,
    output: {
      path: outputPath, // dev模式不需要这玩意，因为与webpack-dev-server完全无关
      filename: "js/[name].[hash:8].js",
      chunkFilename: "js/[name].[hash:8].chunk.js",
      publicPath: publicPath, // 给打包后js的引用路径为加前缀
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".pcss", ".less", ".css", ".svg", ".html"],
    },

    module: {
      rules: [
        {
          test: /.(jsx|js|tx|tsx)$/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.hbs$/,
          loader: "handlebars-loader",
          query: {
            // helperDirs: [path.join(__dirname, "bundler_cfg/helpers")],
          },
        },
        {
          test: /\.pcss$/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]___[hash:5]",
              },
            },
            {
              loader: "postcss-loader",
              options: postCssConfig,
            },
          ],
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg|woff|eot|ttf|mp4|m4v)\??.*$/,
          use: [
            {
              loader: "file-loader",
              query: {
                name: "resource/[name].[hash].[ext]",
                publicPath: `${publicPath}`,
              },
            },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        chunks: "all",
        name: true,
      },
      runtimeChunk: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: devMode,
          // Compression specific options
          terserOptions: {
            warnings: false,
            output: {
              // 最紧凑的输出
              beautify: false,
              // 删除所有的注释
              comments: false,
            },
            compress: {
              // 在UglifyJs删除没有用到的代码时不输出警告
              warnings: false,
              // 删除所有的 `console` 语句，可以兼容ie浏览器
              drop_console: !devMode,
              // 内嵌定义了但是只用到一次的变量
              collapse_vars: true,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin(),
      ],
    },

    plugins: _.concat(
      _.map(entry, (value, key) => {
        return new HtmlWebpackPlugin({
          inject: true,
          template: template[key],
          filename: `${key}.html`,
          chunks: [key],
        });
      }),
      [
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(env),
        }),
        new MiniCssExtractPlugin({
          filename: devMode ? "[name].css" : "css/[name].[hash].css",
          chunkFilename: devMode ? "[id].css" : "css/[id].[hash].css",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin({
          fileName: "asset-manifest.json",
          publicPath: publicPath,
        }),
        // new BundleAnalyzerPlugin(),
      ],
    ),
  };
};
