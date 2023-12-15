const User = require("../models/user");

const checkGuarantee = (random_item, user, s_items) => {
  // CASE OPEN GET EXCELLENT ITEM
  if (random_item.item_current_rarity == 4) {
    // CASE GET S ITEM
    if (s_items.some((item) => item.item_id == random_item.item_id)) {
      console.log("Get S Item");
      user.$set("crate_record.guarantee_item_s_crate", 10);
      user.$set("crate_record.guarantee_s_item", 50);
    } else {
      // CASE GET EXCELLENT ITEM
      console.log("Get Excellent Item");

      user.$set("crate_record.guarantee_item_s_crate", 10);
      user.crate_record.guarantee_s_item -= 1;
    }
  } else {
    user.crate_record.guarantee_item_s_crate -= 1;
    user.crate_record.guarantee_s_item -= 1;
  }
};

module.exports = { checkGuarantee };
