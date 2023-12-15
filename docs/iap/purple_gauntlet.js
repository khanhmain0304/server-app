module.exports = {
  get: {
    tags: ["Purple Gauntlet Pack"],
    summary: "Get Purple Gauntlet Pack",
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
                  iap_id: "com.nmg.survivalhero.pack.purple.gauntlet",
                  pack_name: "Value Combat Care",
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 0.99,
                  },
                  item_list: [
                    {
                      content: "Equipment",
                      item_id: 2120002,
                      item_name: "Mechanist Wristguard",
                      item_type: "Gloves",
                      item_description: "It packs quite a punch!",
                      item_current_rarity: 1,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: false,
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
                      item_super: false,
                      display_in_bag: true,
                      value: 20,
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
                      value: 20000,
                    },
                  ],
                  purple_gauntlet_expiry: 1696277288,
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
    tags: ["Purple Gauntlet Pack"],
    summary: "BuyPurple Gauntlet Pack",
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
                    item_id: 2120002,
                    item_name: "Mechanist Wristguard",
                    item_type: "Gloves",
                    item_description: "It packs quite a punch!",
                    item_current_rarity: 1,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: false,
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
                    item_super: false,
                    display_in_bag: true,
                    value: 20,
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
                    value: 20000,
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
