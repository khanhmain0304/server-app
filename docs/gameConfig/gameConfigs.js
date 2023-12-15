module.exports = {
  post: {
    tags: ["Game Config"],
    summary: "",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: [
              {
                name: "stage",
                version: "default",
              },
              {
                name: "cameras",
                version: "default",
              },
            ],
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
              errorCode: 0,
              data: {
                weapon: {
                  name: "weapon",
                  file_name: "weapon.json",
                  version: 0,
                  md5: "cc914432b59718fa7c12d6dea5390f51",
                  config: {
                    weapons: [],
                  },
                },
                cameras: {
                  name: "cameras",
                  file_name: "cameras.json",
                  version: 0,
                  md5: "a2c3afbdf7107fe3b5899531033c9554",
                  config: {
                    cameras: [
                      {
                        stage_type: "open",
                        zoom_times: 0,
                        camera_size: 15.7,
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
  },
};
