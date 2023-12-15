module.exports = {
    post: {
        tags: ["User"],
        summary: "register",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "namnh@gmail.com",
                  password: "123456",
                  first_name: "Nam",
                  last_name: "Nguyen",
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
                    id: "61e783ca6a5e546a3d1af91c",
                    seq_id: 8,
                    email: "namnh@gmail.com",
                    first_name: "Nam",
                    last_name: "Nguyen",
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzNDlEMDA4RWM4QzIzZkNhQ0FDQzdiNzY3YjE3Y2YyMUY4MGQ2MDUwMSIsInVzZXJfaWQiOiI2MWYxODE4MGRhNDNlODkxYmIwN2E2NmIiLCJlbWFpbCI6Im5hbW5oNEBnbWFpbC5jb20iLCJpYXQiOjE2NDMyMTcyODAsImV4cCI6MTY0MzMwMzY4MH0.yU7K_f7YUGD_FEH0c1IU4_OK_FIIxOw0qAM_RTRXR8A",
                  },
                },
              },
            },
          },
        },
      },
}