module.exports = {
  post: {
    tags: ["Live Ops"],
    summary: "Event Shop",
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
        example: "3000003",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              pack_id: 3000200,
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
                    content: "Gem",
                    item_id: 2400002,
                    item_name: "Gem",
                    item_type: "Gem",
                    item_description: "Gem",
                    item_current_rarity: 4,
                    is_supper: false,
                    item_super: false,
                    display_in_bag: false,
                    value: 150,
                  },
                ],
                live_ops_event: {
                  event_id: 3000003,
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
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 150,
                  gem: 67755,
                  gold: 1066400,
                  avatar: [],
                  frame: [],
                  level: 20,
                  exp: 696,
                  silver_key: 6,
                  gold_key: 121,
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
