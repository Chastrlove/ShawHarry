/**
 * 地区列表查询
 **/
const Mock = require("mockjs");
module.exports = function(app) {
  app.get("/sys/area", (req, res) => {
    /*res.json(
      Mock.mock([
        {
          pkey: "@string",
          pvalue: "@string",
          pdesc: "@string",
          ppvalue: "@string",
        },
      ]),
    );*/
    res
      .status(599)
      .json({
        errorMessage: 599,
      })
      .end();
  });
};
