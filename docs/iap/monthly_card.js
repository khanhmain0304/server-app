module.exports = {
  get: {
    tags: ["Monthly Card"],
    summary: "Get Monthly Card",
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
                  pack_id: 3000103,
                  pack_name: "Monthly Card",
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
                      value: 500,
                    },
                  ],
                  daily_reward: [
                    {
                      content: "Gem",
                      item_id: 2400002,
                      item_name: "Gem",
                      item_type: "Gem",
                      item_description: "Gem",
                      item_current_rarity: 4,
                      is_supper: false,
                      display_in_bag: false,
                      value: 150,
                    },
                  ],
                  bonus: [
                    {
                      bonus_id: 1,
                      bonus_content: "Patrol Earning +5% (includes gold and EXP)",
                      bonus_type: "Patrol Earning",
                      value: 5,
                    },
                    {
                      bonus_id: 2,
                      bonus_content: "Quick Patrols +1",
                      bonus_type: "Quick Earning",
                      value: 1,
                    },
                  ],
                  time_left: 0,
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
    tags: ["Monthly Card"],
    summary: "Buy Monthly Card",
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
              pack_id: 30001021,
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
                    content: "Gem",
                    item_id: 2400002,
                    item_name: "Gem",
                    item_type: "Gem",
                    item_description: "Gem",
                    item_current_rarity: 4,
                    is_supper: false,
                    display_in_bag: false,
                    value: 500,
                  },
                ],
                user: {
                  gem: 10350,
                  gold: 12500,
                  subscriptions: [
                    {
                      pack_id: 3000103,
                      pack_name: "Monthly Card",
                      purchase_date: 1684744341,
                      expiry_date: 1687336341,
                      bonus: [
                        {
                          bonus_id: 1,
                          bonus_content: "Patrol Earning +5% (includes gold and EXP)",
                          bonus_type: "Patrol Earning",
                          value: 5,
                        },
                        {
                          bonus_id: 2,
                          bonus_content: "Quick Patrols +1",
                          bonus_type: "Quick Earning",
                          value: 1,
                        },
                      ],
                      daily_reward: [
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          is_supper: false,
                          display_in_bag: false,
                          value: 150,
                        },
                      ],
                      last_claim_daily_reward: null,
                      _id: "646b2895053f05de4bca7567",
                    },
                  ],
                  skip_ads: false,
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
