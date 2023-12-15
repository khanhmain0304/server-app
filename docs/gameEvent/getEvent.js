module.exports = {
  get: {
    tags: ["Event"],
    summary: "Get event",
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
              data: [
                {
                  event_id: 3000001,
                  event_type: "RookieLoginGifts",
                  event_title: "Rookie Login Gifts",
                  event_description: "Log in daily to claim your 7-Days limited-time Rookie gifts!",
                  event_start_condition: 0,
                  event_start_date: 0,
                  event_end_date: 0,
                  event_start_condition_value: 0,
                  event_expiry_value: 114800,
                  event_special_condition: [
                    {
                      condition_type: 1,
                      condition_value: 2,
                    },
                  ],
                  task_point: 0,
                  tabs: [
                    {
                      tab_name: "RookieLoginGifts",
                      conditions: [
                        {
                          condition_type: 3,
                          condition_value: 1,
                        },
                      ],
                      status: 0,
                      tasks: [
                        {
                          task_name: "Login for 1d",
                          conditions: [
                            {
                              condition_type: 3,
                              condition_value: 1,
                            },
                          ],
                          status: 0,
                          item_list: [
                            {
                              content: "ReviveToken",
                              item_id: 2400007,
                              item_name: "Revive Token",
                              item_type: "ReviveToken",
                              item_description: "Miracle token that revives people",
                              item_current_rarity: 4,
                              value: 1,
                              _id: "6433d31c47ce2401daa69e0f",
                            },
                            {
                              content: "Energy",
                              item_id: 2400015,
                              item_name: "Energy",
                              item_type: "Energy",
                              item_description: "Energy",
                              item_current_rarity: 3,
                              value: 5,
                              _id: "6433d31c47ce2401daa69e10",
                            },
                          ],
                          _id: "6433d31c47ce2401daa69e0e",
                        },
                      ],
                      _id: "6433d31c47ce2401daa69e0d",
                    },
                  ],
                },
              ],
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
