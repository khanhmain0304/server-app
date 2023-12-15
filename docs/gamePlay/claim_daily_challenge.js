module.exports = {
  post: {
    tags: ["Daily Challenge"],
    summary: "Claim daily challenge",
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
              milestone: 1,
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
                    item_super: false,
                    display_in_bag: false,
                    value: 4500,
                  },
                  {
                    content: "Gadget",
                    item_id: 2160004,
                    item_name: "Compressioner",
                    item_type: 2,
                    item_relate_skill: [],
                    item_current_rarity: 1,
                    item_bonus_hp: 100,
                    item_bonus_atk: 0,
                    item_effect: ["HP +120", "Soundwave: Range shrinks 25%, damage x2", "HP +800", "Supersonic Speaker: Mobs that die in radius give bonus EXP"],
                    item_effect_bonus: [],
                    value: 1,
                  },
                ],
                milestone_chest: [
                  {
                    milestone: 1,
                    status: 3,
                  },
                  {
                    milestone: 2,
                    status: 0,
                  },
                  {
                    milestone: 3,
                    status: 0,
                  },
                ],
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 155,
                  gem: 57035,
                  gold: 1018000,
                  avatar: [],
                  frame: [],
                  level: 20,
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
