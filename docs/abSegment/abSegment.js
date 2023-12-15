module.exports = {
  post: {
    tags: ["ABSegment"],
    summary: "Get ABSegment",
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
              ab_test_segment: "2.1",
              game_version: "199",
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
                segment_id: "default",
                game_version: "default",
                normal_chest_2_ads: false,
                normal_chest_5_ads: false,
                rare_chest_1_day: false,
                rare_chest_2_day: false,
                gold_2_ad: false,
                gold_5_ad: false,
                revive_5: false,
                revive_1: false,
                revive_monthly: false,
                reroll_per_battle: false,
                reroll_per_level: false,
                reroll_no_limit: false,
                x_2_reward: false,
                x_n_reward: false,
                x_2_gold_chest: false,
                blue_revolver: false,
                purple_gauntlet: false,
                gold_popup: false,
                chapter_9_min: false,
                kick_start_299: false,
                kick_start_499: false,
                kick_start_shop: false,
                packages_rework: false,
                new_packages: false,
                newbie_starter_price_up: false,
                gems_pack_bonus_up: false,
                monthly_card_rework: false,
                first_time_reward_redesign: false,
                starter_pack_chap1: false,
                make_gif_video: false,
                forced_lose_chap1: false,
                endless_goodies: false,
                live_ops_3: false,
                checkpoint: false,
                no_evo: false,
                limit_pool_skill: false,
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
