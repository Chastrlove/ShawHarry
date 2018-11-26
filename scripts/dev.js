const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const openBrowser = require("react-dev-utils/openBrowser");
const _ = require("lodash");

const paths = require("../config/path");

const NODE_ENV = (process.env.NODE_ENV = "development");

const webpackConfig = require(`${path.join(paths.config, "webpack.config.js")}`)(NODE_ENV);

const devServer = webpackConfig.devServer;

const { host, port } = devServer;

_.mapValues(webpackConfig.entry, (value) => {
  value.unshift(`webpack/hot/dev-server`);
  value.unshift(`webpack-dev-server/client?http://${host}:${port}`);
});

const compiler = Webpack(webpackConfig);

const devServerOptions = Object.assign({}, devServer, {
  stats: {
    colors: true,
  },
});

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, host, () => {
  console.log(`Starting server on http://${host}:${port}`);
  openBrowser(`http://${host}:${port}`);
});
