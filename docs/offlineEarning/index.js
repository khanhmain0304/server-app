const offlineEarning = require("./offlineEarning");
const quickOfflineEarning = require("./quickOfflineEarning");

module.exports = {
  paths: {
    "/api/v1/offlineEarning": {
      ...offlineEarning,
    },
    "/api/v1/quickOfflineEarning": {
      ...quickOfflineEarning,
    },
  },
};