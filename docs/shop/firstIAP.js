module.exports = {
  get: {
    tags: ["Shop"],
    summary: "Get Reward First IAP",
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
                  offer_id: 3000101,
                  offer_start_condition: 0,
                  offer_start_condition_value: null,
                  offer_expiry_value: -1,
                  offer_special_condition: 3,
                  offer_special_condition_value: 360,
                  items: [
                    {
                      pack_id: 3000102,
                      item_list: [
                        {
                          content: "Equipment",
                          item_id: 2110000,
                          item_name: "Radiator Necklace",
                          item_type: "Necklace",
                          item_description: "Contains radioactive materials.",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
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
                          value: 50,
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
                          value: 10000,
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
    tags: ["Shop"],
    summary: "Claim Reward First IAP",
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
                item_list: [
                  {
                    content: "Equipment",
                    item_id: 2110000,
                    item_name: "Radiator Necklace",
                    item_type: "Necklace",
                    item_description: "Contains radioactive materials.",
                    item_current_rarity: 4,
                    is_supper: false,
                    display_in_bag: false,
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
                    value: 50,
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
                    value: 10000,
                  },
                ],
                user: {
                  id: "644b39f992596c7e0b2f3b58",
                  seq_id: 91,
                  email: "khanh3434@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 30,
                  gem: 1200,
                  gold: 166000,
                  avatar: [],
                  frame: [],
                  level: 1,
                  exp: 0,
                  silver_key: 0,
                  gold_key: 0,
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
