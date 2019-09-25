const jsYaml = require("js-yaml");
const blueBird = require("bluebird");
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const swaggerParserMock = require("swagger-parser-mock");

const join = path.join;

const rootPath = fs.realpathSync(process.cwd());
const docPath = path.join(rootPath, "doc");

class Transfer {
  constructor(blacklist = [], outputPath) {
    this.blacklist = [];
    this.outputPath = outputPath;

    this.removeRoute();
    this.generateRoute();
  }

  getDocFiles() {
    const newSwagger = {};

    _.chain(fs.readdirSync(docPath))
      .filter((file) => {
        const filePath = path.join(docPath, file);

        return fs.lstatSync(filePath).isFile() === true && _.endsWith(file, ".yaml");
      })
      .forEach((fileName) => {
        const filePath = path.join(docPath, fileName);

        const key = _.replace(fileName, ".yaml", "");

        newSwagger[key] = jsYaml.safeLoad(fs.readFileSync(filePath, "utf8"));
      })
      .value();

    return newSwagger;
  }

  async generateRoute() {
    const self = this;
    const newSwagger = this.getDocFiles();

    blueBird
      .map(_.keys(newSwagger), (dirName) => {
        return swaggerParserMock({ spec: newSwagger[dirName] }).then((data) => {
          return {
            paths: data.paths,
            dirName,
          };
        });
      })
      .then((data) => {
        _.forEach(data, (item, key) => {
          self.traverse(item.paths, item.dirName);
        });
      });
  }

  traverse(paths, dirName) {
    for (let path in paths) {
      if (_.includes(this.blacklist, path)) {
        continue;
      }

      for (let method in paths[path]) {
        const pathInfo = paths[path][method];

        if (!pathInfo["responses"]["200"]) {
          continue;
        }

        this.generate(path, method, pathInfo, dirName); // "/ampi/login", "get", "参数信息"
      }
    }
  }

  async generate(path, method, pathInfo, dirName) {
    const outputPath = join(rootPath, this.outputPath, dirName, path);

    const {
      summary,
      responses: { 200: responseOK },
    } = pathInfo;

    try {
      // 生成目录
      await fs.mkdirp(outputPath);

      // mock 数据模版
      const example = responseOK["example"];

      // 生成文件内容
      const template = this.generateTemplate({
        summary,
        example,
        method,
        path,
      });

      // 生成文件, 已存在的跳过，避免覆盖本地以及编辑的文件
      const fPath = join(outputPath, `${method}.js`);

      await fs.writeFile(fPath, template, { flag: "wx" });

      console.log(`增加Mock文件：${fPath}`);
    } catch (e) {
      throw new Error(e);
    }
  }

  generateTemplate({ summary, example, method, path }) {
    // prettier-ignore
    // api path中的{petId}形式改为:petId
    return `/**
          * ${summary}
        **/
        const Mock = require("mockjs");
        module.exports = function (app) {
          app.${method}('${path.replace(/\{([^}]*)\}/g, ":$1")}', (req, res) => {
            res.json(Mock.mock(${example}));
          });
        };`;
  }

  removeRoute() {
    const routePath = path.join(rootPath, "mock/route");

    console.log(fs.existsSync(routePath));

    if (fs.existsSync(routePath)) {
      fs.removeSync(routePath);
    }
  }
}

const transfer = new Transfer([], "mock/route");
