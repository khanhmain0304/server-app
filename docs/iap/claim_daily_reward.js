module.exports = {
  post: {
    tags: ["Monthly Card"],
    summary: "Claim Daily Reward Monthly Card",
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
                    value: 150,
                  },
                ],
                user: {
                  gem: 12200,
                  gold: 31400,
                  subscriptions: [
                    {
                      pack_id: 3000103,
                      pack_name: "Monthly Card",
                      purchase_date: 1684753311,
                      expiry_date: 1689931636,
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
                      last_claim_daily_reward: 1684755051,
                      _id: "646b3574885d916adf5a7666",
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
