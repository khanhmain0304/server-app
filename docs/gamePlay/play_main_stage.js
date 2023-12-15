module.exports = {
  post: {
    tags: ["Game"],
    summary: "Play main stage",
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
                energy: 25,
                gem: 10190,
                max_energy_amount: 30,
                energy_gem_remain: 3,
                energy_ads_remain: 3,
                last_energy_regen_date: 1682565030,
                next_energy_regen_date: 1682566230,
                cost: [
                  {
                    price_type: "Ads",
                    value: 0,
                    buy_limit_per_day: -1,
                    price_rarity: 3,
                  },
                  {
                    price_type: "ReviveToken",
                    value: 1,
                    buy_limit_per_day: -1,
                    price_rarity: 3,
                  },
                ],
                game_session_id: "9d703dea-eef9-4328-b405-643ce4ac29b7",
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
