
const path = require("path");

const fs = require('fs');

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  appDirectory: appDirectory,
  appBuild:resolveApp("dist"),
  config: resolveApp("config"),
  src: resolveApp("src"),
  entry: resolveApp("src/entry"),
  appPublic: resolveApp("public"),
};
