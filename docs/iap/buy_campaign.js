module.exports = {
  post: {
    tags: ["Campaign"],
    summary: "Buy Campaign",
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
              campaign_id: 16,
              iap_pack_id: 3000218,
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
              data: [
                {
                  item_list: [
                    {
                      content: "Material",
                      item_id: 2400032,
                      item_name: "Excellent Shoes Material",
                      item_type: "Shoes",
                      item_description: "Used to merge Shoes",
                      item_current_rarity: 4,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: false,
                      value: 2,
                    },
                    {
                      content: "Key",
                      item_id: 2400006,
                      item_name: "Gold Key",
                      item_type: "Key",
                      item_description: "Opens Executive Supply Crate",
                      item_current_rarity: 4,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: true,
                      value: 3,
                    },
                    {
                      content: "ReviveToken",
                      item_id: 2400007,
                      item_name: "Revive Token",
                      item_type: "ReviveToken",
                      item_description: "Miracle token that revives people",
                      item_current_rarity: 4,
                      is_supper: false,
                      item_super: false,
                      display_in_bag: true,
                      value: 5,
                    },
                  ],
                  user: {
                    id: "6465e46099b7c16cce0c90e0",
                    seq_id: 101,
                    email: "khanh99@gmail.com",
                    id_avatar: 100,
                    id_frame: 5,
                    energy: 175,
                    gem: 44145,
                    gold: 382232268,
                    avatar: [],
                    frame: [],
                    level: 20,
                    exp: 16488,
                    silver_key: 4,
                  },
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
};
