module.exports = {
  post: {
    tags: ["Live Ops"],
    summary: "Open Lottery",
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
      {
        name: "event_id",
        in: "path",
        schema: {
          type: "string",
        },
        example: "3000005",
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
                total_reward_item: 0,
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
                ],
                tile_item_random: {
                  status: 3,
                  item_list: [
                    {
                      content: "Design",
                      item_id: 2400001,
                      item_name: "Random Scroll",
                      item_type: "All",
                      item_description: "Random Scroll",
                      item_current_rarity: 1,
                      display_in_bag: false,
                      value: 1,
                    },
                  ],
                  x: 6,
                  y: 3,
                },
                current_reward_item: {
                  tier: "B",
                  status: 2,
                  item_list: [
                    {
                      content: "Equipment",
                      item_id: 2400023,
                      item_name: "Excellent Gloves Chest",
                      item_type: "All",
                      item_description: "Get 1 random Excellent Gloves (excluding S Grade)",
                      item_current_rarity: 4,
                      display_in_bag: false,
                      value: 1,
                    },
                  ],
                  x: 7,
                  y: 3,
                },
                live_ops_event: {
                  event_id: 3000005,
                  event_start: 1,
                  event_start_value: 1693933200,
                  event_expiry: 1,
                  event_expiry_value: 240,
                  event_start_condition: 0,
                  event_special_condition: 0,
                  event_start_condition_value: 0,
                  event_exchange_time: 48,
                  event_token: 40,
                  event_sign_in: [],
                  event_mission: [],
                  event_exchange: [],
                  event_shop: [],
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
