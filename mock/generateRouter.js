/**
 *根据swagger 生成文件，然后挂到express router上
 *
 * @format
 */

const fs = require("fs-extra");
const join = require("path").join;
const rootPath = fs.realpathSync(process.cwd());
const routePath = join(rootPath, "mock/route");

function scan(path, app) {
  const files = fs.readdirSync(path);

  for (let i = 0; i < files.length; i++) {
    const fpath = join(path, files[i]);
    const stats = fs.statSync(fpath);

    if (stats.isDirectory()) {
      scan(fpath, app);
    }
    if (stats.isFile()) {
      require(fpath)(app);
    }
  }
}

module.exports = function(app) {
  scan(routePath, app);
};
