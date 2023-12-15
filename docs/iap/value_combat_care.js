module.exports = {
  get: {
    tags: ["Value Pack"],
    summary: "Get Value Combat Care Pack",
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
                  pack_id: 3000170,
                  iap_id: "",
                  pack_name: "Value Combat Care",
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 0.99,
                  },
                  item_list: [
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
                      value: 30,
                    },
                    {
                      content: "PatrolGold",
                      item_id: 2400016,
                      item_name: "Patrol Gold",
                      item_type: "PatrolGold",
                      item_description: "Gain 1h of Patrol Gold",
                      item_current_rarity: 3,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: false,
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
                      item_super: false,
                      display_in_bag: true,
                      value: 1,
                    },
                  ],
                  combat_care_expiry: 1690896002,
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
    tags: ["Value Pack"],
    summary: "Buy Value Combat Care Pack",
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
              pack_id: 3000171,
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
              data: [
                {
                  item_list: [
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
                      value: 30,
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
                      value: 45000,
                    },
                    {
                      content: "ReviveToken",
                      item_id: 2400007,
                      item_name: "Revive Token",
                      item_type: "ReviveToken",
                      item_description: "Miracle token that revives people",
                      item_current_rarity: 4,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: true,
                      value: 1,
                    },
                  ],
                  user: {
                    id: "6465e46099b7c16cce0c90e0",
                    seq_id: 101,
                    email: "khanh99@gmail.com",
                    id_avatar: 100,
                    id_frame: 5,
                    energy: 175,
                    gem: 44145,
                    gold: 382232268,
                    avatar: [],
                    frame: [],
                    level: 20,
                    exp: 16488,
                    silver_key: 4,
                  },
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
};
