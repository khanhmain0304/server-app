module.exports = {
  post: {
    tags: ["User"],
    summary: "login Gaia",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              gaiaToken: "",
              version: "1.0.1",
              device_id: "",
              adid: "",
              ab_test_segment: "",
              os: "",
              os_version: "",
              client_version: "",
              tracker_name: "",
              network: "",
              campaign: "",
              adgroup: "",
              creative: "",
              locale: "",
              timezone_offset: "",
              ip_address: "",
              country: "",
              state: "",
              city: "",
              device_name: "",
              language: "",
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
                subscriptions: [],
                gaia: {
                  id: "46c79846-fa3b-4566-a4a8-32905e96caf9",
                  state: "GUEST",
                  nickname: null,
                  profileImage: null,
                  restriction: null,
                  registeredDate: "2023-04-24T10:25:38.000Z",
                  currentAuthentication: {
                    id: "40b8c521-873f-4bb1-a050-09e9c5b9c862",
                    appId: "SurvivalHero",
                    state: "JOINED",
                    idType: "GUEST",
                    deviceType: "ANDROID",
                    identifier: null,
                    restriction: null,
                    registeredDate: "2023-04-24T10:25:38.000Z",
                  },
                },
                jwt_token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI2N2IzMjcyNzU5OGU1NmYyZDJlOGI1IiwiYWNjb3VudF90eXBlIjoiZ3Vlc3QiLCJpYXQiOjE2NTA5NjMyNzYsImV4cCI6MTY1MTA0OTY3Nn0.2xk-_Em3JhLCav2UyE5SHG6fN_3By01XaM6v7L-9F0U",
                login_session_id: "e34daac3-f930-4925-a56a-c6b7b362a9fa",
                tutorial_step: 0,
                register_ts: 1682570077,
                login_count: 3,
                total_spt: 0,
                lifetime_spend: 0,
                purchase_count: 0,
                paid_gold: 0,
                free_gold: 0,
                paid_gem: 0,
                free_gem: 0,
              },
            },
          },
        },
      },
    },
  },
};
