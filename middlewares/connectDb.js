const mongoose = require("mongoose");
const { getDbUrl, databaseName, env } = require("@vars");

const log = (shouldLog, message) => (shouldLog ? console.log(message) : null);

const closeConnection = (shouldClose, shouldLog) => async () => {
  if (shouldClose && mongoose.connection.readyState !== 0) {
    log(shouldLog, "=> Closing database connection");
    await mongoose.connection.close();
  }
};

const connectDbMiddleware = ({
  connectionOpts = {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  },
  shouldClose = false,
  shouldLog = env !== "test",
}) => ({
  before: async () => {
    if (mongoose.connection.readyState === 1) {
      log(shouldLog, "=> Using existing database connection");
    } else {
      log(shouldLog, "=> Using new database connection");
      await mongoose.connect(getDbUrl(), connectionOpts);
    }
  },
  after: closeConnection(shouldClose, shouldLog),
  onError: async (handler) => {
    await closeConnection(shouldClose, shouldLog)();
    return handler.error;
  },
});

module.exports = () =>
  connectDbMiddleware({
    shouldClose: env !== "local",
  });
