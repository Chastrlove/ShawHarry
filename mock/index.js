const express = require("express");
const generateRouter = require("./generateRouter");
const cors = require("./middleware/cors");
const bodyParser = require("./middleware/body-parser");
const delayRes = require("./middleware/delayRes");
const successRate = require("./middleware/successRate");

const app = express();

app.use(cors());
app.use(bodyParser());

app.listen(4000, function() {
  console.log(`server is listening ${4000}`);
});

// 路由
generateRouter(app);
