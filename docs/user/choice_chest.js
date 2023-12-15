module.exports = {
  get: {
    tags: ["User"],
    summary: "Get previous choice chest",
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
        name: "x-access-token",
        in: "path",
        schema: {
          type: "string",
        },
        example: 2400045,
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
                item_list: [
                  {
                    content: "Equipment",
                    item_id: 1110003,
                    item_name: "Light Savior",
                    item_type: "Weapon",
                    item_description: "Was crafted on May 4th.",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2130002,
                    item_name: "Immortal Suit",
                    item_type: "Armor",
                    item_description: "Mysterious technology of a higher life form.",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 1110010,
                    item_name: "Black Hole Cannon",
                    item_type: "Weapon",
                    item_description: "The end of everything.",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2110005,
                    item_name: "Immortal Necklace",
                    item_type: "Necklace",
                    item_description: "I am power, eternal!",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2120005,
                    item_name: "Immortal Gloves",
                    item_type: "Gloves",
                    item_description: "You can put some stones on it",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2140005,
                    item_name: "Immortal Belt",
                    item_type: "Belt",
                    item_description: "It even fits dad's bod!",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                  },
                  {
                    content: "Equipment",
                    item_id: 2150005,
                    item_name: "Immortal Boots",
                    item_type: "Shoes",
                    item_description: "Scorching earth beneath your feet",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
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
  post: {
    tags: ["User"],
    summary: "Choose Item From Choice Chest",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              items: [
                {
                  content: "Equipment",
                  item_id: 1110003,
                  item_name: "Light Savior",
                  item_type: "Weapon",
                  item_description: "Was crafted on May 4th.",
                  item_current_rarity: 4,
                  is_supper: true,
                  item_super: true,
                  display_in_bag: false,
                },
              ],
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
                item_list: [
                  {
                    content: "Equipment",
                    item_id: 2130002,
                    item_name: "Immortal Suit",
                    item_type: "Armor",
                    item_description: "Mysterious technology of a higher life form.",
                    item_current_rarity: 4,
                    is_supper: true,
                    item_super: true,
                    display_in_bag: false,
                    value: 1,
                  },
                ],
                user: {
                  id: "6465e46099b7c16cce0c90e0",
                  seq_id: 101,
                  email: "khanh99@gmail.com",
                  id_avatar: 100,
                  id_frame: 5,
                  energy: 105,
                  gem: 46330,
                  gold: 1497700,
                  avatar: [],
                  frame: [],
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
