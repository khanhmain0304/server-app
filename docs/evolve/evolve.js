module.exports = {
  patch: {
    tags: ["User"],
    summary: "Update Evolve",
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
      {
        name: "evolve_id",
        in: "path",
        schema: {
          type: "string",
        },
        example: "1",
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
                _id: "64197e7ad0efc36aee8d953f",
                seq_id: 68,
                email: "khanh090909@gmail.com",
                password:
                  "$2b$10$Q4upmc2giwG3BaXhzrXsI.fuWNrAYPdKiNqADtRQ5xUeO5dLyhZa.",
                id_avatar: 100,
                id_frame: 5,
                energy: 30,
                gem: 0,
                gold: 40000,
                dna: 7,
                level: 0,
                exp: 0,
                first_name: "Quoc",
                last_name: "Khanh",
                location: null,
                account_type: "email",
                title: null,
                comment: null,
                rank: null,
                friend_ids: [],
                blocked_user_ids: [],
                evolve: {
                  current_level: 6,
                  current_evolve_id: 16,
                  current_key_evolve_id: 3,
                  _id: "64197e7ad0efc36aee8d953a",
                  bonus_stats: [
                    {
                      _id: "64197e7ad0efc36aee8d953b",
                      stat_type: "HP",
                      value: 70,
                    },
                    {
                      _id: "64197e7ad0efc36aee8d953c",
                      stat_type: "ATK",
                      value: 14,
                    },
                    {
                      _id: "64197e7ad0efc36aee8d953d",
                      stat_type: "Armor",
                      value: 8,
                    },
                    {
                      _id: "64197e7ad0efc36aee8d953e",
                      stat_type: "Meat heal",
                      value: 50,
                    },
                  ],
                  key_evolve: [
                    {
                      key_evolve_id: 1,
                      name: "Lucky Dog",
                      mechanics: "Get 1 skill when battle starts",
                      description: "The lucky are favored by Him",
                      _id: "641a67aa450b733492d15f91",
                    },
                  ],
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
                  message: "User Not Found!",
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
  },
};
