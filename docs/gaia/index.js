const gaia_validate_iap = require("./gaia_validate_iap");

module.exports = {
  paths: {
    "/api/v1/gaia_validate_iap": {
      ...gaia_validate_iap,
    }
  },
};
