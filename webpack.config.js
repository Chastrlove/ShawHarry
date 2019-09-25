const _ = require("lodash");
const fs = require("fs-extra");
const path = require("path");
const isWsl = require("is-wsl");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadPlugin = require("preload-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const printBuildError = require("react-dev-utils/printBuildError");

const SentryPlugin = require("webpack-sentry-plugin");
const SentryConfig = require("./sentryclirc.config");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const paths = require("./config/path");

const { appDirectory, clientPath, entry: entryPath, appTsConfig, appBuild, postcssConfig } = paths;

const { publicPath } = require("./config/host");
const cfg = require("./config");

const { entry, template } = getEntryAndTemp();

module.exports = (env) => {
  (env = env || {}) && !env.NODE_ENV && (env.NODE_ENV = "development");

  env.clientCfg = cfg[env.NODE_ENV];

  const isDev = env.NODE_ENV === "development";
  const isPro = env.NODE_ENV === "production";
  const isQA = env.NODE_ENV === "qa";

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isDev && require.resolve("style-loader"),
      (isPro || isQA) && {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
          reloadAll: true,
        },
      },
      {
        loader: "css-loader",
        options: cssOptions,
      },
      {
        loader: "postcss-loader",
        options: require(postcssConfig),
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push(preProcessor);
    }
    return loaders;
  };

  return {
    entry,
    mode: isQA ? "production" : env.NODE_ENV,
    devtool: isQA || isPro ? "source-map" : "cheap-module-eval-source-map",

    output: {
      path: appBuild,
      pathinfo: isDev,
      filename: "js/[name].[hash].js",
      publicPath,
      chunkFilename: isPro || isQA ? "js/[name].[contenthash:8].chunk.js" : isDev && "js/[name].chunk.js",
      devtoolModuleFilenameTemplate:
        isPro || isQA
          ? (info) => path.relative(paths.src, info.absoluteResourcePath).replace(/\\/g, "/")
          : isDev && ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
    },
    resolve: {
      alias: getAlias(),
      modules: ["node_modules", paths.appNodeModules, paths.src],
      extensions: [".ts", ".tsx", ".js", ".pcss", ".less", ".css", ".svg", ".html"],
    },
    externals: {
      /* lodash: "_",
      "lodash/fp": "_",
      mobx: "mobx",
      react: "React",
      "react-dom": "ReactDOM",
      "react-router-dom": "ReactRouterDOM",
      bluebird: "Promise",
      moment: "moment",*/
    },
    module: {
      rules: [
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            {
              test: /\.(jsx|js|ts|tsx)$/,
              exclude: [
                (filePath) => {
                  function genTranspileDepRegex(transpileDependencies) {
                    const deps = transpileDependencies.map((dep) => {
                      if (typeof dep === "string") {
                        const depPath = path.join("node_modules", dep, "/");
                        return process.platform === "win32"
                          ? depPath.replace(/\\/g, "\\\\") // double escape for windows style path
                          : depPath;
                      } else if (dep instanceof RegExp) {
                        return dep.source;
                      }
                    });
                    return deps.length ? new RegExp(deps.join("|")) : null;
                  }

                  const transpileDepRegex = genTranspileDepRegex([]);

                  if (transpileDepRegex && transpileDepRegex.test(filePath)) {
                    //babel.config.js must be used in order for transpileDependencies to work properly. Its behavior is different from .babelrc or babel in package.json.
                    return false;
                  }
                  return /node_modules/.test(filePath);
                },
              ],
              use: [
                "cache-loader",
                "thread-loader",
                {
                  loader: "babel-loader",
                  options: {
                    cacheDirectory: true,
                    cacheCompression: isPro,
                    compact: isPro,
                  },
                },
              ],
            },
            {
              test: /\.p(ost)?css$/,
              include: [clientPath],
              use: getStyleLoaders({
                modules: {
                  localIdentName: "[name]__[local]__[hash:base64:5]",
                },
                importLoaders: 2,
              }),
            },
            {
              test: /\.s[ac]ss$/,
              include: [clientPath],
              use: getStyleLoaders(
                {
                  modules: {
                    localIdentName: "[name]__[local]__[hash:base64:5]",
                  },
                  importLoaders: 2,
                },
                {
                  loader: "sass-loader",
                  options: {
                    implementation: require("sass"),
                    sourceMap: false,
                  },
                },
              ),
            },
            {
              test: /\.css$/,
              exclude: [clientPath],
              use: getStyleLoaders(),
            },
            /*{
              test: /\.svg$/i,
              loader: "svg-sprite-loader",
              options: {
                symbolId: "icon-[name]",
              },
              include: paths.bankSvg, // 只打包银行icon
            },*/
            {
              test: /\.svg$/i,
              // exclude: paths.bankSvg,
              issuer: {
                test: /\.tsx?$/,
              },
              use: [
                "@svgr/webpack",
                {
                  loader: "file-loader",
                  query: {
                    name: "resource/[name].[hash].[ext]",
                    publicPath: `${publicPath}`,
                  },
                },
              ],
            },
            {
              test: /\.hbs$/,
              loader: "handlebars-loader",
              query: {
                // inlineRequires: "resources/",
                helperDirs: [path.join(appDirectory, "bundler_cfg/helpers")],
              },
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: "url-loader",
              options: {
                limit: 10000,
                name: "resource/[name].[hash].[ext]",
              },
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            {
              loader: "file-loader",
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              query: {
                name: "resource/[name].[hash].[ext]",
                publicPath: `${publicPath}`,
              },
            },
          ],
        },
      ],
      noParse: ["/moment/"],
    },
    plugins: _.concat(
      [
        isPro && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(env),
        }),
        new CopyWebpackPlugin([
          {
            context: path.join(appDirectory, "src/public/"),
            from: "**/*",
          },
        ]),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: isDev ? "css/[name].css" : "css/[name].[hash].css",
          chunkFilename: isDev ? "css/[id].css" : "css/[id].[hash].css",
        }),
      ],
      !!env.SENTRY
        ? new SentryPlugin({
            ...SentryConfig(env),
            release: env.RELEASE_VERSION,
            include: /(\.js\.map|\.js)$/,
            deleteAfterCompile: isPro,
            filenameTransform: function(filename) {
              return "~/" + filename;
            },
          })
        : [],
      getHtmlPlugin(isPro || isQA),
      /*new PreloadPlugin({
        rel: "preload",
        include: "initial",
        // fileBlacklist: [/\.map$/, /hot-update\.js$/],
      }),*/
      [
        new WebpackBar({
          name: "📦  Webpack",
          minimal: false,
        }),
      ],
      new FriendlyErrorsWebpackPlugin({
        onErrors: function(severity, errors) {
          if (severity !== "error") {
            return;
          }

          printBuildError(_.map(errors, "webpackError").join("\n\n"));
        },
      }),
      new CaseSensitivePathsPlugin(),
      isDev && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      //new (require("webpack-bundle-analyzer")).BundleAnalyzerPlugin(),
    ).filter(Boolean),
    optimization: {
      splitChunks: {
        chunks: "all",
        /*  minSize: isDev ? 30000 : 200000,
        maxSize: isDev ? 0 : 1500000,*/
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: "~",
        name: false,
        cacheGroups: _.chain(entry)
          .mapValues((value, key) => {
            return {
              name: key,
              test: (m, c, entry = key) => m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
              chunks: "all",
              enforce: true,
            };
          })
          .mapKeys((value, key) => {
            return `${key}Styles`;
          })
          .value(),
      },
      runtimeChunk: true,
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: !isWsl,
          sourceMap: !isPro || !!env.SENTRY,
          // Compression specific options
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            warnings: false,
            output: {
              ecma: 5,
              // 删除所有的注释
              comments: false,
              ascii_only: true,
            },
            mangle: {
              safari10: true,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // 删除所有的 `console` 语句，可以兼容ie浏览器
              drop_console: isPro,
              // // 内嵌定义了但是只用到一次的变量
              // collapse_vars: true,
              // // 提取出出现多次但是没有定义成变量去引用的静态值
              // reduce_vars: true,
              comparisons: false,
              inline: 2,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
          },
        }),
      ],
    },
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
    },
  };
};

/**
 * 生成入口和模版
 * @returns {{entry, template}}
 */
function getEntryAndTemp() {
  const filterMap = ["common", "component"];
  const template = {};
  const entry = {};

  _.chain(fs.readdirSync(entryPath))
    .filter((dirName, key) => {
      return !_.includes(filterMap, dirName);
    })
    .filter((dirName, key) => {
      const dirPath = path.join(entryPath, dirName);
      return fs.existsSync(path.join(dirPath, "index.tsx")) === true && fs.existsSync(path.join(dirPath, "index.hbs"));
    })
    .forEach((dirName, key) => {
      const dirPath = path.join(entryPath, dirName);
      const entryFilePath = path.join(dirPath, "index.tsx");
      const tempFilePath = path.join(dirPath, "index.hbs");

      entry[dirName] = entryFilePath;
      template[dirName] = tempFilePath;
    })
    .value();

  return {
    entry,
    template,
  };
}

/**
 * 获取别名
 */
function getAlias() {
  return _.chain(require(appTsConfig).compilerOptions.paths)
    .mapKeys((item, key) => {
      return _.replace(key, "/*", "");
    })
    .mapValues((item) => {
      return path.join(appDirectory, _.replace(item, "/*", "/"));
    })
    .value();
}

/**
 * 生成动态的html入口模版
 * @param isPro
 * @returns {any[]}
 */
function getHtmlPlugin(isPro) {
  return _.map(template, (path, key) => {
    return new HtmlWebpackPlugin(
      _.assign(
        {
          inject: true,
          template: path,
          filename: `${key}.html`,
          chunks: [key],
          config: {
            PUBLIC_URL: publicPath.slice(0, -1),
            isPro,
            libs_url: {
              qa: "//10.64.200.202:4000/ry-libs", //10.64.200.202:4000/ry-libs", //cdn.bootcss.com
              pro: "//10.64.200.202:4000/ry-libs", //www.ruiwingroup.com/ry-libs
            },
          },
        },
        isPro
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    );
  });
}

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}
