module.exports = {
  post: {
    tags: ["Equipment"],
    summary: "equip",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              id: "641be8de7e1c00c9f5513e53",
            },
          },
        },
      },
    },
    parameters: [
      {
        name: "x-access-token",
        in: "header",
        schema: {
          type: "string",
        },
        example:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFlNmY2OGU1NmEyM2IzZGU1YzE4ZjEzIiwiZW1haWwiOiJuYW1uaEBnbWFpbC5jb20iLCJpYXQiOjE2NDI1MjY0MDEsImV4cCI6MTY0MjYxMjgwMX0.drhcE3VnQllacD50dN_H6oFrvaphqKqsLDLh-LmEnCE",
      },
    ],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            example: {
              errorCode: 0,
              data: {
                user: {
                  id: "64cc9fbc52b91bfde864ea48",
                  seq_id: 860,
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 35,
                  gem: 50,
                  gold: 9300,
                  avatar: [],
                  frame: [],
                  level: 2,
                  exp: 550,
                  silver_key: 0,
                  gold_key: 0,
                  s_key: 0,
                  dna: 0,
                  first_name: null,
                  last_name: null,
                  location: null,
                  dob: "2023-08-04T06:50:36.676Z",
                  account_type: "GAIA",
                  title: null,
                  comment: null,
                  rank: null,
                  friend_ids: [],
                  blocked_user_ids: [],
                  is_first_time_login: false,
                  skip_ads: false,
                  is_claim_first_time_iap: false,
                  items: [],
                  evolve: {
                    current_level: 1,
                    current_evolve_id: 1,
                    current_key_evolve_id: 0,
                    key_evolve: [],
                    bonus_stats: [
                      {
                        stat_type: "Hp",
                        value: 0,
                      },
                      {
                        stat_type: "Atk",
                        value: 2,
                      },
                      {
                        stat_type: "Armor",
                        value: 0,
                      },
                      {
                        stat_type: "MeatHeal",
                        value: 0,
                      },
                    ],
                  },
                  created_date: "2023-08-04T06:50:36.679Z",
                  equipment: {
                    slots: {
                      weapon: "64cca00152b91bfde864fe6a",
                      necklace: null,
                      gloves: null,
                      armor: null,
                      belt: null,
                      shoes: null,
                    },
                    items: [
                      
                    ],
                    designs: [
                      
                    ],
                    materials: [
                      {
                        _id: 2400032,
                        item_id: 2400032,
                        item_name: "Excellent Shoes Material",
                        item_type: "Shoes",
                        item_description: "Used to merge Shoes",
                        item_current_rarity: 4,
                        quantity: 4,
                        isDesign: false,
                        isItem: false,
                        isMaterial: true,
                      },
                    ],
                    createdAt: "2023-08-04T06:50:36.682Z",
                    updatedAt: "2023-08-07T04:25:57.255Z",
                  },
                  data_stage: {
                    id_stage_current: 1000001,
                    time_survived: 5,
                    id_stage_select: 1000001,
                    id_stage_reward: 1000000,
                    current_reward: 0,
                    end_stage: false,
                    end_reward: false,
                    time_record: [],
                  },
                  data_trials: [
                    
                  ],
                  subscriptions: [],
                  gaia: {
                    id: "1cd5d2ba-ddf2-4dd8-a58c-012b63542cee",
                    state: "GUEST",
                    nickname: null,
                    profileImage: null,
                    restriction: null,
                    registeredDate: "2023-04-26T03:22:32.000Z",
                    currentAuthentication: {
                      id: "1849222d-b1f4-4f24-b5d2-80a2bc4f9669",
                      appId: "SurvivalHero",
                      state: "JOINED",
                      idType: "GUEST",
                      deviceType: "ANDROID",
                      identifier: null,
                      restriction: null,
                      registeredDate: "2023-04-26T03:22:32.000Z",
                    },
                  },
                  tutorial_step: 41,
                  login_count: 14,
                  day_count: 2,
                  register_ts: 1691131836,
                  total_spt: 616713233,
                  lifetime_spend: 0,
                  purchase_count: 0,
                  paid_gold: 0,
                  free_gold: 9100,
                  paid_gem: 0,
                  free_gem: 50,
                  revive_token: 2,
                },
                item_list: [
                  {
                    content: "Material",
                    item_id: 2400032,
                    item_name: "Excellent Shoes Material",
                    item_type: "Shoes",
                    item_description: "Used to merge Shoes",
                    item_current_rarity: 4,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: false,
                    quantity: 1,
                  },
                  {
                    content: "Gold",
                    item_id: 2400003,
                    item_name: "Gold",
                    item_type: "Gold",
                    item_description: "Gold",
                    item_current_rarity: 3,
                    is_supper: false,
                    display_in_bag: false,
                    value: 6000,
                  },
                  {
                    content: "Design",
                    item_id: 2400014,
                    item_name: "Shoes Design",
                    item_type: "Shoes",
                    item_description: "Used to level up shoes",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: true,
                    value: 3,
                  },
                  {
                    content: "Equipment",
                    item_id: 2150005,
                    item_name: "Immortal Boots",
                    item_type: "Shoes",
                    item_description: "",
                    item_mainstats: "+225 HP",
                    item_starting_rarity: 4,
                    item_effect: ["Base Movement Speed +2", "HP +15%", "Leaves behind a trail of fire when moving", "HP +20%", "Increase fire trail damage. It also slows enemies"],
                    item_current_rarity: 4,
                    item_super: true,
                    isDesign: false,
                    isItem: true,
                    isMaterial: false,
                    isEquipped: false,
                    base_stats: [
                      {
                        type: "Hp",
                        value: 247,
                      },
                    ],
                    effect_bonus: [
                      {
                        type: "Hp",
                        value: 15,
                      },
                    ],
                    level_up_price: [
                      {
                        type: "Gold",
                        value: 1000,
                      },
                      {
                        type: "Design",
                        value: 1,
                      },
                    ],
                    level_down_reward: [],
                    level_bonus: [],
                    min_level: 1,
                    max_level: 50,
                    level: 1,
                    _id: "64d06e2173a822204ccc977e",
                  },
                ],
              },
            },
          },
        },
      },
      404: {
        description: "Invalid Credentials",
        content: {
          "application/json": {
            example: {
              error_code: 9,
              data: {
                message: "User Not Foud!",
              },
            },
          },
        },
      },
      403: {
        description: "Invalid Credentials",
        content: {
          "application/json": {
            example: {
              error_code: 9,
              data: {
                message: "A jwt token is required for authentication",
              },
            },
          },
        },
      },
      401: {
        description: "Invalid Credentials",
        content: {
          "application/json": {
            example: {
              error_code: 9,
              data: {
                message: "Invalid JWT Token",
              },
            },
          },
        },
      },
    },
  },
};
