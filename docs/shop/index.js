const shop = require("./getAll");
const buyItem = require("./buyItem");
const firstIAP = require("./firstIAP");

module.exports = {
  paths: {
    "/api/v1/shop": {
      ...shop,
    },
    "/api/v1/shop/{group_id}/{pack_id}": {
      ...buyItem,
    },
    "/api/v1/first-iap": {
      ...firstIAP,
    },
  },
};
