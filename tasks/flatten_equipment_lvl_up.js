require("../config/database")();
const fs = require("fs");
const equipments = require("../data/meta/equipment_lvl_up_from_excel.json");
const Types = require("../config/types");

const main = async () => {
  let outputs = [];

  //   console.log(equipments[1]);

  for (let index = 0; index < equipments.length; index++) {
    let equip = equipments[index];
    let equip_next = {};

    // console.log(equipments.length);
    console.log(index);

    // LVL UP
    let level_up_price = [];
    if (index < equipments.length - 1) {
      equip_next = equipments[index + 1];
      //   console.log(equip_next);
      if (equip_next.gold_cost > 0) {
        level_up_price.push({
          type: Types.Stat.GOLD,
          value: equip_next.gold_cost,
        });
      }

      if (equip_next.design_cost > 0) {
        level_up_price.push({
          type: Types.Stat.DESIGN,
          value: equip_next.design_cost,
        });
      }
    }

    // LVL DOWN
    let level_down_reward = [];

    if (equip.level_down_reward_gold > 0) {
      level_down_reward.push({
        type: Types.Stat.GOLD,
        value: equip.level_down_reward_gold,
      });
    }

    if (equip.level_down_reward_design > 0) {
      level_down_reward.push({
        type: Types.Stat.DESIGN,
        value: equip.level_down_reward_design,
      });
    }

    // console.log(equip);
    let temp = {};

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_normal_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_good_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_better_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_excellent_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_excellent1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_excellent2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_epic_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_epic1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_epic2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_epic3_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.WEAPON;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.weapon_legendary_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_normal_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_good_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_better_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_excellent_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_excellent1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_excellent2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_epic_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_epic1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_epic2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_epic3_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.NECKLACE;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.necklace_legendary_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_normal_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_good_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_better_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_excellent_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_excellent1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_excellent2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_epic_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_epic1_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_epic2_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_epic3_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.GLOVES;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.ATK,
        value: equip.gloves_legendary_atk,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_normal_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_good_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_better_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_excellent_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_excellent1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_excellent2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_epic_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_epic1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_epic2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_epic3_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.ARMOR;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.armor_legendary_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_normal_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_good_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_better_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_excellent_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_excellent1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_excellent2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_epic_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_epic1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_epic2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_epic3_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.BELT;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.belt_legendary_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //=====================================================================
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 1;
    temp.min_level = 1;
    temp.max_level = 10;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_normal_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 2;
    temp.min_level = 1;
    temp.max_level = 20;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_good_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 3;
    temp.min_level = 1;
    temp.max_level = 30;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_better_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 4;
    temp.min_level = 1;
    temp.max_level = 50;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_excellent_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 5;
    temp.min_level = 1;
    temp.max_level = 60;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_excellent1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 6;
    temp.min_level = 1;
    temp.max_level = 70;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_excellent2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 7;
    temp.min_level = 1;
    temp.max_level = 80;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_epic_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 8;
    temp.min_level = 1;
    temp.max_level = 90;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_epic1_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 9;
    temp.min_level = 1;
    temp.max_level = 100;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_epic2_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 10;
    temp.min_level = 1;
    temp.max_level = 110;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_epic3_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------

    //----------------
    temp = {};

    temp.level = equip.level;
    temp.gold_cost = equip.gold_cost;
    temp.design_cost = equip.design_cost;
    temp.type = Types.Item.SHOES;
    temp.rarity = 11;
    temp.min_level = 1;
    temp.max_level = 120;
    temp.level_bonus = [
      {
        type: Types.Stat.HP,
        value: equip.shoes_legendary_hp,
      },
    ];

    if (temp.level_bonus[0].value >= 0) {
      if (temp.level_bonus[0].value == 0) {
        temp.level_bonus = [];
      }

      outputs.push({
        ...temp,
        level_up_price,
        level_down_reward,
      });
    }
    //----------------
  }

  //   console.log(outputs);

  fs.writeFileSync("./data/meta/equipment_lvl_up.json", JSON.stringify(outputs));

  console.log("Done!");
  process.exit(0);
};

main();
