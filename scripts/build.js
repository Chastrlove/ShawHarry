const gitSha = require("child_process")
  .execSync("git rev-parse --short HEAD")
  .toString()
  .trim();
const chalk = require("react-dev-utils/chalk");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const printBuildError = require("react-dev-utils/printBuildError");

const NODE_ENV = (process.env.NODE_ENV = "production");

//哨兵
const SENTRY = process.env.SENTRY;

const RELEASE_VERSION = (process.env.RELEASE_VERSION = gitSha);

const webpack = require("webpack");
const fs = require("fs-extra");
const paths = require("../config/path");
const config = require(paths.webpackPath);

fs.emptyDirSync(paths.appBuild);

let compiler = webpack(config({ NODE_ENV, RELEASE_VERSION, SENTRY }));

const build = () => {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }
        messages = formatWebpackMessages({
          errors: [err.message],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }

      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
};

build()
  .then(({ stats, warnings }) => {})
  .catch((err) => {
    // console.log(chalk.red('Failed to compile.\n'));
    // printBuildError(err);
  });
