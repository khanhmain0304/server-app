const User = require("../models/user");

const Types = require("../config/types");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const addDesigns = async (designs, user) => {
  // if (!user) {
  //   return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_UPDATE_USER, Message.USER_NOT_FOUND);
  // }

  let target;

  for (const item of designs) {
    switch (item.item_type) {
      case Types.Item.WEAPON:
        user.equipment.designs.id(Types.ItemID.WEAPON_DESIGN).quantity += item.value;
        break;
      case Types.Item.NECKLACE:
        user.equipment.designs.id(Types.ItemID.NECKLACE_DESIGN).quantity += item.value;
        break;
      case Types.Item.GLOVES:
        user.equipment.designs.id(Types.ItemID.GLOVES_DESIGN).quantity += item.value;
        break;
      case Types.Item.ARMOR:
        user.equipment.designs.id(Types.ItemID.ARMOR_DESIGN).quantity += item.value;
        break;
      case Types.Item.BELT:
        user.equipment.designs.id(Types.ItemID.BELT_DESIGN).quantity += item.value;
        break;
      case Types.Item.SHOES:
        user.equipment.designs.id(Types.ItemID.SHOES_DESIGN).quantity += item.value;
        break;
      default:
        break;
    }
  }

  user.markModified("equipment.designs");
};

module.exports = { addDesigns };
