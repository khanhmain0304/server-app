module.exports = {
  get: {
    tags: ["Kick Start Pack"],
    summary: "Get Kick Start 499 Pack",
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
                  pack_id: 3000220,
                  iap_id: "com.nmg.survivalhero.pack.kick.start.499",
                  pack_name: "Kick-Start Pack",
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 4.99,
                  },
                  item_list: [
                    {
                      content: "Equipment",
                      item_id: 1110000,
                      item_name: "Revolver",
                      item_type: "Weapon",
                      item_description: "Sheriff's favourite weapon.",
                      item_current_rarity: 4,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: false,
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
                      item_super: false,
                      display_in_bag: false,
                      value: 600,
                    },
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
                      value: 6,
                    },
                  ],
                  kick_start_499_expiry: 1696829152,
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
    tags: ["Kick Start Pack"],
    summary: "Buy Kick Start 499 Pack",
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
                    item_description: "Sheriff's favourite weapon.",
                    item_current_rarity: 4,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: false,
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
                    item_super: false,
                    display_in_bag: false,
                    value: 600,
                  },
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
                    value: 6,
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
