require("../config/database")();

const IAP = require("../models/iap");
const User = require("../models/user");

var crypto = require("crypto");

let defaultPriceDict = {
  "com.nmg.survivalhero.stage.pack.1": 1.99,
  "com.nmg.survivalhero.stage.pack.2": 2.99,
  "com.nmg.survivalhero.stage.pack.3": 2.99,
  "com.nmg.survivalhero.first.time": 0,
  "com.nmg.survivalhero.monthly.card": 4.99,
  "com.nmg.survivalhero.monthly.card.2": 9.99,
  "com.nmg.survivalhero.growth.fundpremium": 6.99,
  "com.nmg.survivalhero.growth.fundsuper": 19.99,
  "com.nmg.survivalhero.starter.pack": 0.99,
  "com.nmg.survivalhero.gem.pack.1": 0.99,
  "com.nmg.survivalhero.gem.pack.2": 4.99,
  "com.nmg.survivalhero.gem.pack.3": 9.99,
  "com.nmg.survivalhero.gem.pack.4": 19.99,
  "com.nmg.survivalhero.gem.pack.5": 49.99,
  "com.nmg.survivalhero.gem.pack.6": 99.99,
  "com.nmg.survivalhero.piggy.bank.s": 0.99,
  "com.nmg.survivalhero.piggy.bank.m": 4.99,
  "com.nmg.survivalhero.piggy.bank.l": 9.99,
  "com.nmg.survivalhero.piggy.bank.xl": 19.99,
  "com.nmg.survivalhero.daily.pack.1": 0.39,
  "com.nmg.survivalhero.daily.pack.2": 0.99,
  "com.nmg.survivalhero.daily.pack.3": 7.99,
  "com.nmg.survivalhero.weekly.pack.1": 1.99,
  "com.nmg.survivalhero.weekly.pack.2": 3.99,
  "com.nmg.survivalhero.weekly.pack.3": 7.99,
  "com.nmg.survivalhero.weekly.pack.4": 14.99,
  "com.nmg.survivalhero.monthly.pack.1": 7.99,
  "com.nmg.survivalhero.monthly.pack.2": 14.99,
  "com.nmg.survivalhero.monthly.pack.3": 29.99,
  "com.nmg.survivalhero.stage.pack.4": 4.99,
  "com.nmg.survivalhero.stage.pack.5": 4.99,
  "com.nmg.survivalhero.stage.pack.6": 7.99,
  "com.nmg.survivalhero.stage.pack.7": 7.99,
  "com.nmg.survivalhero.stage.pack.8": 9.99,
  "com.nmg.survivalhero.stage.pack.9": 9.99,
  "com.nmg.survivalhero.stage.pack.10": 14.99,
  "com.nmg.survivalhero.value.combat.pack": 0.99,
  "com.nmg.survivalhero.value.combat.pack.small.3000170": 0.99,
  "com.nmg.survivalhero.value.combat.pack.medium.3000171": 4.99,
  "com.nmg.survivalhero.value.combat.pack.big.3000172": 9.99,
  "com.nmg.survivalhero.value.equipment.pack": 7.99,
  "com.nmg.survivalhero.value.adventure.pack": 4.99,
  "com.nmg.survivalhero.mega.reward.event.3000200": 9.99,
  "com.nmg.survivalhero.event.shop.pack.1.3000201": 4.99,
  "com.nmg.survivalhero.event.shop.pack.2.3000202": 9.99,
  "com.nmg.survivalhero.event.shop.pack.3.3000203": 19.99,
  "com.nmg.survivalhero.event.shop.pack.4.3000204": 49.99,
  "com.nmg.survivalhero.event.shop.pack.5.3000206": 4.99,
  "com.nmg.survivalhero.event.shop.pack.6.3000207": 4.99,
  "com.nmg.survivalhero.event.shop.pack.7.3000208": 19.99,
  "com.nmg.survivalhero.event.shop.pack.8.3000209": 19.99,
  "com.nmg.survivalhero.event.shop.pack.9.3000211": 1.99,
  "com.nmg.survivalhero.event.shop.pack.10.3000212": 4.99,
  "com.nmg.survivalhero.event.shop.pack.11.3000213": 9.99,
  "com.nmg.survivalhero.event.shop.pack.12.3000214": 19.99,
  "com.nmg.survivalhero.pack.blue.revolver": 0.99,
  "com.nmg.survivalhero.pack.purple.gauntlet": 3.99,
  "com.nmg.survivalhero.pack.outofgold": 0.99,
  "com.nmg.survivalhero.pack.needmoreupgrade": 0.99,
  "com.nmg.survivalhero.kickstart.pack.299.3000219": 2.99,
  "com.nmg.survivalhero.kickstart.pack.499.3000220": 4.99,
  "com.nmg.survivalhero.kickstart.shop.3000221": 2.99,
  "com.nmg.survivalhero.starter.pack.3000222": 2.99,
  "com.nmg.survivalhero.stage.pack.1.3000223": 2.99,
  "com.nmg.survivalhero.monthly.card.3000224": 9.99,
  "com.nmg.survivalhero.monthly.card.2.3000225": 19.99,
  "com.nmg.survivalhero.excellent.quality.small.3000180": 7.99,
  "com.nmg.survivalhero.excellent.quality.medium.3000181": 9.99,
  "com.nmg.survivalhero.epic.quality.3000182": 19.99,
};

const resetIAPMaxSpend = async () => {
  await User.updateMany({}, { iap_max_spend: 0 });
};

const updateIAPMaxSpend = async () => {
  let total = 0;
  let verifiedIAP = await IAP.find({ status: 3 });

  let updateArr = [];

  for (const record of verifiedIAP) {
    let default_price = defaultPriceDict[record.gaia.result.productId];

    default_price = default_price && default_price > 0 ? default_price : 0;

    if (default_price == 0) {
      console.log("NOT FOUND:", record.gaia.result.productId);
    }

    if (updateArr[record.user_id]) {
      if (updateArr[record.user_id] < default_price) {
        updateArr[record.user_id] = default_price;
      }
    } else {
      updateArr[record.user_id] = default_price;
    }

    console.log(record.user_id, default_price, record.gaia.result.productId);
    // total += default_price;
  }

  for (const key in updateArr) {
    await User.findByIdAndUpdate(key, { iap_max_spend: updateArr[key] });

    console.log(key, updateArr[key]);
  }

  // console.log("total", total);
};

const main = async () => {
  await resetIAPMaxSpend();
  await updateIAPMaxSpend();

  console.log("Done!");
  process.exit(0);
};

main();
