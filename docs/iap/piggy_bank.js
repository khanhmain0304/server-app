module.exports = {
  get: {
    tags: ["Piggy Bank"],
    summary: "Get Piggy Bank",
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
                  pack_id: 30001503,
                  iap_id: "",
                  pack_name: null,
                  description: "Challenge stages to store even more gems. Smash the piggy when it's full to claim your hard-earned rewards!",
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 9.99,
                  },
                  original_gem: 1200,
                  min_gem: 2400,
                  max_gem: 4800,
                  min_value: 2,
                  max_value: 4,
                  _id: "64ae7312eb78574853957ec2",
                  current_gem: 2400,
                  current_progress: 0,
                  current_value: 2,
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
    tags: ["Piggy Bank"],
    summary: "Piggy Bank",
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
              pack_id: 30001503,
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
                piggy_bank: {
                  pack_id: 30001503,
                  iap_id: "",
                  pack_name: "Gold Piggy (L)",
                  description: "Challenge stages to store even more gems. Smash the piggy when it's full to claim your hard-earned rewards!",
                  price: {
                    _id: "643caeb88ed2f3482faaef48",
                    price_type: "IAP",
                    value: 9.99,
                  },
                  original_gem: 1200,
                  min_gem: 2400,
                  max_gem: 4800,
                  min_value: 2,
                  max_value: 4,
                  _id: "64b8d5ea5566699710dd9bdf",
                  current_gem: 2400,
                  current_progress: 0,
                  current_value: 2,
                },
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
                    value: 2000,
                  },
                ],
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
