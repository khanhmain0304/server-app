module.exports = {
  post: {
    tags: ["User"],
    summary: "loginGuest",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              userId: "empty = register",
              password: "123456",
              version: "1.0.1",
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
                id: "6267b32727598e56f2d2e8b5",
                seq_id: 5,
                avatar_url: null,
                first_name: null,
                last_name: null,
                location: null,
                dob: "2022-04-26T08:53:59.845Z",
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
                created_date: "2022-04-26T08:53:59.845Z",
                jwt_token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2N2IzMjcyNzU5OGU1NmYyZDJlOGI1IiwiYWNjb3VudF90eXBlIjoiZ3Vlc3QiLCJpYXQiOjE2NTA5NjMyNzYsImV4cCI6MTY1MTA0OTY3Nn0.2xk-_Em3JhLCav2UyE5SHG6fN_3By01XaM6v7L-9F0U",
                login_session_id: "e34daac3-f930-4925-a56a-c6b7b362a9fa",
              },
            },
          },
        },
      },
    },
  },
};
