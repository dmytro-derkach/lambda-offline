const AWS = require("aws-sdk");
const { region } = require("@vars");

const BATCH_COUNT = 10;

let sqs = new AWS.SQS({ region: region });

const sendMessageToSQS = async (queueUrl, message) => {
  const messageObject = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  };
  console.log("Send message to sqs", messageObject.MessageBody);
  // Send the order data to the SQS queue
  return await sqs.sendMessage(messageObject).promise();
};

const sendMessagesToSQS = async (queueUrl, messages) => {
  for (let i = 0; i < messages.length; i += BATCH_COUNT) {
    const slicedMessages = messages.slice(i, i + BATCH_COUNT);
    const messageGroup = slicedMessages.map((message, i) => {
      return {
        Id: `pos_${i}`,
        MessageBody: JSON.stringify(message),
      };
    });

    console.log("Send messages to sqs", messageGroup);

    const params = {
      Entries: messageGroup,
      QueueUrl: queueUrl,
    };
    // Send the order data to the SQS queue
    await sqs.sendMessageBatch(params).promise();
  }
};

module.exports = {
  sendMessageToSQS,
  sendMessagesToSQS,
};
