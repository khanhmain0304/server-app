const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { EquipmentSchema } = require("./equipment");
const { EnergySchema } = require("./energy");
const { GoldMineSchema } = require("./goldMine");
const EvolveSchema = require("./evolve");
const { LimitRecordSchema, LimitDoubleValue } = require("./limit");
const { SubcriptionSchema } = require("./subcription");
const Types = require("../config/types");
const CrateRecordSchema = require("./crateRecord");
const OfflineEarningSchema = require("./offlineEarning");

const { EventSchema, EventRecordSchema } = require("./gameEvent");
const { LiveOpsEventSchema } = require("./liveOpsEvent");
const DailyShopSchema = require("./shop");
const { GrowthFundsSchema } = require("./growthFunds");
const { PiggyBankSchema } = require("./piggyBank");

// const bcrypt = require("bcrypt");
var moment = require("moment"); // require

const FirstMergeEquip = new Schema(
  {
    item_id: { type: Number, default: null },
    item_current_rarity: { type: Number, default: null },
    expire : { type: Number, default: 0 },
  },
  { _id: false }
);

const FirstMergeGadget = new Schema(
  {
    item_id: { type: Number, default: null },
    item_current_rarity: { type: Number, default: null },
    expire : { type: Number, default: 0 },
  },
  { _id: false }
);

const CurrentYWDNTEquip = new Schema(
  {
    item_id: { type: Number, default: null },
    item_current_rarity: { type: Number, default: null },
    expire : { type: Number, default: 0 },
  },
  { _id: false }
);

const TimeRecord = new Schema(
  {
    stage_id: { type: Number, default: 0 },
    time_survived: { type: Number, default: 0 },
  },
  { _id: false }
);

const LoseStageTime = new Schema(
  {
    stage_id: { type: Number, default: 0 },
    lose_time: { type: Number, default: 0 },
    win_time: { type: Number, default: 0 },
  },
  { _id: false }
);

const DataStage = new Schema(
  {
    id_stage_current: { type: Number, default: 0 },
    time_survived: { type: Number, default: 0 },
    last_time_survived: { type: Number, default: 0 },
    id_stage_select: { type: Number, default: 0 },
    id_stage_reward: { type: Number, default: 0 },
    current_reward: { type: Number, default: 0 },
    end_stage: { type: Boolean, default: false },
    end_reward: { type: Boolean, default: false },
    time_record: { type: [TimeRecord], default: [] },
    lose_stage_time: { type: [LoseStageTime], default: [] },
  },
  { _id: false }
);

const DataTrials = new Schema({
  stage_id: { type: Number, default: 0 },
  difficulty_level: { type: Number, default: 0 },
  status: { type: Number, default: 0 },
});

const DailyChallenge = new Schema({
  stage_id: { type: Number, default: 1010000 },
  time_survived: { type: Number, default: 0 },
  milestone_chest: {
    type: Schema.Types.Mixed,
    default: [
      {
        milestone: 1,
        status: 0,
      },
      {
        milestone: 2,
        status: 0,
      },
      {
        milestone: 3,
        status: 0,
      },
    ],
  },
});

const GaiaAuthentication = new Schema(
  {
    id: { type: String, default: null },
    appId: { type: String, default: null },
    state: { type: String, default: null },
    idType: { type: String, default: null },
    deviceType: { type: String, default: null },
    identifier: { type: String, default: null },
    restriction: { type: String, default: null },
    registeredDate: { type: String, default: null },
  },
  { _id: false }
);

const GaiaData = new Schema(
  {
    id: { type: String, default: null },
    state: { type: String, default: null },
    nickname: { type: String, default: null },
    profileImage: { type: String, default: null },
    restriction: { type: String, default: null },
    registeredDate: { type: String, default: null },
    currentAuthentication: { type: GaiaAuthentication, default: null },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    seq_id: { type: Number, default: 0 },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    game_segment: { type: String, default: "default" },
    game_version: { type: String, default: "default" },

    role: { type: String, default: "none" },

    id_avatar: { type: Number, default: 100 },
    id_frame: { type: Number, default: 5 },
    energy: { type: Number, default: 30 },
    energy_data: { type: EnergySchema, default: () => ({}) },
    gold_mine_data: { type: GoldMineSchema, default: () => ({}) },
    //-------------------
    gem: { type: Number, default: 0 }, // TODO: fake
    gold: { type: Number, default: 300 }, // TODO: fake
    dna: { type: Number, default: 0 }, // TODO: fake
    revive_token: { type: Number, default: 0 }, // TODO: fake

    //-------------------
    avatar: { type: Schema.Types.Mixed, default: [] },
    frame: { type: Schema.Types.Mixed, default: [] },
    level: { type: Number, default: 1 },
    exp: { type: Number, default: 0 },
    tutorial_step: { type: Number, default: 0 },
    silver_key: { type: Number, default: 0 },
    gold_key: { type: Number, default: 0 },
    s_key: { type: Number, default: 0 },
    offline_earning: { type: OfflineEarningSchema, default: {} },

    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    location: { type: String, default: null },
    account_type: { type: String, default: "email" },
    dob: { type: Date, default: Date.now },
    title: { type: String, default: null },
    comment: { type: String, default: null },
    rank: { type: String, default: null },
    friend_ids: { type: [Schema.Types.ObjectId] },
    blocked_user_ids: { type: [Schema.Types.ObjectId] },

    items: { type: Schema.Types.Mixed, default: [] },
    evolve: { type: EvolveSchema, default: {} },
    is_first_time_login: { type: Boolean, default: true },
    is_claim_first_time_iap: { type: Boolean, default: false },
    is_claim_segment: { type: Boolean, default: false },
    is_first_normal_crate: { type: Boolean, default: true },
    is_first_elite_crate: { type: Boolean, default: true },
    is_second_elite_crate: { type: Boolean, default: false },
    limit_record: { type: LimitRecordSchema, default: {} },
    limit_double_value: { type: LimitDoubleValue, default: {} },
    limit_chapter_pack: { type: [Number] },
    crate_record: { type: CrateRecordSchema, default: {} },
    daily_shop: { type: DailyShopSchema, default: {} },
    current_shop_live_ops: { type: Number, default: 0 },
    shop_live_ops_expiry: { type: Number, default: null },
    skip_ads: { type: Boolean, default: false },
    starter_pack_expiry: { type: Number, default: null },
    item_id_starter_pack: { type: Number, default: null },
    item_rarity_starter_pack: { type: Number, default: null },
    is_buy_starter_pack: { type: Boolean, default: false },
    first_merge_equip: { type: FirstMergeEquip, default: {} },
    first_merge_gadget: { type: FirstMergeGadget, default: {} },
    first_ywdnt_equip: { type: CurrentYWDNTEquip, default: {} },
    equipment: {
      type: EquipmentSchema,

      default: function () {
        // id
        // const id_item_weapon = new mongoose.Types.ObjectId();
        // const id_item_necklace = new mongoose.Types.ObjectId();
        // const id_item_gloves = new mongoose.Types.ObjectId();
        // const id_item_armor = new mongoose.Types.ObjectId();
        // const id_item_belt = new mongoose.Types.ObjectId();
        // const id_item_shoes = new mongoose.Types.ObjectId();

        let defaultValue = {
          slots: {
            weapon: null,
            necklace: null,
            gloves: null,
            armor: null,
            belt: null,
            shoes: null,
          },
          items: [
            // {
            //   // _id: id_item_weapon,
            //   item_id: 1110000,
            //   item_name: "Revolver",
            //   item_type: "Weapon",
            //   item_description: "Sheriff's favourite weapon",
            //   item_mainstats: "+10 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: ["ATK +10%", "Revolver damage +30%", "Start off with Lv.2 Revolver", "ATK +15%", "Bullet will split after hitting enemy"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 10,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   level: 1,
            //   min_level: 1,
            //   max_level: 10,
            // },
            // {
            //   // _id: id_item_necklace,
            //   item_id: 2110000,
            //   item_name: "Radiator Necklace",
            //   item_type: "Necklace",
            //   item_description: "",
            //   item_mainstats: "+8 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: [null, "ATK +10%", "Generates radiation ring that deals damage overtime", "All radiation ring damage doubled", "ATK +15%"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 8,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   // _id: id_item_gloves,
            //   item_id: 2120000,
            //   item_name: "Soldier Gloves",
            //   item_type: "Gloves",
            //   item_description: "",
            //   item_mainstats: "+7 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: [null, "ATK +10%", "Damage to Elites and Bosses +20%", "Damage to Elites and Bosses increased to 50%", "ATK +15%"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 7,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   // _id: id_item_armor,
            //   item_id: 2130000,
            //   item_name: "Mechanist Armor",
            //   item_type: "Armor",
            //   item_description: "",
            //   item_mainstats: "+50 HP",
            //   item_starting_rarity: 1,
            //   item_effect: [null, "HP +15%", "Revive once with 50%HP if dead from battle", "Revive with full HP with ATK +10%", "HP +20%"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Hp",
            //       value: 50,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   // _id: id_item_belt,
            //   item_id: 2140000,
            //   item_name: "Mechanist Belt",
            //   item_type: "Belt",
            //   item_description: "",
            //   item_mainstats: "+38 HP",
            //   item_starting_rarity: 1,
            //   item_effect: [null, "HP +10%", "When over 50% HP, Movement speed +20%", "When below 50% HP, damage received -20%", "HP +15%"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Hp",
            //       value: 38,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   // _id: id_item_shoes,
            //   item_id: 2150000,
            //   item_name: "Primal Boots",
            //   item_type: "Shoes",
            //   item_description: "",
            //   item_mainstats: "+38 HP",
            //   item_starting_rarity: 1,
            //   item_effect: [null, "HP +10%", "Base movement speed +1", "Heal for 1% HP/3s when moving", "HP +15%"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Hp",
            //       value: 38,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   item_id: 1110000,
            //   item_name: "Revolver",
            //   item_type: "Weapon",
            //   item_description: "Sheriff's favourite weapon",
            //   item_mainstats: "+10 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: ["ATK +10%", "Revolver damage +30%", "Start off with Lv.2 Revolver", "ATK +15%", "Bullet will split after hitting enemy"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 10,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   item_id: 1110001,
            //   item_name: "Shotgun",
            //   item_type: "Weapon",
            //   item_description: "",
            //   item_mainstats: "+10 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: ["ATK +10%", "2x damage to enemies in front", "Shotgun range extended", "ATK +15%", "Shotgun pierces all enemies"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 10,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   item_id: 1110002,
            //   item_name: "Whip",
            //   item_type: "Weapon",
            //   item_description: "",
            //   item_mainstats: "+10 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: ["ATK +10%", "Attacks inflict Bleed", "Knockback distance doubled", "ATK +15%", "Swing range becomes circular"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 10,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
            // {
            //   item_id: 1110003,
            //   item_name: "Lightsaber",
            //   item_type: "Weapon",
            //   item_description: "",
            //   item_mainstats: "+75 ATK",
            //   item_starting_rarity: 1,
            //   item_effect: ["ATK +15%", "All attack intervals -15%", "Triggers a backward slash every 5 attacks", "ATK +25%", "Leaves behind a sword array every 10 attacks"],
            //   item_current_rarity: 1,
            //   item_super: false,
            //   isDesign: false,
            //   isItem: true,
            //   isMaterial: false,
            //   isEquipped: false,
            //   base_stats: [
            //     {
            //       type: "Atk",
            //       value: 10,
            //     },
            //   ],
            //   effect_bonus: [],
            //   level_up_price: [
            //     {
            //       type: "Gold",
            //       value: 1000,
            //     },
            //     {
            //       type: "Design",
            //       value: 1,
            //     },
            //   ],
            //   level_down_reward: [],
            //   level_bonus: [],
            //   min_level: 1,
            //   max_level: 10,
            //   level: 1,
            // },
          ],
          designs: [
            {
              _id: 2400009,
              item_id: 2400009,
              item_name: "Weapon Design",
              item_type: "Weapon",
              item_description: "Used to level up weapons",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
            {
              _id: 2400011,
              item_id: 2400011,
              item_name: "Necklace Design",
              item_type: "Necklace",
              item_description: "Used to level up necklaces",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
            {
              _id: 2400013,
              item_id: 2400013,
              item_name: "Gloves Design",
              item_type: "Gloves",
              item_description: "Used to level up gloves",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
            {
              _id: 2400010,
              item_id: 2400010,
              item_name: "Armor Design",
              item_type: "Armor",
              item_description: "Used to level up armors",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
            {
              _id: 2400012,
              item_id: 2400012,
              item_name: "Belt Design",
              item_type: "Belt",
              item_description: "Used to level up belts",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
            {
              _id: 2400014,
              item_id: 2400014,
              item_name: "Shoes Design",
              item_type: "Shoes",
              item_description: "Used to level up shoes",
              item_current_rarity: 1,
              quantity: 0,
              isDesign: true,
              isItem: false,
              isMaterial: false,
            },
          ],
        };
        return defaultValue;
      },
    },

    data_stage: {
      type: DataStage,
      default: {
        id_stage_current: 1000000,
        time_survived: 0,
        id_stage_select: 1000000,
        id_stage_reward: 1000000,
        current_reward: 0,
        end_stage: false,
        end_reward: false,
      },
    },

    data_trials: {
      type: [DataTrials],
      default: [
        {
          stage_id: 1000000,
          difficulty_level: 1,
          status: 1,
        },
        {
          stage_id: 1000000,
          difficulty_level: 2,
          status: 0,
        },
        {
          stage_id: 1000000,
          difficulty_level: 3,
          status: 0,
        },
        {
          stage_id: 1000001,
          difficulty_level: 1,
          status: 0,
        },
        {
          stage_id: 1000001,
          difficulty_level: 2,
          status: 0,
        },
        {
          stage_id: 1000001,
          difficulty_level: 3,
          status: 0,
        },
        {
          stage_id: 1000002,
          difficulty_level: 1,
          status: 0,
        },
        {
          stage_id: 1000002,
          difficulty_level: 2,
          status: 0,
        },
        {
          stage_id: 1000002,
          difficulty_level: 3,
          status: 0,
        },
      ],
    },
    daily_challenge: { type: DailyChallenge, default: {} },

    subscriptions: { type: [SubcriptionSchema], default: [] },
    growth_funds: {
      type: [GrowthFundsSchema],
      default: function () {
        let default_value = [
          {
            _id: 30001031,
            pack_id: 30001031,
            pack_name: "Free",
            progress: [],
            status: true,
          },
          {
            _id: 30001032,
            pack_id: 30001032,
            pack_name: "Premium",
            progress: [],
            status: false,
          },
          {
            _id: 30001033,
            pack_id: 30001033,
            pack_name: "Super",
            progress: [],
            status: false,
          },
        ];
        return default_value;
      },
    },
    piggy_bank: { type: PiggyBankSchema, default: {} },
    events: { type: [EventSchema], default: [] },
    live_ops_events: { type: [LiveOpsEventSchema], default: [] },
    gaia: { type: GaiaData, default: {} },
    // event_record: { type: [EventRecordSchema], default: [] },

    jwt_token: { type: String },
    created_date: { type: Date, default: Date.now },
    created_client_version: { type: String, default: null },
    is_deleted: { type: Boolean, default: false },

    // tracking
    login_count: { type: Number, default: 0 },
    day_count: { type: Number, default: 0 },
    register_ts: { type: Number, default: 0 },
    total_spt: { type: Number, default: 0 },
    lifetime_spend: { type: Number, default: 0 },
    purchase_count: { type: Number, default: 0 },
    paid_gold: { type: Number, default: 0 },
    free_gold: { type: Number, default: 0 },
    paid_gem: { type: Number, default: 0 },
    free_gem: { type: Number, default: 0 },
    coupon_shop_expiry: { type: Number, default: 0 },
    is_use_coupon: { type: Boolean, default: false },

    //
    monster_drop: { type: Number, default: 0 },
    monster_drop_date: {
      type: Number,
      default: function () {
        return moment().unix();
      },
    },

    device_id: { type: String, default: null },
    device_os: { type: String, default: null },
    country: { type: String, default: null },
    language: { type: String, default: null },
    timezone_offset: { type: String, default: null },
    iap_spend: { type: Number, default: 0 },
    iap_max_spend: { type: Number, default: 0 },
    CRMTriggerCount: { type: Schema.Types.Mixed, default: [] },
  },
  { versionKey: false }
);

UserSchema.methods.getInfo = function getInfo() {
  return {
    id: this._id,
    seq_id: this.seq_id,
    address: this.address,
    email: this.email,

    id_avatar: this.id_avatar,
    id_frame: this.id_frame,
    energy: this.energy,
    gem: this.gem,
    gold: this.gold,
    avatar: this.avatar,
    frame: this.frame,
    level: this.level,
    exp: Math.ceil(this.exp),
    silver_key: this.silver_key,
    gold_key: this.gold_key,
    s_key: this.s_key,
    dna: this.dna,
    first_name: this.first_name,
    last_name: this.last_name,
    location: this.location,
    dob: this.dob,
    account_type: this.account_type,
    title: this.title,
    comment: this.comment,
    rank: this.rank,
    friend_ids: this.friend_ids,
    blocked_user_ids: this.blocked_user_ids,
    is_first_time_login: this.is_first_time_login,
    skip_ads: this.skip_ads,
    is_claim_first_time_iap: this.is_claim_first_time_iap,
    is_first_normal_crate: this.is_first_normal_crate,
    is_first_elite_crate: this.is_first_elite_crate,
    is_second_elite_crate: this.is_second_elite_crate,
    items: this.items,
    evolve: this.evolve,
    created_date: this.created_date,
    equipment: this.equipment,
    data_stage: this.data_stage,
    data_trials: this.data_trials,
    subscriptions: this.subscriptions,
    // energy_data: this.energy_data,
    gaia: this.gaia,
    tutorial_step: this.tutorial_step,

    // tracking
    login_count: this.login_count,
    day_count: this.day_count,
    register_ts: this.register_ts,
    total_spt: this.total_spt,

    lifetime_spend: this.lifetime_spend,
    purchase_count: this.purchase_count,
    paid_gold: this.paid_gold,
    free_gold: this.free_gold,
    paid_gem: this.paid_gem,
    free_gem: this.free_gem,

    revive_token: this.revive_token,
    daily_challenge: this.daily_challenge,
    device_id: this.device_id,
    device_os: this.device_os,
    country: this.country,
    language: this.language,
    timezone_offset: this.timezone_offset,

    iap_spend: this.iap_spend,
    iap_max_spend: this.iap_max_spend,
    coupon_shop_expiry: this.coupon_shop_expiry,
    is_use_coupon: this.is_use_coupon,
    CRMTriggerCount: this.CRMTriggerCount,
  };
};

UserSchema.methods.getInfoBackup = function getInfoBackup() {
  return {
    address: this.address,
    email: this.email,
    id_avatar: this.id_avatar,
    id_frame: this.id_frame,
    energy: this.energy,
    gem: this.gem,
    gold: this.gold,
    dna: this.dna,
    revive_token: this.revive_token,
    level: this.level,
    exp: this.exp,
    tutorial_step: this.tutorial_step,
    silver_key: this.silver_key,
    gold_key: this.gold_key,
    s_key: this.s_key,
    offline_earning: this.offline_earning,
    first_name: this.first_name,
    last_name: this.last_name,
    location: this.location,
    avatar: this.avatar,
    frame: this.frame,
    dob: this.dob,
    account_type: this.account_type,
    title: this.title,
    comment: this.comment,
    rank: this.rank,
    friend_ids: this.friend_ids,
    blocked_user_ids: this.blocked_user_ids,
    evolve: this.evolve,
    is_first_time_login: this.is_first_time_login,
    skip_ads: this.skip_ads,
    is_claim_first_time_iap: this.is_claim_first_time_iap,
    is_first_normal_crate: this.is_first_normal_crate,
    is_first_elite_crate: this.is_first_elite_crate,
    is_second_elite_crate: this.is_second_elite_crate,
    limit_record: this.limit_record,
    limit_double_value: this.limit_double_value,
    limit_chapter_pack: this.limit_chapter_pack,
    crate_record: this.crate_record,
    daily_shop: this.daily_shop,
    data_stage: this.data_stage,
    items: this.items,
    created_date: this.created_date,
    equipment: this.equipment,
    data_trials: this.data_trials,
    subscriptions: this.subscriptions,
    energy_data: this.energy_data,

    // tracking
    login_count: this.login_count,
    day_count: this.day_count,
    register_ts: this.register_ts,
    total_spt: this.total_spt,
    lifetime_spend: this.lifetime_spend,
    purchase_count: this.purchase_count,
    paid_gold: this.paid_gold,
    free_gold: this.free_gold,
    paid_gem: this.paid_gem,
    free_gem: this.free_gem,

    events: this.events,
    live_ops_events: this.live_ops_events,
    role: this.role,
    starter_pack_expiry: this.starter_pack_expiry,
    item_id_starter_pack: this.item_id_starter_pack,
    item_rarity_starter_pack: this.item_rarity_starter_pack,
    is_buy_starter_pack: this.is_buy_starter_pack,
    growth_funds: this.growth_funds,
    is_claim_segment: this.is_claim_segment,
    is_deleted: this.is_deleted,
    piggy_bank: this.piggy_bank,
    monster_drop: this.monster_drop,
    monster_drop_date: this.monster_drop_date,
    gold_mine_data: this.gold_mine_data,
    daily_challenge: this.daily_challenge,
  };
};

UserSchema.methods.getInfoSmall = function getInfoSmall() {
  return {
    id: this._id,
    energy: this.energy,
    gem: this.gem,
    gold: this.gold,
    level: this.level,
    exp: this.exp,
    dna: this.dna,
  };
};

UserSchema.methods.getDailyShop = function getDailyShop() {
  return {
    daily_shop: this.daily_shop,
  };
};

UserSchema.methods.getEnergy = function getEnergy() {
  return {
    energy: this.energy,
    gem: this.gem,
    ...this.energy_data.getInfo(),
  };
};

UserSchema.methods.getGoldMine = function getGoldMine() {
  return {
    gold: this.gold,
    ...this.gold_mine_data.getInfo(),
  };
};

UserSchema.methods.getRevive = function getRevive() {
  return {
    revive_token: this.revive_token,
    gem: this.gem,
  };
};

UserSchema.methods.getEvents = function getEvents() {
  return this.events;
};

UserSchema.methods.getEndGame = function getEndGame() {
  return {
    gold: Math.floor(this.gold),
    level: Math.floor(this.level),
    exp: Math.floor(this.exp),
    gem: Math.floor(this.gem),
    data_stage: this.data_stage,
  };
};

UserSchema.methods.getSubcription = function getSubcription() {
  return {
    gem: this.gem,
    gold: this.gold,
    subscriptions: this.subscriptions,
    skip_ads: this.skip_ads,
  };
};

UserSchema.methods.getPublicInfo = function getPublicInfo() {
  return {
    id: this._id,
    seq_id: this.seq_id,
    address: this.address,
    email: this.email,

    id_avatar: this.id_avatar,
    id_frame: this.id_frame,
    energy: this.energy,
    gem: this.gem,
    gold: this.gold,
    avatar: this.avatar,
    frame: this.frame,
    level: this.level,
    exp: this.exp,

    first_name: this.first_name,
    last_name: this.last_name,
    location: this.location,
    dob: this.dob,
    account_type: this.account_type,
    title: this.title,
    comment: this.comment,
    rank: this.rank,
    is_first_time_login: this.is_first_time_login,
    items: this.items,
    evolve: this.evolve,
    created_date: this.created_date,
    data_stage: this.data_stage,
  };
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
