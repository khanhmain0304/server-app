require("../config/database")();

const Campaign = require("../models/campaign");
const Counter = require("../models/counter");

const SEGMENT_ID = "default";

// const deleteDefaultABSegment = async () => {
//   await ABSegment.deleteMany({ segment_id: SEGMENT_ID });
//   console.log("Done! deleteDefaultABSegment");
// };

const addDefaultCampaign = async () => {
  let id = await Counter.getNextValue("campaigns_count");
  await Campaign.create({
    id,
    name: "test campaign name ",
    description: "test campaign description",

    iap_pack: [
      {
        id: 3000218,
        name:"Need More Upgrade",
        price: {
          value: 2.99,
          price_type: "IAP"
        },
        original_price: 29.9,
        discount_percentage: 90,
        sku: "com.nmg.survivalhero.pack.0.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10000,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 50,
          },
        ],
      }
    ],
    
    appear: ["A", "B"],
    trigger_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],
    trigger_rule: "AND",
    repop_mainmenu: false,
    campaign_status: true,
    repeat_times: 0,
    start: 1698655313,
    end: 1701308510,
    timer: 86400,
    buy_chances: 3,
    order: 1000,
    // repeat: true,
    // repeat_times: 86400,
    // repeat_cooldown: 10000,

    repeat_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],

    
    restriction: [{
      type: 1001,
      operation: ">=",
      value: 2
    }],
    restriction_tag: [],
    asset: [
      {
        type: 1,
        width: 100,
        height: 200,
        online: false,
        value: "bg.png",
      }
    ],
    template: 1,
  });
  id = await Counter.getNextValue("campaigns_count");
  await Campaign.create({
    id,
    name: "test campaign name 2 ",
    description: "test campaign description 2",

    iap_pack: [
      {
        id: 3000218,
        name:"Need More Upgrade 2",
        price: {
          value: 2.99,
          price_type: "IAP"
        },
        original_price: 29.9,
        discount_percentage: 90,
        sku: "com.nmg.survivalhero.pack.1.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10000,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 50,
          },
        ],
      }
    ],
    
    appear: ["A", "B"],
    trigger_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],
    trigger_rule: "AND",
    repop_mainmenu: false,
    campaign_status: true,
    repeat_times: 0,
    start: 1698655313,
    end: 1701308510,
    timer: 86400,
    buy_chances: 3,
    order: 1000,
    // repeat: true,
    // repeat_times: 86400,
    // repeat_cooldown: 10000,

    repeat_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],

    
    restriction: [{
      type: 1001,
      operation: ">=",
      value: 2
    }],
    restriction_tag: [],
    asset: [
      {
        type: 1,
        width: 100,
        height: 200,
        online: false,
        value: "bg.png",
      }
    ],
    template: 2,
  });

  id = await Counter.getNextValue("campaigns_count");
  await Campaign.create({
    id,
    name: "test campaign name 3 ",
    description: "test campaign description 3",

    iap_pack: [
      {
        id: 3000218,
        name:"Need More Upgrade 2",
        price: {
          value: 2.99,
          price_type: "IAP"
        },
        original_price: 29.9,
        discount_percentage: 90,
        sku: "com.nmg.survivalhero.pack.2.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10000,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 50,
          },
        ],
      },
      {
        id: 3000999,
        name:"Free",
        price: {
          value: 0,
          price_type: "Free"
        },
        original_price: 0,
        discount_percentage: 0,
        sku: "com.nmg.survivalhero.pack.free",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 15,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 51,
          },
        ],
      },
      {
        id: 3000999,
        name:"Free",
        price: {
          value: 0,
          price_type: "Free"
        },
        original_price: 0,
        discount_percentage: 0,
        sku: "com.nmg.survivalhero.pack.free",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 52,
          },
        ],
      }
    ],
    
    appear: ["A", "B"],
    trigger_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],
    trigger_rule: "AND",
    repop_mainmenu: false,
    campaign_status: true,
    repeat_times: 0,
    start: 1698655313,
    end: 1701308510,
    timer: 86400,
    buy_chances: 3,
    order: 1000,
    // repeat: true,
    // repeat_times: 86400,
    // repeat_cooldown: 10000,

    repeat_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],

    
    restriction: [{
      type: 1001,
      operation: ">=",
      value: 2
    }],
    restriction_tag: [],
    asset: [
      {
        type: 1,
        width: 100,
        height: 200,
        online: false,
        value: "bg.png",
      }
    ],
    template: 3,
  });
  id = await Counter.getNextValue("campaigns_count");
  await Campaign.create({
    id,
    name: "test campaign name 4 ",
    description: "test campaign description 4",

    iap_pack: [
      {
        id: 3000218,
        name:"Need More Upgrade 4",
        price: {
          value: 2.99,
          price_type: "IAP"
        },
        original_price: 29.9,
        discount_percentage: 90,
        sku: "com.nmg.survivalhero.pack.3.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10000,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 50,
          },
        ],
      },
      {
        id: 300000403,
        name:"Endless Goodies 1",
        price: {
          value: 0.99,
          price_type: "IAP"
        },
        original_price: 0.99,
        discount_percentage: 0,
        sku: "com.nmg.survivalhero.pack.4.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10004,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 56,
          },
        ],
      },
      {
        id: 3000201,
        name:"Event Shop Pack 1",
        price: {
          value: 9.99,
          price_type: "IAP"
        },
        original_price: 99.9,
        discount_percentage: 90,
        sku: "com.nmg.survivalhero.pack.5.99",
        item_list: [
          {
            content: "Gold",
            item_id: 2400003,
            item_name: "Gold",
            item_type: "Gold",
            item_description: "Gold",
            item_current_rarity: 3,
            display_in_bag: false,
            value: 10003,
          },
          {
            content: "Gem",
            item_id: 2400002,
            item_name: "Gem",
            item_type: "Gem",
            item_description: "Gem",
            item_current_rarity: 4,
            display_in_bag: false,
            value: 53,
          },
        ],
      }
    ],
    
    appear: ["A", "B"],
    trigger_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],
    trigger_rule: "AND",
    repop_mainmenu: false,
    campaign_status: true,
    repeat_times: 0,
    start: 1698655313,
    end: 1701308510,
    timer: 86400,
    buy_chances: 3,
    order: 1000,
    // repeat: true,
    // repeat_times: 86400,
    // repeat_cooldown: 10000,

    repeat_condition: [
      {
        condition_type: 1,
        condition_operation:"=",
        condition_value: 1,
      },
    ],

    
    restriction: [{
      type: 1001,
      operation: ">=",
      value: 2
    }],
    restriction_tag: [],
    asset: [
      {
        type: 1,
        width: 100,
        height: 200,
        online: false,
        value: "bg.png",
      }
    ],
    template: 4,
  });
};

const main = async () => {
  // await deleteDefaultABSegment();
  await addDefaultCampaign();

  console.log("Done!");
  process.exit(0);
};

main();
