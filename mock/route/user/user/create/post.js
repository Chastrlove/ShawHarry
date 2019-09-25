/**
 * 用户管理-添加用户
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.post("/user/create", (req, res) => {
    res.json(Mock.mock("@integer(60, 100)"));
  });
};
