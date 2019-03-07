
const path = require("path");

const fs = require('fs');

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  appDirectory: appDirectory,
  appBuild:resolveApp("dist"),
  config: resolveApp("config"),
  src: resolveApp("src"),
  client: resolveApp("client"),
  entry: resolveApp("src/client/entry"),
  appPublic: resolveApp("public"),
  appTsConfig: resolveApp('tsconfig.json'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
};
