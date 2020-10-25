const { env } = require("@vars");

const normalizedResponse = () => {
  return {
    after: (handler, next) => {
      const { body, headers, ...other } = handler.response;
      handler.response = {
        ...other,
        body: JSON.stringify(body),
        headers: {
          ...headers,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      next();
    },

    onError: async (handler) => {
      const { error } = handler;
      let response;
      if (typeof error.statusCode === "number") {
        response = {
          body: JSON.stringify({
            message: error.message,
            statusCode: error.statusCode,
          }),
          statusCode: error.statusCode,
        };
      } else {
        response = {
          body: JSON.stringify({
            message: "Internal server error!",
            statusCode: 500,
          }),
          statusCode: 500,
        };
      }
      handler.response = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        ...response,
      };
      if (env !== "test") {
        console.error(error);
      }
    },
  };
};

module.exports = normalizedResponse;
