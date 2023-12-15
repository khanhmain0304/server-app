module.exports = {
  post: {
    tags: ["Test"],
    summary: "add_equipment_test",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "item_id": 1110002,
              "rarity": 1
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
                id: "62593abc2369eed15190d4d6",
                seq_id: 9,
                email: "namnh@gmail.com",
                avatar_url:
                  "https://storage.googleapis.com/ae-user-avatar-test/6a8bb42f-0d86-46aa-91a9-042ebeb5bc68.jpg",
                avatar_name: null,
                first_name: "NMG",
                last_name: "Game",
                location: null,
                dob: "2002-12-09T00:00:00.000Z",
                title: null,
                comment: null,
                rank: null,
                card_skin: 0,
                character: {
                  species: 0,
                  body_type: 0,
                  skin_tone: 0,
                  face: 0,
                  eyes: 0,
                  eyes_color: 0,
                  hair: 0,
                  hair_color: 0,
                  nose: 0,
                  mouth: 0,
                  cheeks: 0,
                },
                friend_ids: [],
                blocked_user_ids: [],
                created_date: "2022-04-15T09:28:28.014Z",
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
