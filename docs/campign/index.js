const campaign = require("./campaign");
const set_template_expire = require("./set_template_expire");

module.exports = {
  paths: {
    "/api/v1/campaign": {
      ...campaign,
    },
    "/api/v1/set_template_expire": {
      ...set_template_expire,
    },

  },
};
