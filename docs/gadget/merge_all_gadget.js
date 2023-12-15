module.exports = {
  post: {
    tags: ["Gadget"],
    summary: "Merge all gadget",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {},
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
              error_code: 0,
              data: {
                merge_list: [
                  {
                    content: "Gadget",
                    item_id: 2160001,
                    item_name: "Booster Device",
                    item_type: 2,
                    item_relate_skill: [],
                    item_current_rarity: 2,
                    item_bonus_hp: 200,
                    item_bonus_atk: 0,
                    item_effect: ["HP +120", "Hammer: penetrares all enemies", "HP +800", "Mjornir: spins when flying out"],
                    item_effect_bonus: [],
                  },
                ],
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 175,
                  gem: 57905,
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
