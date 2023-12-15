module.exports = {
  post: {
    tags: ["Game"],
    summary: "Bonus reward end main stage",
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
              md5: "091a9b88f84de1cf93f29603dc82710e",
              bonus_value: 1.7,
              item_list: [
                {
                  content: "Gold",
                  item_id: 2400003,
                  item_name: "Gold",
                  item_type: "Gold",
                  item_description: "Gold",
                  item_current_rarity: 3,
                  is_supper: false,
                  display_in_bag: false,
                  value: 500,
                },
                {
                  content: "Exp",
                  item_id: 2400018,
                  item_name: "Exp",
                  item_type: "Exp",
                  item_description: "EXP",
                  item_current_rarity: 3,
                  is_supper: false,
                  display_in_bag: false,
                  value: 750,
                },
                {
                  content: "Design",
                  item_id: 2400010,
                  item_name: "Armor Design",
                  item_type: "Armor",
                  item_description: "Used to level up armors",
                  item_current_rarity: 1,
                  is_supper: false,
                  display_in_bag: true,
                  value: 1,
                },
                {
                  content: "Equipment",
                  item_id: 2110002,
                  item_name: "Rockstar Necklace",
                  item_type: "Necklace",
                  item_current_rarity: 1,
                  display_in_bag: false,
                },
              ],
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
                    content: "Gold",
                    item_id: 2400003,
                    item_name: "Gold",
                    item_type: "Gold",
                    item_description: "Gold",
                    item_current_rarity: 3,
                    is_supper: false,
                    display_in_bag: false,
                    value: 850,
                  },
                  {
                    content: "Exp",
                    item_id: 2400018,
                    item_name: "Exp",
                    item_type: "Exp",
                    item_description: "EXP",
                    item_current_rarity: 3,
                    is_supper: false,
                    display_in_bag: false,
                    value: 1275,
                  },
                  {
                    content: "Design",
                    item_id: 2400010,
                    item_name: "Armor Design",
                    item_type: "Armor",
                    item_description: "Used to level up armors",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: true,
                    value: 1,
                  },
                  {
                    content: "Equipment",
                    item_id: 2110002,
                    item_name: "Rockstar Necklace",
                    item_type: "Necklace",
                    item_current_rarity: 1,
                    display_in_bag: false,
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
