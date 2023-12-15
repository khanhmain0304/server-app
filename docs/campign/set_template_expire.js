module.exports = {
    post: {
        tags: ["Campaign"],
      summary: "Set Template Expire",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                "template": 5,
                "expire": 1700698465
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
                data: {},
              },
            },
          },
        },
      },
    },
  };
  