// const swaggerConfig = require('./swaggerConfig');
const basicInfo = require("./basicInfo");
const servers = require("./servers");
const tags = require("./tag");
const user = require("./user");
const gameConfig = require("./gameConfig");
const gameVersion = require("./gameVersion");
const evolve = require("./evolve");
const equipment = require("./equipment");
const shop = require("./shop");
const engergy = require("./engergy");
const test = require("./test");
const gamePlay = require("./gamePlay");
const offlineEarning = require("./offlineEarning");
const gameEvent = require("./gameEvent");
const bag = require("./bag");
const gaia = require("./gaia");
const trials = require("./trials");
const iap = require("./iap");
const goldMine = require("./goldMine");
const gadget = require("./gadget");
const liveOps = require("./liveOps");
const abSegment = require("./abSegment");
const shopLiveOps = require("./shopLiveOps");
const campign = require("./campign");
const inbox = require("./inbox");
// const redeem = require("./redeem");

const allPaths = {
  ...user.paths,
  ...gameConfig.paths,
  ...gameVersion.paths,
  ...evolve.paths,
  ...equipment.paths,
  ...shop.paths,
  ...engergy.paths,
  ...test.paths,
  ...gamePlay.paths,
  ...offlineEarning.paths,
  ...gameEvent.paths,
  ...bag.paths,
  ...gaia.paths,
  ...trials.paths,
  ...trials.paths,
  ...iap.paths,
  ...goldMine.paths,
  ...gadget.paths,
  ...liveOps.paths,
  ...abSegment.paths,
  ...shopLiveOps.paths,
  ...campign.paths,
  ...inbox.paths,
  // ...redeem.paths,
};

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  paths: allPaths,
};
