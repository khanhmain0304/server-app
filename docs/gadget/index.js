const add_gadget_test = require("./add_gadget_test");
const get_gadget = require("./get_gadget");
const get_all_gadget = require("./get_all_gadget");
const equip_gadget = require("./equip_gadget");
const equip_by_slot_gadget = require("./equip_by_slot_gadget");
const un_equip_gadget = require("./un_equip_gadget");
const merge_gadget = require("./merge_gadget");
const merge_all_gadget = require("./merge_all_gadget");

module.exports = {
  paths: {
    "/api/v1/add_gadget_test": {
      ...add_gadget_test,
    },
    "/api/v1/gadget": {
      ...get_gadget,
    },
    "/api/v1/gadgets": {
      ...get_all_gadget,
    },
    "/api/v1/add_gadget_test": {
      ...add_gadget_test,
    },
    "/api/v1/equip_gadget": {
      ...equip_gadget,
    },
    "/api/v1/equip_by_slot_gadget": {
      ...equip_by_slot_gadget,
    },
    "/api/v1/un_equip_gadget": {
      ...un_equip_gadget,
    },
    "/api/v1/merge_gadget": {
      ...merge_gadget,
    },
    "/api/v1/merge_all_gadget": {
      ...merge_all_gadget,
    },
  },
};
