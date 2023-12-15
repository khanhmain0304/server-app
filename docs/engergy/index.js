const energy = require("./energy");
const buy_energy_gem = require("./buy_energy_gem");
const buy_energy_ads = require("./buy_energy_ads");
const set_offline_energy_regen_date = require("./set_offline_energy_regen_date");

module.exports = {
  paths: {
    "/api/v1/energy": {
      ...energy,
    },
    "/api/v1/buy_energy_gem": {
      ...buy_energy_gem,
    },
    "/api/v1/buy_energy_ads": {
      ...buy_energy_ads,
    },
    "/api/v1/set_offline_energy_regen_date": {
      ...set_offline_energy_regen_date,
    },

  },
};
