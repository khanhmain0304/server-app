module.exports = {
  get: {
    tags: ["Game"],
    summary: "Get reward stage by time survived",
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
                item_list: [
                  {
                    content: "Equipment",
                    item_id: 2130001,
                    item_name: "Edgy Suit",
                    item_type: "Armor",
                    item_description: "Always be rockin', just make sure you don't blow the roof off.",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: false,
                    value: 1,
                  },
                  {
                    content: "Equipment",
                    item_id: 2140000,
                    item_name: "Mechanist Belt",
                    item_type: "Belt",
                    item_description: "Blessed are they who strive for perfection.",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: false,
                    value: 1,
                  },
                ],
                data_stage: {
                  id_stage_current: 1000001,
                  time_survived: 600,
                  id_stage_select: 1000000,
                  id_stage_reward: 1000000,
                  current_reward: 1,
                  time_record: [],
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
  post: {
    tags: ["Game"],
    summary: "Claim reward stage by time survived",
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
                item_list: [
                  {
                    content: "Equipment",
                    item_id: 2130001,
                    item_name: "Edgy Suit",
                    item_type: "Armor",
                    item_description: "Always be rockin', just make sure you don't blow the roof off.",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: false,
                    value: 1,
                  },
                  {
                    content: "Equipment",
                    item_id: 2140000,
                    item_name: "Mechanist Belt",
                    item_type: "Belt",
                    item_description: "Blessed are they who strive for perfection.",
                    item_current_rarity: 1,
                    is_supper: false,
                    display_in_bag: false,
                    value: 1,
                  },
                ],
                user: {
                  id: "644b39f992596c7e0b2f3b58",
                  seq_id: 91,
                  email: "khanh3434@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 60,
                  gem: 16540,
                  gold: 253500,
                  avatar: [],
                  frame: [],
                  level: 7,
                  exp: 13700,
                  silver_key: 10,
                  gold_key: 0,
                  s_key: 0,
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
