const chalk = require("chalk");

const NODE_ENV = (process.env.NODE_ENV = "development");
const { isMock } = process.env;
const protocol = process.env.HTTPS === "true" ? "https" : "http";

const webpack = require("webpack");

const WebpackDevServer = require("webpack-dev-server");
const openBrowser = require("react-dev-utils/openBrowser");
const { prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");

const paths = require("../config/path");
const { publicPath, HOST, PORT } = require("../config/host");

const webpackConfig = require(paths.webpackPath)({ NODE_ENV });

const urls = prepareUrls(protocol, HOST, PORT);
const appName = require(paths.appPackageJson).name;

const devServer = {
  host: HOST,
  port: PORT,
  hot: true,
  inline: true, // inline hot
  https: protocol === "https",
  compress: true, // gzip
  quiet: true,
  public: urls.lanUrlForConfig,
  historyApiFallback: {
    rewrites: [{ from: "/", to: "/admin.html" }],
  },
  // contentBase: "./src", // 服务器启动的根目录，默认为当前执行目录，一般不需要设置
  // watchContentBase: true, //开了这个就会改了文件就刷新页面，热替换没效果
  // publicPath: publicPath, // dev-server静态资源存放的位置 不能用'./这种'
  //writeToDisk: true,
  proxy: {
    "/api": {
      target: isMock ? "http://localhost:4000" : "http://10.64.200.206:8081", // "http://10.64.200.206:8081" http://10.64.171.104:8080
      secure: false,
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
};

function printInstructions(appName, urls) {
  console.log();
  console.log(`You can view ${chalk.bold(appName)} in the browser.`);
  console.log();

  if (urls.lanUrlForTerminal) {
    console.log(`  ${chalk.bold("Local:")}            ${urls.localUrlForTerminal}`);
    console.log(`  ${chalk.bold("On Your Network:")}  ${urls.lanUrlForTerminal}`);
  } else {
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log();
}

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServer);

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, devServer);

server.listen(PORT, HOST, () => {
  // printInstructions(appName, urls);
  openBrowser(urls.localUrlForBrowser);
});
