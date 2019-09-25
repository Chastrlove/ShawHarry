/**
 * 管理用户列表
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/user/list", (req, res) => {
    res.json(
      Mock.mock([
        {
          id: "@integer(60, 100)",
          realName: "@string",
          username: "@string",
          mobile: "@string",
          currentCorpCode: "@string",
          currentCorpName: "@string",
          currentCorpType: 1,
          status: 1,
          roles: ["@integer(60, 100)"],
        },
      ]),
    );
  });
};
