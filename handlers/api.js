require("module-alias/register");
const middy = require("@middy/core");
const cors = require("@middy/http-cors");
const normalizedResponse = require("@middlewares/normalizedResponse");
const warmup = require("@middlewares/warmup");

const processHandler = async () => {
  return {
    statusCode: 200,
    body: { hello: "world" },
  };
};

const handler = middy(processHandler)
  .use(warmup())
  .use(normalizedResponse())
  .use(cors());

module.exports = { handler };
