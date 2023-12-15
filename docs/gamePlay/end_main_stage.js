module.exports = {
  post: {
    tags: ["Game"],
    summary: "",
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
              status: 0,
              time: 600, // session_time
              enemy: 500,
              boss: 1,
              gold: 500,
              random_designs: 1,
              random_equipments: 1,
              game_session_id: "9d703dea-eef9-4328-b405-643ce4ac29b7",
              stage_type: "open", // open, square, vertical
              game_level: 1,
              hp: 1,
              active_skill: { boomerang: 1, drill: 3 },
              passive_skill: { wanted_poster: 2, hi_powered_magnet: 3 },
              equipments: { weapon: "baseball_bat", necklace: "2110000" },
              equipments_stats: { weapon: 1, necklace: 2, gloves: 2, armor: 3, belt: 2, shoes: 1 },
              weapon_stat: { damage: 15, projectile_number: 1, knockback: 1 },
              monster_drop: 1,
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
              errorCode: 0,
              data: {
                md5: "ce2db70962b95a6f40be94a93db82729",
                gold: 177100,
                level: 2,
                exp: 1100,
                gem: 3640,
                data_stage: {
                  id_stage_current: 1000003,
                  time_survived: 4,
                  id_stage_select: 1000001,
                  id_stage_reward: 1000000,
                  current_reward: 0,
                  end_stage: false,
                  end_reward: false,
                  time_record: [],
                },
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
                    value: 550,
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
                    item_id: 2120001,
                    item_name: "Edgy Gloves",
                    item_type: "Gloves",
                    item_current_rarity: 1,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2130000,
                    item_name: "Mechanist Armor",
                    item_type: "Armor",
                    item_current_rarity: 1,
                    display_in_bag: false,
                  },
                ],
                monster_drop: 1,
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
