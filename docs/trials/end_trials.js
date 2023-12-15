module.exports = {
  post: {
    tags: ["Trials"],
    summary: "End Trials",
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
              stage_id: 1000000,
              status: 2,
              difficulty_level: 1,
              enemy: 1000,
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
                user: {
                  id: "6462ef4232bafff67b1b9f15",
                  seq_id: 99,
                  email: "khanh343434@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 30,
                  gem: 200,
                  gold: 10000,
                  avatar: [],
                  frame: [],
                  level: 1,
                  exp: 0,
                  silver_key: 1,
                  gold_key: 0,
                  s_key: 0,
                  first_name: "Quoc",
                  last_name: "Khanh",
                  location: null,
                  dob: "2023-05-16T02:49:38.094Z",
                  account_type: "email",
                  title: null,
                  comment: null,
                  rank: null,
                  friend_ids: [],
                  blocked_user_ids: [],
                  is_first_time_login: true,
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
