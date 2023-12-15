const shopLiveOps = require("./shopLiveOps");

module.exports = {
  paths: {
    "/api/v1/shop_live_ops": {
      ...shopLiveOps,
    },
  },
};
