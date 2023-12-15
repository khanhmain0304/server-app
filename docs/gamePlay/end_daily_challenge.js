module.exports = {
  post: {
    tags: ["Daily Challenge"],
    summary: "End daily challenge",
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
              time: 500, // session_time
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
              error_code: 0,
              data: {
                gold: 10000,
                level: 1,
                exp: 300,
                gem: 700,
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
