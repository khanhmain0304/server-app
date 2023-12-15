const getInbox = require("./getInbox");
const claimReward = require("./claimReward");
const remove = require("./remove");
const removeAll = require("./removeAll");

module.exports = {
  paths: {
    "/api/v1/inbox": {
      ...getInbox,
    },
    "/api/v1/inbox/{id}": {
      ...claimReward,
    },
    "/api/v1/remove_inbox/{id}": {
      ...remove,
    },
    "/api/v1/remove_all_inbox": {
      ...removeAll,
    },
  },
};
