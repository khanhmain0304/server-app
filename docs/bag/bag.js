module.exports = {
  get: {
    tags: ["Bag"],
    summary: "Get My Bag",
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
                    content: "Dna",
                    item_id: 2400004,
                    item_name: "DNA Token",
                    item_type: "Dna",
                    item_description: "Upgrades Key Evolution",
                    item_current_rarity: 7,
                    display_in_bag: true,
                    value: 100,
                  },
                  {
                    content: "Key",
                    item_id: 2400005,
                    item_name: "Silver Key",
                    item_type: "Key",
                    item_description: "Opens Army Crate",
                    item_current_rarity: 3,
                    display_in_bag: true,
                    value: 0,
                  },
                  {
                    content: "Key",
                    item_id: 2400006,
                    item_name: "Gold Key",
                    item_type: "Key",
                    item_description: "Opens EDF Supply Crate",
                    item_current_rarity: 4,
                    display_in_bag: true,
                    value: 0,
                  },
                  {
                    content: "ReviveToken",
                    item_id: 2400007,
                    item_name: "Revive Token",
                    item_type: "ReviveToken",
                    item_description: "Miracle token that revives people",
                    item_current_rarity: 4,
                    display_in_bag: true,
                    value: 10,
                  },
                  {
                    content: "Key",
                    item_id: 2400008,
                    item_name: "S key",
                    item_type: "Key",
                    item_description: "Opens S Supply Crate",
                    item_current_rarity: 7,
                    display_in_bag: true,
                    value: 0,
                  },
                  {
                    content: "Design",
                    item_id: 2400009,
                    item_name: "Weapon Design",
                    item_type: "Weapon",
                    item_description: "Used to level up weapons",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 10,
                  },
                  {
                    content: "Design",
                    item_id: 2400010,
                    item_name: "Armor Design",
                    item_type: "Armor",
                    item_description: "Used to level up armors",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 10,
                  },
                  {
                    content: "Design",
                    item_id: 2400011,
                    item_name: "Necklace Design",
                    item_type: "Necklace",
                    item_description: "Used to level up necklaces",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 13,
                  },
                  {
                    content: "Design",
                    item_id: 2400012,
                    item_name: "Belt Design",
                    item_type: "Belt",
                    item_description: "Used to level up belts",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 11,
                  },
                  {
                    content: "Design",
                    item_id: 2400013,
                    item_name: "Gloves Design",
                    item_type: "Gloves",
                    item_description: "Used to level up gloves",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 10,
                  },
                  {
                    content: "Design",
                    item_id: 2400014,
                    item_name: "Shoes Design",
                    item_type: "Shoes",
                    item_description: "Used to level up shoes",
                    item_current_rarity: 1,
                    display_in_bag: true,
                    value: 10,
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
};
