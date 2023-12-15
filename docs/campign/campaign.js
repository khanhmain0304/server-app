module.exports = {
  post: {
    tags: ["Campaign"],
    summary: "Get Campaign",
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
    // requestBody: {
    //   content: {
    //     "application/json": {
    //       schema: {
    //         type: "object",
    //         example: {
    //           ab_test_segment: "2.1",
    //           game_version: "199",
    //         },
    //       },
    //     },
    //   },
    // },
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            example: {
              errorCode: 0,
              data: [
                {
                  id: "5",
                  name: "test campaign name ",
                  description: "test campaign description",
                  iap_pack: [
                    {
                      id: 3000218,
                      name: "Need More Upgrade",
                      price: {
                        value: 2.99,
                        price_type: "IAP"
                      },
                      original_price: 29.9,
                      discount_percentage: 90,
                      sku: "com.nmg.survivalhero.pack.needmoreupgrade",
                      item_list: [
                        {
                          content: "Gold",
                          item_id: 2400003,
                          item_name: "Gold",
                          item_type: "Gold",
                          item_description: "Gold",
                          item_current_rarity: 3,
                          value: 10000,
                        },
                        {
                          content: "Gem",
                          item_id: 2400002,
                          item_name: "Gem",
                          item_type: "Gem",
                          item_description: "Gem",
                          item_current_rarity: 4,
                          value: 50,
                        },
                      ],
                    },
                  ],
                  appear: ["A", "B"],
                  trigger_condition: [
                    {
                      condition_type: 1,
                      condition_operation:"=",
                      condition_value: 1,
                    },
                  ],
                  trigger_rule: "AND",
                  repop_mainmenu: false,
                  campaign_status: true,
                  repeat_times: 0,
                  start: 1698655313,
                  end: 1701308510,
                  timer: 86400,
                  buy_chances: 3,
                  order: 1000,
                  repeat_condition: [
                    {
                      condition_type: 1,
                      condition_operation:"=",
                      condition_value: 1,
                    },
                  ],
                  restriction: [
                    {
                      type: 1001,
                      operation: ">=",
                      value: 2,
                    },
                  ],
                  restriction_tag: [],
                  asset: [
                    {
                      type: 1,
                      width: 100,
                      height: 200,
                      online: false,
                      value: "bg.png",
                    },
                  ],
                  template: 1,
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
