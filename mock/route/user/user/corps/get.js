/**
 * 用户所在企业列表
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/user/corps", (req, res) => {
    res.json(Mock.mock([null]));
  });
};
