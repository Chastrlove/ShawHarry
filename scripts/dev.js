const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const openBrowser = require("react-dev-utils/openBrowser");

const paths = require("../config/path");
const publicPath = require("../config/webpack.config").publicPath;
const NODE_ENV = (process.env.NODE_ENV = "development");

const webpackConfig = require(`${path.join(paths.config, "webpack.config.js")}`)(NODE_ENV);

const devServer = {
  host: "localhost",
  port: 8080,
  hot: true,
  inline: true,
  compress: true,
  historyApiFallback: true,
  // contentBase: "/", // 服务器启动的根目录，默认为当前执行目录，一般不需要设置
  watchContentBase: true,
  publicPath: publicPath, // dev-server静态资源存放的位置
};

const { host, port } = devServer;

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);

const server = new WebpackDevServer(Webpack(webpackConfig), devServer);

server.listen(port, host, () => {
  console.log(`Starting server on http://${host}:${port}`);
  openBrowser(`http://${host}:${port}`);
});
