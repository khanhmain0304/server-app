const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");

const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Counter = require("../models/counter");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const { jwt_config } = require("../config/constant");

const loginWallet = async (req, res, next) => {
  try {
    // Get user input
    const { message, signature, address } = req.body;

    // Validate user input
    if (!(message && signature && address)) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.LOGIN_WALLET_REQUIRED
      );
    }

    // validata singature
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.VERIFY_FAIL
      );
    }

    // Check if user already exist
    let user = await User.findOne({ address });

    // Create User
    if (!user) {
      const seq_id = await Counter.getNextValue("users_count");
      // Create user in our database
      user = await User.create({
        address,
        seq_id,
      });
    }

    // Create token
    const jwt_token = jwt.sign(
      { address, user_id: user._id },
      jwt_config.secretKey,
      {
        expiresIn: jwt_config.expiresIn,
      }
    );
    user.jwt_token = jwt_token;

    // Return User
    return new SuccessResponse(res, HTTP_STATUS_CODE.CREATED, ERROR_CODE.NONE, {
      ...user.getInfo(),
      jwt_token: user.jwt_token,
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_USER,
      Message.CREATE_USER_FAIL
    );
  }
};

module.exports = {
  loginWallet,
};
