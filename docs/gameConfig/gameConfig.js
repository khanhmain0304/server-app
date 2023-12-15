module.exports = {
  get: {
    tags: ["Game Config"],
    summary: "",
    parameters: [
      {
        name: "name",
        in: "path",
        required: true,
        description: "stage|stages_9min|cameras|character|character_9min|enemy|reward|skill|user|weapon|equipment_main_stats|evolve|equipment_main_stats|equipment_lvl_up|equipment_mere_rule|equipment_rarity|player_account_level|gold_mine|main_quest_boss_image|tip_and_trick",
        schema: {
          type: "string",
        },
        example: "reward",
      },
      {
        name: "version",
        in: "path",
        required: true,
        description: "version",
        schema: {
          type: "string",
        },
        example: "default",
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
                name: "reward",
                file_name: "reward.json",
                version: 0,
                md5: "38d1bc64ab7845cec0ed85f6dd044925",
                config: {
                  skill_chest_reward: [
                    {
                      id: 0,
                      reward_item: 1,
                      weight: 70,
                    },
                    {
                      id: 1,
                      reward_item: 3,
                      weight: 20,
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};
