const validator = require("@middy/validator");

const inputSchema = {
  type: "object",
  properties: {
    Records: {
      type: "array",
      contains: {
        type: "object",
        properties: {
          body: {
            type: "object",
            properties: {
              test: { type: "string" },
            },
            required: ["test"],
          },
        },
        required: ["body"],
      },
      minItems: 1,
    },
  },
  required: ["Records"],
};

module.exports = () => validator({ inputSchema });
