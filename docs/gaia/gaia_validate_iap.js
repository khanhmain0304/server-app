module.exports = {
  post: {
    tags: ["IAP"],
    summary: "Gaia validate IAP",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              gaiaToken: "",
              merchant: "google",
              deviceType: "ANDROID",
              receipt: {
                data: {
                  packageName: "com.topdox.android.trivialdrivesample2",
                  productId: "topdox_android_monthly_subscription",
                  purchaseTime: 1456139019030,
                  purchaseState: 0,
                  purchaseToken:
                    "edgcacfhmkpekcilnihgdjkb.AO-J1OxnZr_-c4xGioV-wbb9YI4w7gtRzY87CRLsa6CrHuP_nF97WNzHaBjbqCyZeYYf_sZByLD1DKxkMOFlpIsiOJnSeHxu5XIwa303DbJwFQ7Lo-sM6dgY4-4DCEqk61C9qgUx0GsLaOMZJF0zMC0mRS9K8Z2P3-uSDQpUv0qorTGt7xQC42s",
                  autoRenewing: true,
                },
                signature:
                  "DefUPOQ2/c3LwySfk+fdczZefijWQ+eZKzOOM3bIH2+Dz+XgNUtoUe4A4logwZKKkduIJthAxuKbf5JeCspTQI8yLCBYRU0LBv4vjINNRpjY/vCeXUaFeQd5Sd1iw186pw7vvsUoSdrIdVlf2BaARJ5M2hO8SmeZRBFxaZOlN5Ud8rRNxFQOkMXxDtwY+6ihYViLDKjY4Ej1wi7pFTPPRz9R7I9APGT9UJQ/M47DWqd3bZMlZ84TPSntRXb/Qf0QUswS9fV36pQCFKwFfIXEmnF1hQfIxMTRyyMKOw7SqPT8xazexDGy9mcxaOzskeC0OZL2E4jfTnQSoMY/woCIKg==",
              },
              price: {
                currency: "KRW",
                local_price: "2400",
                local_original_price: "2400",
                price: 1.99,
                original_price: 1.99,
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
                user_id: "645a2280ceb100e4feeafb6c",
                payload: {
                  json: '{"orderId":"GPA.3343-6725-9683-87859","packageName":"com.nmg.survivalhero","productId":"com.nmg.survivalhero.gem.pack.1","purchaseTime":1684471602269,"purchaseState":0,"purchaseToken":"odnhnjbppnljfgdfnknabiae.AO-J1Ow3HbDykVeljFPabG-3ESzVhYht7eIuxR3PUaiLHg_BOjpxjMxtXqCTMVk_hwyzfOtQReDZii5AQ41IR63oeYeKRSyxTg","quantity":1,"acknowledged":false}',
                  signature:
                    "AyCf5x8N2mcuukdMLrIbaPLrRIT+4lvjisgA1KL5H6uo3N6OEody2UhOvd8/CrT+aSYZRE6hhp5xd4sPtDVComYRcliTFKWXFF64mc2QI/gAcTjXmfX+e6We3/jj5SPO1c9QPLwGULCr4UvKS1HcBowdiuwqmMJMk2azhy0GN0z+n30/dpLSXZyeOczNdfmjnnlSn+XW1DnsWe4n2DY4xNQKs9QuEZz8sAU13j2IvPGPKT8fRYDQksnkUQOzw+4SsQuDFCZhwey/od0hLeZQgvgstV2Au7ajCVdz3Da3G7Ak2ILX7JcXWMRcyBtHCUR3834FfbiVjGexBIZmJ7f4qw==",
                  skuDetails: "",
                },
                store: "GooglePlay",
                transaction_id: "odnhnjbppnljfgdfnknabiae.AO-J1Ow3HbDykVeljFPabG-3ESzVhYht7eIuxR3PUaiLHg_BOjpxjMxtXqCTMVk_hwyzfOtQReDZii5AQ41IR63oeYeKRSyxTg",
                merchant: "google",
                device_type: "ANDROID",
                status: 2,
                info: "",
                gaia: "",
                id: "6466ff388f952b4082ef70fa"
              },
            },
          },
        },
      },
    },
  },
};
