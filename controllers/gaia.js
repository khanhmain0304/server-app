const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Counter = require("../models/counter");
// const redis = require("../config/redis");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const { jwt_config } = require("../config/constant");
const { recordEventLogin } = require("../controllers/gameEventRecord");
const { recordUserClearXStage, recordUserLevel } = require("../controllers/gameEventRecord");
// const Types = require("../config/types");
const axios = require("axios");
const ALL_IAP_PACK = require("../data/meta/all_iap_pack.json");
const { v4: uuidv4 } = require("uuid");

const Types = require("../config/types");
const IAP = require("../models/iap");

const isTEST = process.env.TRACKING_SERVICE === "dev" ? true : false;

const gaiaValidateIAP = async (req, res, next) => {
  try {
    // {
    //   Payload: '{"json":"{\\"orderId\\":\\"GPA.3340-0540-5383-52138\\",\\"packageName\\":\\"com.nmg.survivalhero\\",\\"productId\\":\\"com.nmg.survivalhero.gem.pack.1\\",\\"purchaseTime\\":1682681478706,\\"purchaseState\\":0,\\"purchaseToken\\":\\"ffgkehbgieagbekhigfepbpe.AO-J1OxV6fOJWR-drY-JttmqzIq33iGLSk6OqdZvl3vVNCumXuKjCgktVIrFOQis-p4WhcbG-srnHhNmg_jp9UFUNHnUmIM5LA\\",\\"quantity\\":1,\\"acknowledged\\":false}","signature":"GMV30fYTKVUz8qNWorXUGmMnmq6dvTQKVJjYZyMZMa4tG6EevVp8gBue/hQBpi2TyiWqAXp8kIb+MfssKH7BVWUOS4jqO7m8bvF6NzEIqXfRE2ldiXx6W6z96n2BlsbrQQmrbN9THLOMEA5yb7nuOtDA/ijbigjwH0ZrDkly3KjDDfJoihsrKbw+uF0qiRjrQYFBWr/TAIx0dywVs/15JYCnRhARMN6bi2foMF/NTZ6TJkaTi2M7KA5ZtTr60EtA069EebOcmpYk+u0iQ5pNzVvscefu5Jz0zYsewXVGI4r+MlkRRQ9jv9LcQZZRqF1YfoyFFUeaKuveqR9Pu/zY+A==","skuDetails":["{\\"productId\\":\\"com.nmg.survivalhero.gem.pack.1\\",\\"type\\":\\"inapp\\",\\"title\\":\\"Gem pack 1 (Survival Hero: Action RPG Game)\\",\\"name\\":\\"Gem pack 1\\",\\"iconUrl\\":\\"https:\\\\/\\\\/lh3.googleusercontent.com\\\\/P5_LUStQ8tWrUWWgwZIPhGVnnrVJuKawhCwQWGtiIR_p7Fgy54ZGfYXOWi8X8TdY_UVF\\",\\"description\\":\\"Some gems\\",\\"price\\":\\"\\u20ab22,000\\",\\"price_amount_micros\\":22000000000,\\"price_currency_code\\":\\"VND\\",\\"skuDetailsToken\\":\\"AEuhp4KAM81k3MtW_KK_0TPovODJ8xkK3fNMlHkgGlmxGhYO92W0wcGFyleKbf5oF9P8\\"}"]}',
    //   Store: 'GooglePlay',
    //   TransactionID: 'ffgkehbgieagbekhigfepbpe.AO-J1OxV6fOJWR-drY-JttmqzIq33iGLSk6OqdZvl3vVNCumXuKjCgktVIrFOQis-p4WhcbG-srnHhNmg_jp9UFUNHnUmIM5LA'
    // }

    // return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, JSON.stringify(receiptJson));

    // Get user input
    let { gaiaToken, merchant, deviceType, receipt, price } = req.body;

    /// CHEAT
    if (isTEST && deviceType === "NewMoonGame_TestDevices") {
      console.log("Fake == deviceType:", deviceType, " merchant:", merchant);
      let fakeIAP = await IAP.create({
        user_id: req.user_jwt.user_id,
        payload: {
          json: '{"orderId":"GPA.3334-8860-2278-44714","packageName":"com.nmg.survivalhero","productId":"com.nmg.survivalhero.gem.pack.6","purchaseTime":1684497501342,"purchaseState":0,"purchaseToken":"ldgijpjdpnangdjacbooampj.AO-J1Oz5LeCWhQT0teBoWz07kSs51_L6RLkyzoEbkIrZoOwnSeIHouBJBC4UvPLVpncUhQ-ymZ3n7L8z3rHoCA0pxof76ymWaw","quantity":1,"acknowledged":false}',
          signature:
            "fM2EoV6x2t5qu+0OoEQD4wUygqXkxI7GKtf7OEKzj9LgjKu2Im/YJCmz9qj65UKm51/uIjszfLnm1csurT84HbjI1TGANxgOSiybTnzQ41eJGoe7GPLV5wTxcpERV/IOp0UFBXXqoXuv/7I2VFJQprQW7h6GYhcoz800rfV1AKTNnmu0qJyFppLJ0sdzJ6di63oMeRG3i+vgmee/xPrrE5im0ag+7uVpDs2in+P9SRxO3iPIi7VsKSjriEkOLEF/C6D7+7nzhsDWXtoCnG+88uSBXCxENx11p8ltFuHJZ1tGXdEoW3vwVCZgELP83ygtSleeg/731RRJ+iqke9RNSQ==",
          skuDetails: [
            '{"productId":"com.nmg.survivalhero.gem.pack.6","type":"inapp","title":"Gem pack 6 (Survival Hero: Action RPG Game)","name":"Gem pack 6","iconUrl":"https:\\/\\/lh3.googleusercontent.com\\/P5_LUStQ8tWrUWWgwZIPhGVnnrVJuKawhCwQWGtiIR_p7Fgy54ZGfYXOWi8X8TdY_UVF","description":"Cart of gems","price":"2.350.000 ₫","price_amount_micros":2350000000000,"price_currency_code":"VND","skuDetailsToken":"AEuhp4L-9njhrhxS1zraT8V0jC0oavGDtLh6XRKsrDeZR95x3wk2mU6xvhS1xx3v6vE9"}',
          ],
        },
        store: "GooglePlay",
        transaction_id: "ldgijpjdpnangdjacbooampj.AO-J1Oz5LeCWhQT0teBoWz07kSs51_L6RLkyzoEbkIrZoOwnSeIHouBJBC4UvPLVpncUhQ-ymZ3n7L8z3rHoCA0pxof76ymWaw",
        merchant: "google",
        device_type: deviceType,
        status: 2,
        info: "",
        gaia: {
          success: true,
          result: {
            orderId: "GPA.3334-8860-2278-44714",
            packageName: "com.nmg.survivalhero",
            productId: merchant,
            purchaseTime: 1684497501342,
            purchaseState: 0,
            purchaseToken: "ldgijpjdpnangdjacbooampj.AO-J1Oz5LeCWhQT0teBoWz07kSs51_L6RLkyzoEbkIrZoOwnSeIHouBJBC4UvPLVpncUhQ-ymZ3n7L8z3rHoCA0pxof76ymWaw",
            quantity: 1,
            acknowledged: false,
            status: 0,
            purchaseTimeMillis: "1684497501342",
            consumptionState: 1,
            developerPayload: "",
            purchaseType: 0,
            acknowledgementState: 1,
            kind: "androidpublisher#productPurchase",
            regionCode: "VN",
            service: "google",
          },
        },
      });

      if (!fakeIAP) {
        return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
      }

      console.log({ fakeIAP: fakeIAP });

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...fakeIAP.getInfo(),
      });
    }

    if (!receipt || !receipt.Payload || !receipt.Store || !receipt.TransactionID || !merchant || !deviceType) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
    }

    // console.log(req.body);

    // console.log({ gaiaToken, merchant, deviceType, receipt, price });
    // return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);

    // gaiaToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYWdlbGNvZGUiLCJzdWIiOiJTdXJ2aXZhbEhlcm8iLCJpYXQiOjE2ODMwMjQ5ODg0ODUsImV4cCI6MTY4MzAyODU4ODQ4NSwiYWlkIjo5OTAzNywidWlkIjo5NDkwMywic2t5IjoiVTJGc2RHVmtYMS9nOXduYUlqNzRUbEdObGc1RVRCdnBuQXBydVFpc1E4ZXJuNVFRcHlyQXl4QmsrUmhna0JlalI1QTBlOE1RdGFvUCtJV1NoQnZJclh4OUFPSGNObko3YzhYQVYwQnBqWG5vNDl6UU1xV1lDSG1BSWR2L2lzdkVQUU0yOWQzNTUrckdJeVh4WFArTGx2WjRUNk43TDhYcXp3ZFlQaGo0WGs0PSIsInZlciI6Mn0.UFw3dHbZAql7w0nc9RsPMmF4G0A9hyQt9q8fEkJ-Ng8";

    // merchant = "google";
    // deviceType = "ANDROID";

    // let temp = receipt.Payload;
    // '{"json":"{\\"orderId\\":\\"GPA.3354-4730-2934-49137\\",\\"packageName\\":\\"com.nmg.survivalhero\\",\\"productId\\":\\"com.nmg.survivalhero.stage.pack.1\\",\\"purchaseTime\\":1683025011363,\\"purchaseState\\":0,\\"purchaseToken\\":\\"mpjejjjdbilnpapdcgkghanc.AO-J1Ow8qh10urEf-9bzRxteVClXI5ApslXAbCWQDKpKG8LwQKl3kVMn8nKaedgmoUlhSrYuj469zb3BsIr_6RSimtUwgUmLOA\\",\\"quantity\\":1,\\"acknowledged\\":false}","signature":"c0lTJ0SXnxQn2oGjk4vPBOROL12g1jZlWfdyuuKVlcGuy+sh7M/dcaN6jBF/MdHocmHjhpa3S5EG+Eh68WC8toj5OvgucpNKtiYPw3bhxcu5Aq9UMalOOgmffYHgEuL2GG3NNeYE4ideG4wZSVR0bNlLccZgJKPAdMzvHnnPN+SAF0g1SRqCLnNVeervi9fnCokLCc043Du9id18iNv6bUojPr7XzZCqmezB3GvdvvfaWYabfoT8/oCpl4PZwOUBZx+qwwpNB3twAP8ZVofgzrkFx7gW6o1/nfWr9xjswAFPj4UxZbN0mP7oTdO+eIaTvHrmSJ2fcvMpkSWi7+xi7g==","skuDetails":["{\\"type\\":\\"inapp\\",\\"title\\":\\"Stage 1 Pack (Survival Hero: Action RPG Game)\\",\\"name\\":\\"Stage 1 Pack\\",\\"iconUrl\\":\\"https:\\\\/\\\\/lh3.googleusercontent.com\\\\/P5_LUStQ8tWrUWWgwZIPhGVnnrVJuKawhCwQWGtiIR_p7Fgy54ZGfYXOWi8X8TdY_UVF\\",\\"description\\":\\"IAP pack unlocked when players reach stage 1\\",\\"price\\":\\"\\u20ab45,000\\",\\"price_amount_micros\\":45000000000,\\"price_currency_code\\":\\"VND\\",\\"skuDetailsToken\\":\\"AEuhp4LK9xgotVxHWCMHa5UW2zRZojvCRTewt8ygXMPe8vRjI-zV1irMxgTxgLUgpKc=\\"}"]}';

    let jsonPayload = JSON.parse(receipt.Payload);

    // console.log(jsonBody);
    let dataJson = JSON.parse(jsonPayload.json);
    // console.log(dataJson);

    let signatureJson = jsonPayload.signature;
    // console.log(signatureJson);

    let skuJson = JSON.parse(jsonPayload.skuDetails[0]);
    // console.log(skuJson);

    let defaultPriceDict = ALL_IAP_PACK;

    let price_amount_micros = skuJson.price_amount_micros / 1000000;

    let default_price = defaultPriceDict[skuJson.productId];
    console.log(default_price);
    default_price = default_price ? default_price : price_amount_micros;
    let priceJson = {
      currency: skuJson.price_currency_code,
      // local_price: skuJson.price,
      // local_original_price: skuJson.price,
      local_price: String(price_amount_micros),
      local_original_price: String(price_amount_micros),
      price: default_price,
      original_price: default_price,
    };

    // return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {merchant, deviceType, receipt: { data: dataJson, signature: signatureJson }, price: skuJson});

    // by pass gaia
    if (!gaiaToken) {
      console.log("By Pass GAIA.");

      // purchaseState
      if (dataJson && dataJson.purchaseState == 0) {
        // check old transacsionID
        let checkClaimedTransaction = await IAP.findOne({ transaction_id: receipt.TransactionID, status: Types.IAPStatus.CLAIMED });

        if (checkClaimedTransaction) {
          return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
        }

        let byPassGaiaIAP = await IAP.create({
          user_id: req.user_jwt.user_id,
          payload: jsonPayload,
          store: receipt.Store,
          transaction_id: receipt.TransactionID,
          merchant: merchant,
          device_type: deviceType,
          status: Types.IAPStatus.VERIFIED,
          info: "",
          // gaia: gaiaIAP_api.data,
        });

        if (!byPassGaiaIAP) {
          return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
        }

        await User.findByIdAndUpdate(req.user_jwt.user_id, { $inc: { iap_spend: default_price }, $max: {iap_max_spend: default_price} });

        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...byPassGaiaIAP.getInfo(),
        });
      } else {
        await IAP.create({
          user_id: req.user_jwt.user_id,
          payload: jsonPayload,
          store: receipt.Store,
          transaction_id: receipt.TransactionID,
          merchant: merchant,
          device_type: deviceType,
          status: Types.IAPStatus.FAILED,
          info: "Validate fail!",
          // gaia: null
        });

        return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
      }
    }
    // /oauth/token
    const options = {
      headers: {
        "x-client-id": process.env.GAIA_CLIENT_ID,
        "x-client-secret": process.env.GAIA_CLIENT_SECRET,
        Authorization: `Bearer ${gaiaToken}`,
      },
    };
    let gaiaIAP_api = await axios.post(
      `${process.env.GAIA_PURCHASE_URL}/validate`,
      { merchant, deviceType, receipt: { data: dataJson, signature: signatureJson }, price: priceJson },
      options
    );

    // GAIA_CLIENT_ID
    // GAIA_CLIENT_SECRET
    console.log("==== Validate====");

    console.log(gaiaIAP_api.data);
    if (!gaiaIAP_api.data || !gaiaIAP_api.data.success) {
      await IAP.create({
        user_id: req.user_jwt.user_id,
        payload: jsonPayload,
        store: receipt.Store,
        transaction_id: receipt.TransactionID,
        merchant: merchant,
        device_type: deviceType,
        status: Types.IAPStatus.FAILED,
        info: "Validate fail!",
        gaia: gaiaIAP_api.data,
      });

      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
    }

    let newIAP = await IAP.create({
      user_id: req.user_jwt.user_id,
      payload: jsonPayload,
      store: receipt.Store,
      transaction_id: receipt.TransactionID,
      merchant: merchant,
      device_type: deviceType,
      status: Types.IAPStatus.VERIFIED,
      info: "",
      gaia: gaiaIAP_api.data,
    });

    if (!newIAP) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_GAIA);
    }

    console.log({ newIAP });
    await User.findByIdAndUpdate(req.user_jwt.user_id, { $inc: { iap_spend: default_price }, $max: {iap_max_spend: default_price} });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...newIAP.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.AUTHENTICATION_ERROR, Message.INVALID_CREDENTIALS);
  }
};

module.exports = {
  gaiaValidateIAP,
};
