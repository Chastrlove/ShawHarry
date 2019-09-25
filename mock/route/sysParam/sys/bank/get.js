/**
 * 银行列表查询
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/sys/bank", (req, res) => {
    res.json(
      Mock.mock([
        {
          pkey: "@string",
          pvalue: "@string",
          pdesc: "@string",
          ppvalue: "@string",
        },
      ]),
    );
  });
};
