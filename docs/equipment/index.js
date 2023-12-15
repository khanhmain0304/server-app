const add_equipment_test = require("./add_equipment_test");
const add_all_equipment_test = require("./add_all_equipment_test");
const add_design_test = require("./add_design_test");
const add_material_test = require("./add_material_test");
const equip_item = require("./equip_item");
const un_equip_item = require("./un_equip_item");
const equip_by_slot = require("./equip_by_slot");
const level_up_equipment = require("./level_up_equipment");
const level_up_max_equipment = require("./level_up_equipment");
const level_down_equipment = require("./level_down_equipment");
const merge_equipment = require("./merge_equipment");
const merge_all_equipment = require("./merge_all_equipment");
const downgrade_equipment = require("./downgrade_equipment");
const pre_downgrade_equipment = require("./pre_downgrade_equipment");


module.exports = {
  paths: {
    "/api/v1/add_equipment_test": {
      ...add_equipment_test,
    },
    "/api/v1/add_all_equipment_test": {
      ...add_all_equipment_test,
    },
    "/api/v1/add_design_test": {
      ...add_design_test,
    },
    "/api/v1/add_material_test": {
      ...add_material_test,
    },
    "/api/v1/equip_item": {
      ...equip_item,
    },
    "/api/v1/un_equip_item": {
      ...un_equip_item,
    },
    "/api/v1/equip_by_slot": {
      ...equip_by_slot,
    },
    "/api/v1/level_up_equipment": {
      ...level_up_equipment,
    },
    "/api/v1/level_up_max_equipment": {
      ...level_up_max_equipment,
    },
    "/api/v1/level_down_equipment": {
      ...level_down_equipment,
    },
    "/api/v1/merge_equipment": {
      ...merge_equipment,
    },
    "/api/v1/merge_all_equipment": {
      ...merge_all_equipment,
    },
    "/api/v1/downgrade_equipment": {
      ...downgrade_equipment,
    },
    "/api/v1/pre_downgrade_equipment": {
      ...pre_downgrade_equipment,
    },
  },
};
