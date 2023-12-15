module.exports = {
  post: {
    tags: ["Gadget"],
    summary: "Equip",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              slot: "defense_2",
              id: "64d1f558dfc1a3a7e3257074",
            },
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
                id: "6465e46099b7c16cce0c90e0",
                seq_id: 101,
                email: "khanh99@gmail.com",
                id_avatar: 100,
                id_frame: 5,
                energy: 160,
                gem: 57455,
                gold: 1021500,
                avatar: [],
                frame: [],
                level: 21,
                exp: 4091,
                silver_key: 6,
                gold_key: 119,
                s_key: 0,
                dna: 1,
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
                skip_ads: true,
                is_claim_first_time_iap: true,
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
