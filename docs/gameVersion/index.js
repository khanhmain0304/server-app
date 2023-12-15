const gameMD5 = require("./gameMD5");
const gameVersion = require("./gameVersion");

module.exports = {
  paths: {
    "/api/v1/game_version/{client_id}": {
      ...gameVersion,
    },
    "/api/v1/game_md5/{client_id}": {
      ...gameMD5,
    },
  },
};
