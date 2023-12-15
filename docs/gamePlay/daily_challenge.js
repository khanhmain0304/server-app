module.exports = {
  get: {
    tags: ["Daily Challenge"],
    summary: "daily challenge",
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
                daily_challenge: {
                  stage_id: 1010001,
                  stage_statsmultiplier: 27,
                  stage_atkmultiplier: 17,
                  stage_droprate_mobs: 0,
                  boss_drop_design: 1,
                  boss_drop_design_bonus: 0.5,
                  boss_drop_equipment_1: 0.25,
                  boss_drop_equipment_2: 0,
                  buff_debuff: [],
                  milestion_chest: [
                    {
                      milestone: 1,
                      item_list: [
                        {
                          content: "PatrolGold",
                          item_id: 2400016,
                          item_name: "Patrol Gold",
                          item_type: "PatrolGold",
                          item_description: "Gain 1h of Patrol Gold",
                          item_current_rarity: 3,
                          is_supper: false,
                          item_super: false,
                          display_in_bag: false,
                          value: 1,
                        },
                        {
                          content: "Gadget",
                          item_id: 2161000,
                          item_name: "Normal Random Gadget",
                          item_type: "All",
                          item_description: "Normal Random Gadget",
                          item_current_rarity: 1,
                          is_supper: false,
                          item_super: false,
                          display_in_bag: false,
                          value: 1,
                        },
                      ],
                      status: 0,
                    },
                    {
                      milestone: 2,
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
                          value: 10,
                        },
                        {
                          content: "Gadget",
                          item_id: 2161000,
                          item_name: "Normal Random Gadget",
                          item_type: "All",
                          item_description: "Normal Random Gadget",
                          item_current_rarity: 1,
                          is_supper: false,
                          item_super: false,
                          display_in_bag: false,
                          value: 2,
                        },
                      ],
                      status: 0,
                    },
                    {
                      milestone: 3,
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
                          value: 20,
                        },
                        {
                          content: "Gadget",
                          item_id: 2161000,
                          item_name: "Normal Random Gadget",
                          item_type: "All",
                          item_description: "Normal Random Gadget",
                          item_current_rarity: 1,
                          is_supper: false,
                          item_super: false,
                          display_in_bag: false,
                          value: 3,
                        },
                      ],
                      status: 0,
                    },
                  ],
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
