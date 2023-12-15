module.exports = {
    post: {
      tags: ["Equipment"],
      summary: "pre downgrage equip",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                id: "641be8de7e1c00c9f5513e53",
              },
            },
          },
        },
      },
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
                errorCode: 0,
                data: {
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
                      quantity: 1,
                    },
                    {
                      content: "Gold",
                      item_id: 2400003,
                      item_name: "Gold",
                      item_type: "Gold",
                      item_description: "Gold",
                      item_current_rarity: 3,
                      is_supper: false,
                      display_in_bag: false,
                      value: 6000,
                    },
                    {
                      content: "Design",
                      item_id: 2400014,
                      item_name: "Shoes Design",
                      item_type: "Shoes",
                      item_description: "Used to level up shoes",
                      item_current_rarity: 1,
                      is_supper: false,
                      display_in_bag: true,
                      value: 3,
                    },
                    {
                      content: "Equipment",
                      item_id: 2150005,
                      item_name: "Immortal Boots",
                      item_type: "Shoes",
                      item_description: "",
                      item_mainstats: "+225 HP",
                      item_starting_rarity: 4,
                      item_effect: ["Base Movement Speed +2", "HP +15%", "Leaves behind a trail of fire when moving", "HP +20%", "Increase fire trail damage. It also slows enemies"],
                      item_current_rarity: 4,
                      item_super: true,
                      isDesign: false,
                      isItem: true,
                      isMaterial: false,
                      isEquipped: false,
                      base_stats: [
                        {
                          type: "Hp",
                          value: 247,
                        },
                      ],
                      effect_bonus: [
                        {
                          type: "Hp",
                          value: 15,
                        },
                      ],
                      level_up_price: [
                        {
                          type: "Gold",
                          value: 1000,
                        },
                        {
                          type: "Design",
                          value: 1,
                        },
                      ],
                      level_down_reward: [],
                      level_bonus: [],
                      min_level: 1,
                      max_level: 50,
                      level: 1,
                      _id: "64d06e2173a822204ccc977e",
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
  