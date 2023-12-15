module.exports = {
  post: {
    tags: ["Daily Discount"],
    summary: "Claim Daily Discount Milestone",
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
              task_name: 2,
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
                  total_days_purchase: [
                    {
                      task_name: 1,
                      condition_value: 1,
                      status: 3,
                      show_item_icon: false,
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
                          value: 80,
                        },
                      ],
                    },
                    {
                      task_name: 2,
                      condition_value: 2,
                      status: 3,
                      show_item_icon: false,
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
                          value: 80,
                        },
                      ],
                    },
                  ],
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
                      value: 80,
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
};
