module.exports = {
  post: {
    tags: ["Live Ops"],
    summary: "Buy Ticket",
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
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              quantity: 10,
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
                    content: "EventTicket",
                    item_id: 30000051,
                    item_name: "Lottery Ticket",
                    item_type: "Event Token",
                    item_description: "Lottery Ticket",
                    item_current_rarity: 4,
                    value: 1,
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
