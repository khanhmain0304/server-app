require("../config/database")();

const EquipmentMergeRule = require("../models/equipmentMergeRule");

var crypto = require('crypto');

// meta
const equipment_mere_rule = require("../data/meta/equipment_mere_rule.json");

const deleteAllequipmentMergeRule = async () => {
  await EquipmentMergeRule.deleteMany({});
  console.log("Done! deleteAllequipmentMergeRule");
};

const addequipmentMergeRule = async () => {
    
    for (let index in equipment_mere_rule) {
        let equip = equipment_mere_rule[index];

        await EquipmentMergeRule.create({
            ...equip
        });
    }

    

};

const main = async () => {
  await deleteAllequipmentMergeRule();
  await addequipmentMergeRule();


  console.log("Done!");
  process.exit(0);
};

main();
