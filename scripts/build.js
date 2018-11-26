const NODE_ENV = (process.env.NODE_ENV = "production");

const webpack = require("webpack");
const fs = require("fs-extra");
const paths = require("../config/path");
const config = require("../config/webpack.config");

fs.emptyDirSync(paths.appBuild);

let compiler = webpack(config(NODE_ENV));
compiler.run((err, stats) => {});
