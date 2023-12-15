require("../config/database")();

var crypto = require("crypto");

// meta
const gadget_rarity = require("../data/meta/gadget_rarity.json");
const gadget_info = require("../data/meta/gadget_info_raw.json");
const { GadgetInfo } = require("../models/gadget");
const Types = require("../config/types");

const deleteAllGadget = async () => {
  await GadgetInfo.deleteMany({});
  console.log("Done! deleteAllGadget");
};

const addGadget = async () => {
  let add_gadget = [];

  for (let rarity of gadget_rarity) {
    for (const gadget of gadget_info) {
      const bonus_stats_atk = rarity.bonus_stats_atk;
      const bonus_stats_hp = rarity.bonus_stats_hp;

      let item_effect_bonus = [];
      if (gadget.type == rarity.type) {
        if (gadget.effect_bonus.find((x) => x.rarity == rarity.rarity)) {
          item_effect_bonus.push(gadget.effect_bonus.find((x) => x.rarity == rarity.rarity));
        }

        add_gadget.push({
          content: Types.Content.GADGET,
          item_id: gadget.id,
          item_name: gadget.name,
          item_type: gadget.type,
          item_description: gadget.description,
          item_relate_skill: gadget.related_skill,
          item_current_rarity: rarity.rarity,
          item_bonus_hp: bonus_stats_hp,
          item_bonus_atk: bonus_stats_atk,
          item_effect: [gadget.effect_1, gadget.effect_2, gadget.effect_3, gadget.effect_4],
          item_effect_bonus,
        });
      }
    }
  }

  await GadgetInfo.insertMany(add_gadget);
};

const main = async () => {
  await deleteAllGadget();
  await addGadget();

  console.log("Done!");
  process.exit(0);
};

main();
