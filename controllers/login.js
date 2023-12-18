const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Counter = require("../models/counter");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const { jwt_config } = require("../config/constant");
const { v4: uuidv4 } = require("uuid");

const loginEmail = async (req, res, next) => {
  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_EMAIL_PASSWORD);
  }

  // Validate if user exist in our database
  const user = await User.findOne({ email });

  if (!user) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token

    let login_session_id = uuidv4();

    const jwt_token = jwt.sign({ user_id: user._id, email, login_session_id }, jwt_config.secretKey, {
      expiresIn: jwt_config.expiresIn,
    });

    // save user token
    user.jwt_token = jwt_token;

    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...user.getInfo(),
      jwt_token: user.jwt_token,
      login_session_id,
    });
  }

  return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.INVALID_CREDENTIALS);
};

const register = async (req, res, next) => {
  const { email, password, name, phone, address } = req.body;

  if (!(email && password)) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.REQUIRED_EMAIL_PASSWORD);
  }

  const check_user = await User.findOne({ email }).exec();

  if (check_user) {
    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_USER, Message.USER_EXISTED);
  }

  const seq_id = await Counter.getNextValue("users_count");

  const user = await User.create({
    seq_id,
    email,
    password: await bcrypt.hash(password, 10),
    name,
    phone,
    address,
  });

  let login_session_id = uuidv4();

  const jwt_token = jwt.sign({ user_id: user._id, email, login_session_id }, jwt_config.secretKey, {
    expiresIn: jwt_config.expiresIn,
  });

  user.jwt_token = jwt_token;

  await user.save();

  return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
    ...user.getInfo(),
    jwt_token: user.jwt_token,
    login_session_id,
  });
};

module.exports = {
  loginEmail,
  register,
};
