const Types = require("../config/types");
const GameConfig = require("../models/gameConfig");
const { alternateGameConfig } = require("./alternate_config");

const weightedRandom = (items, weights) => {
  if (items.length !== weights.length) {
    throw new Error("Items and weights must be of the same size");
  }

  if (!items.length) {
    throw new Error("Items must not be empty");
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [10, 20, 30, 40, 50, 60]
  // - maxCumulativeWeight = 210
  // - range for the random number is [0...210]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let i = 0; i < items.length; i++) {
    if (cumulativeWeights[i] >= randomNumber) {
      return items[i];
    }
  }
};

const randomDesigns = async (amount) => {
  let item_config = await GameConfig.findOne({
    name: "item_config",
    version: "default",
  }).exec();

  if (!item_config) {
    item_config = await alternateGameConfig("item_config");
  }

  const designs_splice = item_config.config.filter((item) => item.content == Types.Stat.DESIGN && item.item_name != "Random Scroll");

  const designsWeight_splice = [10, 10, 10, 10, 10, 10];

  const designs = item_config.config.filter((item) => item.content == Types.Stat.DESIGN && item.item_name != "Random Scroll");
  const designsWeight = [10, 10, 10, 10, 10, 10];

  const random_designs = [];

  if (amount <= 6) {
    for (let i = 0; i < amount; i++) {
      const random_design = weightedRandom(designs_splice, designsWeight_splice);
      designs_splice.splice(designs_splice.indexOf(random_design), 1);
      designsWeight_splice.splice(designs_splice.indexOf(random_design), 1);
      random_designs.push({
        ...random_design,
        value: 1,
      });
    }
  } else {
    let amountRandomList = [];
    let amountRandomWeight = [];
    let rest_random = amount;

    const minimum_amount = Math.floor((amount / designs.length) * 0.6) == 0 ? 1 : Math.floor((amount / designs.length) * 0.6);
    const maximum_amount = Math.floor(amount / designs.length);

    // Devide first time
    for (let i = minimum_amount; i <= maximum_amount; i++) {
      amountRandomList.push(i);
      amountRandomWeight.push(10);
    }

    for (let i = 0; i < designs.length; i++) {
      const random_design = weightedRandom(designs_splice, designsWeight_splice);
      designs_splice.splice(designs_splice.indexOf(random_design), 1);
      designsWeight_splice.splice(designs_splice.indexOf(random_design), 1);
      const amount_random = weightedRandom(amountRandomList, amountRandomWeight);
      rest_random -= amount_random;
      random_designs.push({
        ...random_design,
        value: amount_random,
      });
    }

    // Devide second time
    const amount_second_time = Math.floor(rest_random / designs.length);

    const surplus = rest_random - amount_second_time * designs.length;

    const final_random = weightedRandom(designs, designsWeight);

    random_designs.forEach((element) => {
      element.value += amount_second_time;
      if (element.item_type == final_random.item_type) element.value += surplus;
    });
  }

  return random_designs;
};

module.exports = { weightedRandom, randomDesigns };
