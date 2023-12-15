module.exports = {
  get: {
    tags: ["Gadget"],
    summary: "Get all gadget info",
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
                gadgets: [
                  {
                    content: "Gadget",
                    item_id: 2160001,
                    item_name: "Booster Device",
                    item_type: 2,
                    item_relate_skill: [1120001],
                    item_current_rarity: 1,
                    item_bonus_hp: 100,
                    item_bonus_atk: 0,
                    item_effect: ["HP +120", "Hammer: penetrares all enemies", "HP +800", "Mjornir: spins when flying out"],
                    item_effect_bonus: [],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
