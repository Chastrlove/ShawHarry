/**
 * 企业用户状态变更
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.put("/user/status", (req, res) => {
    res.json(Mock.mock(1));
  });
};
