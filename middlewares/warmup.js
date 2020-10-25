const warmup = require("@middy/warmup");

const onWarmup = (event) => console.log("Lambda warming up", event);

module.exports = () =>
  warmup({
    onWarmup,
  });
