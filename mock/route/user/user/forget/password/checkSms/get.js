/**
 * checkForgetPwdSmsCode
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/user/forget/password/checkSms", (req, res) => {
    res.json(Mock.mock("@boolean"));
  });
};
