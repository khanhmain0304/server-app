module.exports = {
  post: {
    tags: ["In App Message"],
    summary: "Remove All Reward Inbox",
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
                  user_id: "6465e46099b7c16cce0c90e0",
                  title: "Test Gift",
                  message: "Test Gift",
                  items: [
                    {
                      content: "Key",
                      item_id: 2400006,
                      item_name: "Purple Key",
                      item_type: "Key",
                      item_description: "Opens EDF Supply Crate",
                      item_current_rarity: 4,
                      display_in_bag: true,
                      value: 5,
                    },
                    {
                      content: "Gem",
                      item_id: 2400002,
                      item_name: "Gem",
                      item_type: "Gem",
                      item_description: "Gem",
                      item_current_rarity: 4,
                      display_in_bag: false,
                      value: 1000,
                    },
                  ],
                  expiry_time: 1698900159,
                  status: 3,
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
