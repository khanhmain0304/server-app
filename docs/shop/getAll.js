module.exports = {
  get: {
    tags: ["Shop"],
    summary: "Get Shop",
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
                gold_shop: {
                  item_group_id: 2370000,
                  item_group_name: "Gold Pack",
                  item_group_order: 7,
                  item_group_stat: 0,
                  item_group_stat_value: null,
                  item_group_expiry: 0,
                  item_group_expiry_value: null,
                  item_group_special_condition: 0,
                  item_group_special_condition_value: null,
                  item_list: [
                    {
                      pack: 1,
                      cost: [
                        {
                          cost_type: "free",
                          price: 0,
                          buy_limit_per_day: 1,
                        },
                        {
                          cost_type: "ads",
                          price: 0,
                          buy_limit_per_day: 1,
                        },
                        {
                          cost_type: "Gem",
                          price: 30,
                          buy_limit_per_day: "unlimited",
                        },
                      ],
                      value_type: "patrol gold",
                      value: 2,
                    },
                    {
                      pack: 2,
                      cost: [
                        {
                          cost_type: "Gem",
                          price: 90,
                          buy_limit_per_day: "unlimited",
                        },
                      ],
                      value_type: "patrol gold",
                      value: 6,
                    },
                    {
                      pack: 3,
                      cost: [
                        {
                          cost_type: "Gem",
                          price: 288,
                          buy_limit_per_day: "unlimited",
                        },
                      ],
                      value_type: "patrol gold",
                      value: 24,
                    },
                  ],
                  gold_patrol: 3000,
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
