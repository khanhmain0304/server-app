module.exports = {
  get: {
    tags: ["Game Config"],
    summary: "",
    parameters: [
      {
        name: "client_id",
        in: "path",
        required: true,
        description: "client_id",
        schema: {
          type: "string",
        },
        example: "1.0.1",
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
                config: [
                  {
                    name: "cameras",
                    version: "default",
                    md5: "a2c3afbdf7107fe3b5899531033c9554",
                  },
                  {
                    name: "character",
                    version: "default",
                    md5: "4dc28e929e67e7fd34ee41eaba6bfbeb",
                  },
                  {
                    name: "reward",
                    version: "default",
                    md5: "38d1bc64ab7845cec0ed85f6dd044925",
                  },
                  {
                    name: "skill",
                    version: "default",
                    md5: "5fe1fdea2a31df22ad80fbcaedce27b0",
                  },
                  {
                    name: "user",
                    version: "default",
                    md5: "0db912e4e068f350b562d8e82f40a974",
                  },
                  {
                    name: "weapon",
                    version: "default",
                    md5: "cc914432b59718fa7c12d6dea5390f51",
                  },
                  {
                    name: "evolve",
                    version: "default",
                    md5: "f8391f9ea7bf9f6b15f67ec555378202",
                  },
                  {
                    name: "shop",
                    version: "default",
                    md5: "41fce1b99eded4cf79cf4269668765c5",
                  },
                  {
                    name: "crate",
                    version: "default",
                    md5: "e422314534cde0ab572f8f7bfefc77db",
                  },
                  {
                    name: "equipment_main_stats",
                    version: "default",
                    md5: "5b17da9bf44e034c3e17389f25201e6d",
                  },
                  {
                    name: "equipment_lvl_up",
                    version: "default",
                    md5: "3a8b552ecd53d61df7a33dae61039c06",
                  },
                  {
                    name: "equipment_mere_rule",
                    version: "default",
                    md5: "9c556b50ff65adb27a9ef8ffcc3d6910",
                  },
                  {
                    name: "equipment_rarity",
                    version: "default",
                    md5: "2dc2465d5ca13308575d97845c038b18",
                  },
                  {
                    name: "energy",
                    version: "default",
                    md5: "4a74a2868dddc7427c5cb0d764801ab4",
                  },
                  {
                    name: "player_account_level",
                    version: "default",
                    md5: "57680b54c809c18d559286991d2b7aa9",
                  },
                  {
                    name: "offline_earning",
                    version: "default",
                    md5: "9ab17234b11bfd3a11f8d3b2fbff3d87",
                  },
                  {
                    name: "stage",
                    version: "default",
                    md5: "02c5cfe09b56b0bf71725b7148700ef0",
                  },
                  {
                    name: "item_config",
                    version: "default",
                    md5: "c0f299e749ba6d05322cc35ed60d3332",
                  },
                  {
                    name: "enemy",
                    version: "default",
                    md5: "5e59462c733ddfed6ff65057c9c687f0",
                  },
                  {
                    name: "go_now",
                    version: "default",
                    md5: "ff2b640f458c5146e751eb9ca1702055",
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
