require("../config/database")();

const EquipmentLvlUp = require("../models/equipmentLvlUp");

var crypto = require('crypto');

// meta
const equipment_lvl_up = require("../data/meta/equipment_lvl_up.json");

const deleteAllEquipmentLvlUp = async () => {
  await EquipmentLvlUp.deleteMany({});
  console.log("Done! deleteAllEquipmentLvlUp");
};

const addEquipmentLvlUp = async () => {
    
    for (let index in equipment_lvl_up) {
        let equip = equipment_lvl_up[index];

        await EquipmentLvlUp.create({
            ...equip
        });
    }

    

};

const main = async () => {
  await deleteAllEquipmentLvlUp();
  await addEquipmentLvlUp();


  console.log("Done!");
  process.exit(0);
};

main();
