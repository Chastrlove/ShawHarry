const config = require("./index");
const _ = require("lodash");
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  HOST: _.replace(config[NODE_ENV].host, "//", ""),
  PORT: config[NODE_ENV].port,
  publicPath: NODE_ENV === "development" ? "/" : "/",
};
