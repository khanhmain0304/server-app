module.exports = {
  get: {
    tags: ["Blue Revolver Pack"],
    summary: "Get Blue Revolver Pack",
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
                  offer_id: 3000104,
                  offer_start_condition: 0,
                  offer_start_condition_value: null,
                  offer_expiry_value: 12,
                  offer_special_condition: 3,
                  offer_special_condition_value: 2,
                  items: [
                    {
                      pack_id: 30001041,
                      iap_id: "blue_revolver",
                      price: {
                        _id: "643caeb88ed2f3482faaef48",
                        price_type: "IAP",
                        value: 0.99,
                      },
                      item_list: [
                        {
                          content: "Equipment",
                          item_id: 1110000,
                          item_name: "Revolver",
                          item_type: "Weapon",
                          item_current_rarity: 3,
                          is_supper: false,
                          display_in_bag: false,
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
                          item_super: false,
                          display_in_bag: true,
                          value: 10,
                        },
                        {
                          content: "ReviveToken",
                          item_id: 2400007,
                          item_name: "Revive Token",
                          item_type: "ReviveToken",
                          item_description: "Miracle token that revives people",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: true,
                          value: 2,
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
    tags: ["Blue Revolver Pack"],
    summary: "BuyBlue Revolver Pack",
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
              transaction_id: "64671f7d156bacbfd8cbca75",
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
                    content: "Equipment",
                    item_id: 1110000,
                    item_name: "Revolver",
                    item_type: "Weapon",
                    item_current_rarity: 3,
                    is_supper: false,
                    display_in_bag: false,
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
                    item_super: false,
                    display_in_bag: true,
                    value: 10,
                  },
                  {
                    content: "ReviveToken",
                    item_id: 2400007,
                    item_name: "Revive Token",
                    item_type: "ReviveToken",
                    item_description: "Miracle token that revives people",
                    item_current_rarity: 4,
                    is_supper: false,
                    display_in_bag: true,
                    value: 2,
                  },
                ],
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 50,
                  gem: 28050,
                  gold: 31400,
                  avatar: [],
                  frame: [],
                  level: 5,
                  exp: 5510,
                },
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
