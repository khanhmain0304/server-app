require("../config/database")();
const { ShopLiveOps } = require("../models/shopLiveOps");

let shop_live_ops = require("../data/event/shop_live_ops.json");

const deleteAllGameEvent = async () => {
  await ShopLiveOps.deleteMany({});
  console.log("Done! deleteAllShopLiveOps");
};

const addShopLiveOps = async () => {
  for (const shop of shop_live_ops.shop_live_ops) {
    await ShopLiveOps.create({ ...shop }); 
  }
};

const main = async () => {
  await deleteAllGameEvent();
  await addShopLiveOps();

  console.log("Done!");
  process.exit(0);
};

main();
