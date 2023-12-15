module.exports = {
  openapi: "3.0.0",
  info: {
    title: "WWZ API",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://ac2d7568a803c4aa9a7229b99f49f547-1801111124.us-west-2.elb.amazonaws.com/",
      description: "[Test Domain]",
    },
    {
      url: "http://localhost:5000/",
      description: "[Local server]",
    },
  ],
  tags: [
    {
      name: "Email",
      description: "Operations about Email",
    },
    {
      name: "NFT",
      description: "Operations about NFT",
    },
    {
      name: "User",
      description: "Operations about user",
    },
    {
      name: "Test",
      description: "Operations about test",
    },
  ],
  paths: {
    "/api/v1/inventory/item": {
      get: {
        tags: ["NFT"],
        summary: "Get User Item",
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
                  data: [
                    {
                      id: 1,
                      description: "Description for item: Bubble Headband",
                      name: "Bubble Headband",
                      image: "https://cdn.wwz.io/item/Set01_Helmet.png",
                      strength: 0,
                      agility: 0,
                      intelligence: 0,
                      version: 1,
                      part_id: 1,
                      set_num: 1,
                      set: "Set01",
                      traits_no: 1,
                      slot: "Helmet",
                      traits_id: "Set01_Helmet",
                      rarity: 10,
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/inventory/nft": {
      get: {
        tags: ["NFT"],
        summary: "Get User NFT - FAKE",
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
                  data: [
                    {
                      id: 1,
                      render_id: 4931,
                      description: "Description for Set number 4931",
                      image: "https://cdn.wwz.io/nft/4931.mp4",
                      thumbnail: "https://cdn.wwz.io/thumbnail/4931.gif",
                      items: [
                        {
                          id: 12,
                          description: "Description for item: O+",
                          name: "O+",
                          image: "https://cdn.wwz.io/item/Set01_Blood.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 12,
                          set_num: 1,
                          set: "Set01",
                          traits_no: 12,
                          slot: "Blood_type",
                          traits_id: "Set01_Blood",
                          rarity: 38,
                        },
                        {
                          id: 13,
                          description: "Description for item: Bright Skin",
                          name: "Bright Skin",
                          image: "https://cdn.wwz.io/item/Set01_SkinC.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 13,
                          set_num: 1,
                          set: "Set01",
                          traits_no: 13,
                          slot: "Color",
                          traits_id: "Set01_SkinC",
                          rarity: 4.2,
                        },
                        {
                          id: 14,
                          description: "Description for item: Human",
                          name: "Human",
                          image: "https://cdn.wwz.io/item/Set01_DNA.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 14,
                          set_num: 1,
                          set: "Set01",
                          traits_no: 14,
                          slot: "Species",
                          traits_id: "Set01_DNA",
                          rarity: 6.66,
                        },
                        {
                          id: 23,
                          description: "Description for item: Triad Wristband",
                          name: "Triad Wristband",
                          image: "https://cdn.wwz.io/item/Set02_Gloves.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 23,
                          set_num: 2,
                          set: "Set02",
                          traits_no: 9,
                          slot: "Gloves",
                          traits_id: "Set02_Gloves",
                          rarity: 9,
                        },
                        {
                          id: 54,
                          description: "Description for item: undefined",
                          name: "",
                          image: "https://cdn.wwz.io/item/Set05_Helmet.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 57,
                          set_num: 5,
                          set: "Set05",
                          traits_no: 1,
                          slot: "Helmet",
                          traits_id: "Set05_Helmet",
                          rarity: 10,
                        },
                        {
                          id: 56,
                          description: "Description for item: Burning Eye",
                          name: "Burning Eye",
                          image: "https://cdn.wwz.io/item/Set05_EyeC.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 59,
                          set_num: 5,
                          set: "Set05",
                          traits_no: 3,
                          slot: "Eye_Color",
                          traits_id: "Set05_EyeC",
                          rarity: 20,
                        },
                        {
                          id: 121,
                          description: "Description for item: Pilot Shoes",
                          name: "Pilot Shoes",
                          image: "https://cdn.wwz.io/item/Set10_Shoes.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 136,
                          set_num: 10,
                          set: "Set10",
                          traits_no: 10,
                          slot: "Shoes",
                          traits_id: "Set10_Shoes",
                          rarity: 9,
                        },
                        {
                          id: 137,
                          description: "Description for item: Sailor Shirt",
                          name: "Sailor Shirt",
                          image: "https://cdn.wwz.io/item/Set12_Top.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 160,
                          set_num: 12,
                          set: "Set12",
                          traits_no: 6,
                          slot: "Top",
                          traits_id: "Set12_Top",
                          rarity: 5,
                        },
                        {
                          id: 169,
                          description: "Description for item: Shadow Jogger",
                          name: "Shadow Jogger",
                          image: "https://cdn.wwz.io/item/Set15_Bottom.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 204,
                          set_num: 15,
                          set: "Set15",
                          traits_no: 8,
                          slot: "Bottom",
                          traits_id: "Set15_Bottom",
                          rarity: 5,
                        },
                        {
                          id: 172,
                          description: "Description for item: Snow Field",
                          name: "Snow Field",
                          image: "https://cdn.wwz.io/item/Set15_BG.png",
                          strength: 0,
                          agility: 0,
                          intelligence: 0,
                          version: 1,
                          part_id: 207,
                          set_num: 15,
                          set: "Set15",
                          traits_no: 11,
                          slot: "Background",
                          traits_id: "Set15_BG",
                          rarity: 7,
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/subscribe/{email}/{name}": {
      get: {
        tags: ["Email"],
        summary: "",
        parameters: [
          {
            name: "email",
            in: "path",
            required: true,
            description: "email",
            schema: {
              type: "string",
            },
            example: "test@gmail.com",
          },
          {
            name: "name",
            in: "path",
            required: false,
            description: "name",
            schema: {
              type: "string",
            },
            example: "Namnh",
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
                    id: "6268ebe4bbfdd64d6dcf6ef1",
                    seq_id: 0,
                    email: "namnh1@gmail.com",
                    unsubscribe: false,
                    created_date: "2022-04-27T07:08:20.495Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/avatar": {
      post: {
        tags: ["User"],
        summary: "Upload avatar",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  avatar: {
                    type: "string",
                    format: "base64",
                  },
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
                    id: "62626d3914e321d09230d248",
                    seq_id: 3,
                    email: "namnh@gmail.com",
                    avatar_url:
                      "https://storage.googleapis.com/ae-user-avatar-test/d2954bab-57c2-4773-be6d-8cbdaac9705f.jpg",
                    first_name: "nam",
                    last_name: "nh55555",
                    location: null,
                    dob: "2022-04-22T08:54:17.904Z",
                    title: null,
                    comment: null,
                    rank: null,
                    card_skin: 0,
                    character: {
                      species: 0,
                      body_type: 0,
                      skin_tone: 0,
                      face: 0,
                      eyes: 0,
                      eyes_color: 0,
                      hair: 0,
                      hair_color: 0,
                      nose: 0,
                      mouth: 0,
                      cheeks: 0,
                    },
                    created_date: "2022-04-22T08:54:17.904Z",
                  },
                },
              },
            },
          },
        },
      },
    },
    ///
    "/metadata/{nftId}": {
      get: {
        tags: ["NFT"],
        summary: "",
        parameters: [
          {
            name: "nftId",
            in: "path",
            required: true,
            description: "nftId",
            schema: {
              type: "number",
            },
            example: "1",
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                example: {},
              },
            },
          },
        },
      },
    },
    // "/api/v1/set/{setId}": {
    //   get: {
    //     tags: ["NFT"],
    //     summary: "",
    //     parameters: [
    //       {
    //         name: "setId",
    //         in: "path",
    //         required: true,
    //         description: "Set Id",
    //         schema: {
    //           type: "string"
    //         },
    //         example: "2ce789a263bea8f81d8542583cd16ccd415ef5a4"
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: "Successful response",
    //         content: {
    //           "application/json": {
    //             example: {
    //               id: 2,
    //               description: "Description for Set number 2",
    //               name: "Set 2",
    //               image: "https://via.placeholder.com/256",
    //               items: [
    //                 {
    //                   id: 1,
    //                   description: "Description for item number 1",
    //                   name: "Item 1",
    //                   image: "https://via.placeholder.com/256",
    //                   strength: 0,
    //                   agility: 4,
    //                   intelligence: 2,
    //                 },
    //                 {
    //                   id: 2,
    //                   description: "Description for item number 2",
    //                   name: "Item 2",
    //                   image: "https://via.placeholder.com/256",
    //                   strength: 0,
    //                   agility: 4,
    //                   intelligence: 2,
    //                 },
    //               ],
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    "/api/v1/linkOTP": {
      post: {
        tags: ["NFT"],
        summary: "linkOTP",
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
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  otpCode:
                    "7BfAx8VH9wmMbYh5wEvBkQ2RUYzRT3cCF51EoUXgDK7ZC49EYn9Zdb5dn6NX2weTfeie9ADWEffnQaPVFNrH5kX1yF5csvRd1SJG1bDvKMqnwjN3is9Dvjh1GHUhpkxRCiPfMTptJiBwu9r3ebUUEfhgvaj8z4B7V7N2MvjRpfaz5wT3KKFFBkuzMFfn3qiipbWf84XxiDYnrymTy6GqAnL2czEiqpZTmVGH3Cb",
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
                    id: "61b6fa6585973498a3035a99",
                    createdAt: "2021-12-13T14:46:45.044+07:00",
                    updatedAt: "2021-12-13T14:46:45.044+07:00",
                    address: "string",
                    accountInGameId: "string",
                    balance: 0,
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/verifyMintNFT": {
      post: {
        tags: ["NFT"],
        summary: "verifyMintNFT",
        parameters: [
          {
            name: "x-signature",
            in: "header",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  address: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d6051",
                  itemId: 1,
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
                  is_valid: true,
                  token_uri: "http://example.com/metadata/1",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/notifyEvent": {
      post: {
        tags: ["NFT"],
        summary: "notifyEvent",
        parameters: [
          {
            name: "x-signature",
            in: "header",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  event_name: "NFTMinted",
                  chain_id: 1,
                  data: {
                    address: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d6051",
                    rarity: 1,
                    itemId: 5,
                  },
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
                    id: 5,
                    seq_id: 1,
                    set_id: "a2d282b6e47a2f8d1c0f3b91f612bded8f49125b",
                    set_seq_id: 5,
                    owner: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d6051",
                    rarity: 1,
                    chain_id: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
    ///
    "/api/v1/register": {
      post: {
        tags: ["User"],
        summary: "register",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "namnh1@gmail.com",
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
    },
    "/api/v1/loginWallet": {
      post: {
        tags: ["User"],
        summary: "register wallet",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  address: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d6050",
                  signature:
                    "0x6dcba66ea08e4fd7086a25a9bb5d39e5f51c3b3c34bdae61a411d4d54d544e87192e05736ec698a90184dd94436e786485033c5415da04def3fe5b0edbd174921c",
                  message: "this is a test text",
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
                    address: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d6050",
                    id: "6200e1fc77d94adceb892b2e",
                    seq_id: 2,
                    first_name: null,
                    last_name: null,
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgzNDlEMDA4RWM4QzIzZkNhQ0FDQzdiNzY3YjE3Y2YyMUY4MGQ2MDUwIiwidXNlcl9pZCI6IjYyMDBlMWZjNzdkOTRhZGNlYjg5MmIyZSIsImlhdCI6MTY0NDIzMTUxMCwiZXhwIjoxNjQ0MzE3OTEwfQ.yMt_lmHIavpO20TEGTcYHApVWsj1xRJVuE9B4UGxWck",
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
                    summary: "message, signature, address are required",
                    value: {
                      error_code: 9,
                      data: {
                        message: "message, signature, address are required",
                      },
                    },
                  },
                  error2: {
                    summary: "Verify Message Failed!",
                    value: {
                      error_code: 9,
                      data: {
                        message: "Verify Message Failed!",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/login": {
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
                    id: "61e6f8756206a5e07b238c25",
                    seq_id: 7,
                    email: "namnh@gmail.com",
                    first_name: "Nam",
                    last_name: "Nguyen",
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFlNmY4NzU2MjA2YTVlMDdiMjM4YzI1IiwiZW1haWwiOiJuYW1uaEBnbWFpbC5jb20iLCJpYXQiOjE2NDI1NjI2NDEsImV4cCI6MTY0MjY0OTA0MX0.3isXMlCJpU2Ya5mY-kEdL4TQ3GHgJT2ddFlAU72JlBs",
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
    },
    "/api/v1/loginGuest": {
      post: {
        tags: ["User"],
        summary: "loginGuest",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  userId: "6267b32727598e56f2d2e8b5",
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
                    id: "6267b32727598e56f2d2e8b5",
                    seq_id: 5,
                    avatar_url: null,
                    first_name: null,
                    last_name: null,
                    location: null,
                    dob: "2022-04-26T08:53:59.845Z",
                    title: null,
                    comment: null,
                    rank: null,
                    card_skin: 0,
                    character: {
                      species: 0,
                      body_type: 0,
                      skin_tone: 0,
                      face: 0,
                      eyes: 0,
                      eyes_color: 0,
                      hair: 0,
                      hair_color: 0,
                      nose: 0,
                      mouth: 0,
                      cheeks: 0,
                    },
                    created_date: "2022-04-26T08:53:59.845Z",
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2N2IzMjcyNzU5OGU1NmYyZDJlOGI1IiwiYWNjb3VudF90eXBlIjoiZ3Vlc3QiLCJpYXQiOjE2NTA5NjMyNzYsImV4cCI6MTY1MTA0OTY3Nn0.2xk-_Em3JhLCav2UyE5SHG6fN_3By01XaM6v7L-9F0U",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/publicProfile": {
      post: {
        tags: ["User"],
        summary: "publicProfile",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  userId: "6267b32727598e56f2d2e8b5",
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
                    id: "6267b32727598e56f2d2e8b5",
                    seq_id: 5,
                    avatar_url: null,
                    first_name: null,
                    last_name: null,
                    location: null,
                    dob: "2022-04-26T08:53:59.845Z",
                    title: null,
                    comment: null,
                    rank: null,
                    card_skin: 0,
                    character: {
                      species: 0,
                      body_type: 0,
                      skin_tone: 0,
                      face: 0,
                      eyes: 0,
                      eyes_color: 0,
                      hair: 0,
                      hair_color: 0,
                      nose: 0,
                      mouth: 0,
                      cheeks: 0,
                    },
                    created_date: "2022-04-26T08:53:59.845Z",
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2N2IzMjcyNzU5OGU1NmYyZDJlOGI1IiwiYWNjb3VudF90eXBlIjoiZ3Vlc3QiLCJpYXQiOjE2NTA5NjMyNzYsImV4cCI6MTY1MTA0OTY3Nn0.2xk-_Em3JhLCav2UyE5SHG6fN_3By01XaM6v7L-9F0U",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/linkGuest": {
      post: {
        tags: ["User"],
        summary: "linkGuest",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  email: "namnh_guest@gmail.com",
                  password: "123456",
                  first_name: "nam",
                  last_name: "nh5",
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
                    id: "6267b32727598e56f2d2e8b5",
                    seq_id: 5,
                    avatar_url: null,
                    first_name: null,
                    last_name: null,
                    location: null,
                    dob: "2022-04-26T08:53:59.845Z",
                    title: null,
                    comment: null,
                    rank: null,
                    card_skin: 0,
                    character: {
                      species: 0,
                      body_type: 0,
                      skin_tone: 0,
                      face: 0,
                      eyes: 0,
                      eyes_color: 0,
                      hair: 0,
                      hair_color: 0,
                      nose: 0,
                      mouth: 0,
                      cheeks: 0,
                    },
                    created_date: "2022-04-26T08:53:59.845Z",
                    jwt_token:
                      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2N2IzMjcyNzU5OGU1NmYyZDJlOGI1IiwiZW1haWwiOiJuYW1uaF9ndWVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NTA5NjQ2NzUsImV4cCI6MTY1MTA1MTA3NX0.gIgXmMYYY7YnREbm_xXt2fH0LdanPH1N8oo8gpplHwA",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/profile": {
      get: {
        tags: ["User"],
        summary: "Get profile",
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
                    address: "0x349D008Ec8C23fCaCACC7b767b17cf21F80d60501",
                    id: "61e6f8756206a5e07b238c25",
                    seq_id: 7,
                    email: "namnh@gmail.com",
                    first_name: "Nam",
                    last_name: "Nguyen",
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
        summary: "Update profile",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  first_name: "NMG",
                  last_name: "Game",
                  location: "",
                  dob: "2002-12-09",
                  card_skin: 0,
                  character: "",
                  comment: "",
                  title: "",
                  avatar_name: "",
                  character: {
                    species: 0,
                    body_type: 0,
                    skin_tone: 0,
                    face: 0,
                    eyes: 0,
                    eyes_color: 0,
                    hair: 0,
                    hair_color: 0,
                    nose: 0,
                    mouth: 0,
                    cheeks: 0,
                  },
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
                    id: "62593abc2369eed15190d4d6",
                    seq_id: 9,
                    email: "namnh@gmail.com",
                    avatar_url:
                      "https://storage.googleapis.com/ae-user-avatar-test/6a8bb42f-0d86-46aa-91a9-042ebeb5bc68.jpg",
                    avatar_name: null,
                    first_name: "NMG",
                    last_name: "Game",
                    location: null,
                    dob: "2002-12-09T00:00:00.000Z",
                    title: null,
                    comment: null,
                    rank: null,
                    card_skin: 0,
                    character: {
                      species: 0,
                      body_type: 0,
                      skin_tone: 0,
                      face: 0,
                      eyes: 0,
                      eyes_color: 0,
                      hair: 0,
                      hair_color: 0,
                      nose: 0,
                      mouth: 0,
                      cheeks: 0,
                    },
                    friend_ids: [],
                    blocked_user_ids: [],
                    created_date: "2022-04-15T09:28:28.014Z",
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
    },
    "/api/v1/change-password": {
      post: {
        tags: ["User"],
        summary: "change-password",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  password: "123456",
                  new_password: "abcdef",
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
                    id: "61e6f8756206a5e07b238c25",
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
                    summary: "Update pass failed",
                    value: {
                      error_code: 8,
                      data: {
                        message: "Update pass failed!",
                      },
                    },
                  },
                  error2: {
                    summary: "Password, New Password are required",
                    value: {
                      error_code: 8,
                      data: {
                        message: "Password, New Password are required!",
                      },
                    },
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

    ///////
    "/api/v1/test/welcome": {
      post: {
        tags: ["Test"],
        summary: "Test Auth",
        requestBody: {
          content: {},
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
                    message: "pong",
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
    "/api/v1/test/ping": {
      get: {
        tags: ["Test"],
        summary: "ping",
        responses: {
          200: {
            description: "Successful response",
            content: {
              "application/json": {
                example: {
                  error_code: 0,
                  data: {
                    message: "pong",
                  },
                },
              },
            },
          },
        },
      },
    },
    /////////
  },
};
