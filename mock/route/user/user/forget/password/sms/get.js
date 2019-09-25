/**
 * sendForgetPasswordSms
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/user/forget/password/sms", (req, res) => {
    res.json(Mock.mock(undefined));
  });
};
