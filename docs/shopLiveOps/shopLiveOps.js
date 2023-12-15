module.exports = {
  get: {
    tags: ["Shop Live Ops"],
    summary: "Get Shop Live Ops",
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
              data: {
                shop_live_ops_expiry: 1697415282,
                shop_live_ops: [
                  {
                    pack_id: 300000405,
                    iap_id: "",
                    price: {
                      _id: "643d0d9a43e11004c51a4c5d",
                      price_type: "Free",
                      value: 0,
                    },
                    item_list: [
                      {
                        content: "Equipment",
                        item_id: 2400000,
                        item_name: "Random Equipment",
                        item_type: "All",
                        item_description: "Random Equipment",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 1,
                      },
                      {
                        content: "Design",
                        item_id: 2400001,
                        item_name: "Random Scroll",
                        item_type: "All",
                        item_description: "Random Scroll",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 2,
                      },
                    ],
                  },
                  {
                    pack_id: 300000406,
                    iap_id: "",
                    price: {
                      _id: "643d0dbdfafdf624af6fcd71",
                      price_type: "Ads",
                      value: 0,
                    },
                    item_list: [
                      {
                        content: "Key",
                        item_id: 2400008,
                        item_name: "S key",
                        item_type: "Key",
                        item_description: "Opens S Supply Crate",
                        item_current_rarity: 7,
                        display_in_bag: true,
                        value: 1,
                      },
                      {
                        content: "Gold",
                        item_id: 2400003,
                        item_name: "Gold",
                        item_type: "Gold",
                        item_description: "Gold",
                        item_current_rarity: 3,
                        display_in_bag: false,
                        value: 5000,
                      },
                      {
                        content: "Design",
                        item_id: 2400001,
                        item_name: "Random Scroll",
                        item_type: "All",
                        item_description: "Random Scroll",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 5,
                      },
                    ],
                  },
                  {
                    pack_id: 300000407,
                    iap_id: "",
                    price: {
                      _id: "643d0d9a43e11004c51a4c5d",
                      price_type: "Free",
                      value: 0,
                    },
                    item_list: [
                      {
                        content: "ReviveToken",
                        item_id: 2400007,
                        item_name: "Revive Token",
                        item_type: "ReviveToken",
                        item_description: "Miracle token that revives people",
                        item_current_rarity: 4,
                        display_in_bag: true,
                        value: 1,
                      },
                      {
                        content: "Design",
                        item_id: 2400001,
                        item_name: "Random Scroll",
                        item_type: "All",
                        item_description: "Random Scroll",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 2,
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
  post: {
    tags: ["Shop Live Ops"],
    summary: "Buy Shop Live Ops",
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
              pack_id: 300000406,
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
                item_list: [
                  {
                    content: "Key",
                    item_id: 2400008,
                    item_name: "S key",
                    item_type: "Key",
                    item_description: "Opens S Supply Crate",
                    item_current_rarity: 7,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: true,
                    value: 1,
                  },
                  {
                    content: "Gold",
                    item_id: 2400003,
                    item_name: "Gold",
                    item_type: "Gold",
                    item_description: "Gold",
                    item_current_rarity: 3,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: false,
                    value: 5000,
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
                    item_id: 2400010,
                    item_name: "Armor Design",
                    item_type: "Armor",
                    item_description: "Used to level up armors",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: true,
                    value: 1,
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
                ],
                shop_live_ops_expiry: 1697415282,
                shop_live_ops: [
                  {
                    pack_id: 300000407,
                    iap_id: "",
                    price: {
                      _id: "643d0d9a43e11004c51a4c5d",
                      price_type: "Free",
                      value: 0,
                    },
                    item_list: [
                      {
                        content: "ReviveToken",
                        item_id: 2400007,
                        item_name: "Revive Token",
                        item_type: "ReviveToken",
                        item_description: "Miracle token that revives people",
                        item_current_rarity: 4,
                        display_in_bag: true,
                        value: 1,
                      },
                      {
                        content: "Design",
                        item_id: 2400001,
                        item_name: "Random Scroll",
                        item_type: "All",
                        item_description: "Random Scroll",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 2,
                      },
                    ],
                  },
                  {
                    pack_id: 300000408,
                    iap_id: "",
                    price: {
                      _id: "643d0d9a43e11004c51a4c5d",
                      price_type: "Free",
                      value: 0,
                    },
                    item_list: [
                      {
                        content: "Design",
                        item_id: 2400001,
                        item_name: "Random Scroll",
                        item_type: "All",
                        item_description: "Random Scroll",
                        item_current_rarity: 1,
                        display_in_bag: false,
                        value: 5,
                      },
                      {
                        content: "Key",
                        item_id: 2400005,
                        item_name: "Silver Key",
                        item_type: "Key",
                        item_description: "Opens Officer Crate",
                        item_current_rarity: 3,
                        display_in_bag: true,
                        value: 1,
                      },
                    ],
                  },
                  {
                    pack_id: 300000409,
                    iap_id: "",
                    price: {
                      _id: "643caeb88ed2f3482faaef48",
                      price_type: "IAP",
                      value: 0.99,
                    },
                    item_list: [
                      {
                        content: "Key",
                        item_id: 2400008,
                        item_name: "S key",
                        item_type: "Key",
                        item_description: "Opens S Supply Crate",
                        item_current_rarity: 7,
                        display_in_bag: true,
                        value: 1,
                      },
                      {
                        content: "ReviveToken",
                        item_id: 2400007,
                        item_name: "Revive Token",
                        item_type: "ReviveToken",
                        item_description: "Miracle token that revives people",
                        item_current_rarity: 4,
                        display_in_bag: true,
                        value: 3,
                      },
                      {
                        content: "Gold",
                        item_id: 2400003,
                        item_name: "Gold",
                        item_type: "Gold",
                        item_description: "Gold",
                        item_current_rarity: 3,
                        display_in_bag: false,
                        value: 12000,
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
