const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Counter = require("../models/counter");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const { jwt_config } = require("../config/constant");

const registerEmail = async (req, res, next) => {
  try {
    // Get user input
    const { email, password, first_name, last_name } = req.body;
    // Validate user input
    if (!(email && password)) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.REQUIRED_EMAIL_PASSWORD
      );
    }

    // Check if user already exist
    // Validate if user exist in our database
    // const oldUser = await User.findOne({ $or: [{ email }, { address }] });
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.CONFLICT,
        ERROR_CODE.INVALID_USER,
        Message.USER_EXISTED
      );
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    const seq_id = await Counter.getNextValue("users_count");
    // Create user in our database
    const user = await User.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      first_name,
      last_name,
      seq_id,
      account_type: "email",
    });

    // Create token
    const jwt_token = jwt.sign(
      { user_id: user._id, email },
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

const linkGuest = async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    // Validate user input
    if (!(email && password)) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.REQUIRED_EMAIL_PASSWORD
      );
    }

    let emailLowerCase = email.toLowerCase();

    // Check if user already exist
    // Validate if user exist in our database
    // const oldUser = await User.findOne({ $or: [{ email }, { address }] });
    const oldUser = await User.findOne({ email: emailLowerCase });

    if (oldUser) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.CONFLICT,
        ERROR_CODE.INVALID_USER,
        Message.USER_EXISTED
      );
    }

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    if (user) {
      if (user.account_type === "guest") {
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        const updateUser = await User.findByIdAndUpdate(req.user_jwt.user_id, {
          email: emailLowerCase, // sanitize: convert email to lowercase
          password: encryptedPassword,
          first_name,
          last_name,
          account_type: "email",
        });

        // Create token
        const jwt_token = jwt.sign(
          { user_id: updateUser._id, email: emailLowerCase },
          jwt_config.secretKey,
          {
            expiresIn: jwt_config.expiresIn,
          }
        );
        // save user token
        updateUser.jwt_token = jwt_token;

        // Return user
        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.CREATED,
          ERROR_CODE.NONE,
          {
            ...user.getInfo(),
            jwt_token: user.jwt_token,
          }
        );
      } else {
        return new ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_CODE.AUTHENTICATION_ERROR,
          Message.GUEST_ONLY
        );
      }
    }
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.AUTHENTICATION_ERROR,
      Message.INVALID_CREDENTIALS
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.AUTHENTICATION_ERROR,
      Message.INVALID_CREDENTIALS
    );
  }
};

module.exports = {
  registerEmail,
  linkGuest,
};
