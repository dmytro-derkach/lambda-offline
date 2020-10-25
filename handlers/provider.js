require("module-alias/register");
const middy = require("@middy/core");
const loadSSM = require("@middlewares/loadSSM");
const connectDb = require("@middlewares/connectDb");
const { sendMessageToSQS } = require("@services/queue");

const queueUrl = process.env.CONSUMER_QUEUE_URL;

const processHandler = async () => {
  console.log("Start provider");
  await sendMessageToSQS(queueUrl, {
    test: "Hello from provider",
  });
  return {};
};

const handler = middy(processHandler).use(loadSSM()).use(connectDb());

module.exports = { handler };
