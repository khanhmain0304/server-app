module.exports = {
    post: {
      tags: ["Equipment"],
      summary: "equip",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                "weapon": "641be8de7e1c00c9f5513e53",
                "necklace": "641beb9b311faeab1c3c3173"
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
  