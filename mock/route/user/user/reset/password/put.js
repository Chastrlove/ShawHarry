/**
 * 密码重置
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.put("/user/reset/password", (req, res) => {
    res.json(Mock.mock("@boolean"));
  });
};
