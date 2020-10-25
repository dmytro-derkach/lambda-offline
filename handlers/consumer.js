require("module-alias/register");
const middy = require("@middy/core");
const warmup = require("@middlewares/warmup");
const loadSSM = require("@middlewares/loadSSM");
const connectDb = require("@middlewares/connectDb");
const validator = require("@validators/consumer");
const sqsJsonBodyParser = require("@middy/sqs-json-body-parser");

const processHandler = async (event) => {
  const payload = event.Records[0].body;
  console.log("payload", payload);
  return {};
};

const handler = middy(processHandler)
  .use(warmup())
  .use(loadSSM())
  .use(connectDb())
  .use(sqsJsonBodyParser())
  .use(validator());

module.exports = { handler };
