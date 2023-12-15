module.exports = {
  get: {
    tags: ["Trials"],
    summary: "Get Trials",
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
                stage_id: 1000000,
                chapter_name: "Dead City",
                stages_data: [
                  {
                    status: 0,
                    difficulty_level: 1,
                    difficult_type: [2500001],
                    item_list: [
                      {
                        content: "Gem",
                        item_id: 2400002,
                        item_name: "Gem",
                        item_type: "Gem",
                        item_description: "Gem",
                        item_current_rarity: 4,
                        is_supper: false,
                        display_in_bag: false,
                        value: 200,
                      },
                    ],
                  },
                  {
                    status: 0,
                    difficulty_level: 2,
                    difficult_type: [2500001, 2500002, 2500003],
                    item_list: [
                      {
                        content: "Dna",
                        item_id: 2400004,
                        item_name: "DNA Token",
                        item_type: "Dna",
                        item_description: "Upgrades Key Evolution",
                        item_current_rarity: 7,
                        is_supper: false,
                        display_in_bag: true,
                        value: 1,
                      },
                    ],
                  },
                  {
                    status: 0,
                    difficulty_level: 3,
                    difficult_type: [2500001, 2500002, 2500003, 2500004, 2500005],
                    item_list: [
                      {
                        content: "Gem",
                        item_id: 2400002,
                        item_name: "Gem",
                        item_type: "Gem",
                        item_description: "Gem",
                        item_current_rarity: 4,
                        is_supper: false,
                        display_in_bag: false,
                        value: 200,
                      },
                      {
                        content: "Dna",
                        item_id: 2400004,
                        item_name: "DNA Token",
                        item_type: "Dna",
                        item_description: "Upgrades Key Evolution",
                        item_current_rarity: 7,
                        is_supper: false,
                        display_in_bag: true,
                        value: 1,
                      },
                    ],
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
