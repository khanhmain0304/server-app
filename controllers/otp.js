const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const axios = require("axios");
const {
  generateSignature,
  getGSAccessKey,
  getGSSecretKey,
} = require("../controllers/helper");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const verifyOTP = async (req, res, next) => {
  // TODO:
  // return res.status(HTTP_STATUS_CODE.OK).json({
  //   error_code: ERROR_CODE.NONE,
  //   data: {"status":"test"},
  // });

  try {
    const { otpCode } = req.body;

    // check info
    const user = await User.findById(req.user_jwt.user_id);

    if (user) {
      // TODO: send request to BCS

      let apiUrl = "https://dev.wwz.io/game-server/otp";
      let body = {
        accountInGameId: req.user_jwt.user_id,
        otp: otpCode,
      };

      let xSignature = generateSignature(body);

      let response = await axios.post(
        apiUrl,
        {
          accountInGameId: req.user_jwt.user_id,
          otp: otpCode,
        },
        { headers: { "x-signature": `${xSignature}` } }
      );

      let jsonData = response.data;
      console.log(jsonData);

      // {
      //   "id": "61b6fa6585973498a3035a99",
      //   "createdAt": "2021-12-13T14:46:45.044+07:00",
      //   "updatedAt": "2021-12-13T14:46:45.044+07:00",
      //   "address": "string",
      //   "accountInGameId": "string",
      //   "balance": 0
      // }

      // Update info
      const newUserAddress = await User.findByIdAndUpdate(
        req.user_jwt.user_id,
        { address: jsonData.address },
        { new: true }
      );

      // TODO: check update success.

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...jsonData,
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.COULD_NOT_UPDATE_USER,
      Message.USER_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.COULD_NOT_UPDATE_USER,
      Message.USER_NOT_FOUND
    );
  }
};

module.exports = {
  verifyOTP,
};
