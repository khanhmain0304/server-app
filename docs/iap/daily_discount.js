module.exports = {
  get: {
    tags: ["Daily Discount"],
    summary: "Get Daily Discount",
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
              error_code: 0,
              data: [
                {
                  total_days: 2,
                  total_days_purchase: [
                    {
                      task_name: 1,
                      condition_value: 1,
                      status: 2,
                      show_item_icon: false,
                      item_list: [
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
                          value: 80,
                        },
                      ],
                    },
                    {
                      task_name: 2,
                      condition_value: 2,
                      status: 2,
                      show_item_icon: false,
                      item_list: [
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
                          value: 80,
                        },
                      ],
                    },
                  ],
                  item_list: [
                    {
                      pack_id: 30001601,
                      iap_id: "",
                      type: "Daily",
                      refresh_time: 24,
                      price: {
                        _id: "643d0dbdfafdf624af6fcd71",
                        price_type: "Ads",
                        value: 0,
                        buy_limit: 1,
                      },
                      value: null,
                      item_list: [
                        {
                          content: "Design",
                          item_id: 2400001,
                          item_name: "Random Scroll",
                          item_type: "All",
                          item_description: "Random Scroll",
                          item_current_rarity: 1,
                          is_supper: false,
                          display_in_bag: false,
                          value: 2,
                        },
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
                          value: 10,
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
                          value: 4000,
                        },
                      ],
                    },
                    {
                      pack_id: 30001602,
                      iap_id: "",
                      type: "Daily",
                      refresh_time: 24,
                      price: {
                        _id: "643caeb88ed2f3482faaef48",
                        price_type: "IAP",
                        value: 0.39,
                        buy_limit: 1,
                      },
                      value: 400,
                      item_list: [
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
                          value: 10,
                        },
                        {
                          content: "Key",
                          item_id: 2400006,
                          item_name: "Gold Key",
                          item_type: "Key",
                          item_description: "Opens Executive Supply Crate",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: true,
                          value: 1,
                        },
                        {
                          content: "PatrolGold",
                          item_id: 2400016,
                          item_name: "Patrol Gold",
                          item_type: "PatrolGold",
                          item_description: "Gain 1h of Patrol Gold",
                          item_current_rarity: 3,
                          is_supper: false,
                          display_in_bag: false,
                          value: 1,
                        },
                      ],
                    },
                  ],
                },
              ],
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
  post: {
    tags: ["Daily Discount"],
    summary: "Buy Daily Discount",
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
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pack_id: 30001603,
              transaction_id: "64671f7d156bacbfd8cbca74",
              context_id: "",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            example: {
              error_code: 0,
              data: {
                daily_discount: {
                  pack_id: 30001603,
                  iap_id: "",
                  type: "Daily",
                  refresh_time: 24,
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 0.99,
                    buy_limit: 0,
                  },
                  value: 400,
                  item_list: [
                    {
                      content: "Design",
                      item_id: 2400011,
                      item_name: "Necklace Design",
                      item_type: "Necklace",
                      item_description: "Used to level up necklaces",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 1,
                    },
                    {
                      content: "Design",
                      item_id: 2400010,
                      item_name: "Armor Design",
                      item_type: "Armor",
                      item_description: "Used to level up armors",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 6,
                    },
                    {
                      content: "Design",
                      item_id: 2400013,
                      item_name: "Gloves Design",
                      item_type: "Gloves",
                      item_description: "Used to level up gloves",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 1,
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
                      value: 2,
                    },
                    {
                      content: "Design",
                      item_id: 2400009,
                      item_name: "Weapon Design",
                      item_type: "Weapon",
                      item_description: "Used to level up weapons",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 1,
                    },
                    {
                      content: "Design",
                      item_id: 2400012,
                      item_name: "Belt Design",
                      item_type: "Belt",
                      item_description: "Used to level up belts",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 1,
                    },
                    {
                      content: "Gem",
                      item_id: 2400002,
                      item_name: "Gem",
                      item_type: "Gem",
                      item_description: "Gem",
                      item_current_rarity: 4,
                      is_supper: false,
                      display_in_bag: false,
                      value: 80,
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
                      value: 72000,
                    },
                  ],
                },
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 50,
                  gem: 34750,
                  gold: 56400,
                  avatar: [],
                  frame: [],
                  level: 10,
                  exp: 5510,
                  silver_key: 3,
                  gold_key: 0,
                  s_key: 0,
                  first_name: "Quoc",
                  last_name: "Khanh",
                  location: null,
                  dob: "2023-05-18T08:40:00.745Z",
                  account_type: "email",
                  title: null,
                  comment: null,
                  rank: null,
                  friend_ids: [],
                  blocked_user_ids: [],
                  is_first_time_login: false,
                },
                total_days: 2,
                total_days_purchase: [
                  {
                    task_name: 1,
                    condition_value: 1,
                    status: 2,
                    show_item_icon: false,
                    item_list: [
                      {
                        content: "Gem",
                        item_id: 2400002,
                        item_name: "Gem",
                        item_type: "Gem",
                        item_description: "Gem",
                        item_current_rarity: 4,
                        is_supper: false,
                        display_in_bag: false,
                        value: 80,
                      },
                    ],
                  },
                  {
                    task_name: 2,
                    condition_value: 2,
                    status: 2,
                    show_item_icon: false,
                    item_list: [
                      {
                        content: "Gem",
                        item_id: 2400002,
                        item_name: "Gem",
                        item_type: "Gem",
                        item_description: "Gem",
                        item_current_rarity: 4,
                        is_supper: false,
                        display_in_bag: false,
                        value: 80,
                      },
                    ],
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
