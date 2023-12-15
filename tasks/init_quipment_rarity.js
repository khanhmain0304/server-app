require("../config/database")();

const EquipmentRarity = require("../models/equipmentRarity");

var crypto = require('crypto');

// meta
const equipment_rarity = require("../data/meta/equipment_rarity.json");

const deleteAllEquipmentRarity = async () => {
  await EquipmentRarity.deleteMany({});
  console.log("Done! deleteAllEquipmentRarity");
};

const addEquipmentRarity = async () => {
    
    for (let index in equipment_rarity) {
        let equip = equipment_rarity[index];

        const capitalizedType =  equip.type.charAt(0).toUpperCase()  + equip.type.slice(1)
        equip.type = capitalizedType;
        await EquipmentRarity.create({
            ...equip
        });
    }

    

};

const main = async () => {
  await deleteAllEquipmentRarity();
  await addEquipmentRarity();


  console.log("Done!");
  process.exit(0);
};

main();
