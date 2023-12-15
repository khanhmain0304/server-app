module.exports = {
  // method of operation
  post: {
    tags: ["User"],
    summary: "login",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              email: "namnh@gmail.com",
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
                id: "6412a4958da02f091ab6b286",
                seq_id: 0,
                email: "namnh2@gmail.com",
                id_avatar: 100,
                id_frame: 5,
                energy: 30,
                gem: 0,
                gold: 0,
                level: 0,
                exp: 0,
                first_name: null,
                last_name: null,
                location: null,
                dob: "2023-03-16T05:09:41.035Z",
                account_type: "email",
                title: null,
                comment: null,
                rank: null,
                friend_ids: [],
                blocked_user_ids: [],
                is_first_time_login: false,
                items: [],
                created_date: "2023-03-16T05:09:41.035Z",
                jwt_token:
                  "eyJhbfsdfdGciOiJIUzI1NifdIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQxMmE0OTU4ZGEwMmYwOTFhYjZiMjg2IiwiZW1haWwiOiJuYW1uaDJAZ21haWwuY29tIiwiaWF0IjoxNjc5MDIyMDgwLCJleHAiOjE2NzkxMDg0ODB9.tevzg3CVVWnZWk9RxFbJ-Wz3ZjKF7tOUUJ13xXov20U",
                login_session_id: "e34daac3-f930-4925-a56a-c6b7b362a9fa",
              },
            },
          },
        },
      },
      400: {
        description: "Bad Request",
        content: {
          "application/json": {
            examples: {
              error1: {
                summary: "Email, password are required",
                value: {
                  error_code: 1,
                  data: {
                    message: "email, password are required!",
                  },
                },
              },
              error2: {
                summary: "Invalid Credentials",
                value: {
                  error_code: 1,
                  data: {
                    message: "Invalid Credentials",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
