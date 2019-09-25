/**
 * 用户授权
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.post("/user/resource", (req, res) => {
    res.json(Mock.mock(undefined));
  });
};
