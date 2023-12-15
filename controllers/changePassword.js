const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const changePassword = async (req, res, next) => {
  try {
    // Get user input
    const { password, new_password } = req.body;

    // Validate user input
    if (!(password && new_password)) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.COULD_NOT_CHANGE_PASSWORD,
        Message.PASSWORD_REQUIRED
      );
    }

    //Encrypt user password
    const encryptedNewPassword = await bcrypt.hash(new_password, 10);

    const user = await User.findById(req.user_jwt.user_id);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Validate if user exist in our database
      const updateUser = await User.findByIdAndUpdate(req.user_jwt.user_id, {
        password: encryptedNewPassword,
      });

      if (updateUser) {
        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          id: updateUser._id,
        });
      }
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.COULD_NOT_CHANGE_PASSWORD,
      Message.CHANGE_PASSWORD_FAIL
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.COULD_NOT_CHANGE_PASSWORD,
      Message.CHANGE_PASSWORD_FAIL
    );
  }
};

module.exports = {
  changePassword,
};
