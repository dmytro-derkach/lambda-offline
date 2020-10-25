const getDbUrl = () => process.env.MONGODB_URI || process.env.APP_MONGODB_URI;

module.exports = {
  getDbUrl,
  databaseName: process.env.DATABASE_NAME,
  consumerQueue: process.env.CONSUMER_QUEUE_URL,
  env: process.env.ENV,
};
