require("../config/database")();
const fs = require("fs");
const account_level = require("../data/meta/player_account_level_from_excel.json");
const Types = require("../config/types");

const main = async () => {
  let outputs = [];

  for (let element of account_level) {
    let reward = [];

    if (element.gem_gained > 0) {
      reward.push({
        type: Types.Stat.GEM,
        value: element.gem_gained,
      });
    }
    if (element.energy_gained > 0) {
      reward.push({
        type: Types.Stat.ENERGY,
        value: element.energy_gained,
      });
    }

    outputs.push({
      account_level: element.account_level,
      exp_required: element.exp_required,
      reward,
    });
  }

  fs.writeFileSync("./data/meta/player_account_level.json", JSON.stringify(outputs));

  console.log("Done!");
  process.exit(0);
};

main();
