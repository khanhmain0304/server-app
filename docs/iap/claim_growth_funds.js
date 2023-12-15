module.exports = {
  post: {
    tags: ["Growth Funds"],
    summary: "Claim Growth Funds Reward",
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
              pack_id: 30001031,
              level_required: 5,
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
                    level_required: 10,
                    content: "Gold",
                    item_id: 2400003,
                    item_name: "Gold",
                    item_type: "Gold",
                    item_description: "Gold",
                    item_current_rarity: 3,
                    is_supper: false,
                    display_in_bag: false,
                    value: 15000,
                  },
                ],
                growth_funds: [
                  {
                    _id: 30001031,
                    pack_id: 30001031,
                    pack_name: "Free",
                    progress: [7, 5, 10],
                    status: true,
                  },
                  {
                    _id: 30001032,
                    pack_id: 30001032,
                    pack_name: "Premium",
                    progress: [5, 7],
                    status: true,
                  },
                  {
                    _id: 30001033,
                    pack_id: 30001033,
                    pack_name: "Super",
                    progress: [],
                    status: true,
                  },
                ],
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 50,
                  gem: 34750,
                  gold: 56400,
                  avatar: [],
                  frame: [],
                  level: 10,
                  exp: 5510,
                  silver_key: 3,
                  gold_key: 0,
                  s_key: 0,
                  first_name: "Quoc",
                  last_name: "Khanh",
                  location: null,
                  dob: "2023-05-18T08:40:00.745Z",
                  account_type: "email",
                  title: null,
                  comment: null,
                  rank: null,
                  friend_ids: [],
                  blocked_user_ids: [],
                  is_first_time_login: false,
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
