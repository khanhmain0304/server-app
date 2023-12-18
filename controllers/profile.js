const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user_jwt.user_id);

    if (!user) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "User Not Foud!",
        },
      });
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...user.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user_jwt.user_id);

    user.name = !name ? user.name : name;
    user.phone = !phone ? user.phone : phone;
    user.address = !address ? user.address : address;

    await user.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...user.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const changePassword = async (req, res, next) => {
  try {
    // Get user input
    const { password, new_password } = req.body;

    // Validate user input
    if (!(password && new_password)) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_CHANGE_PASSWORD, Message.PASSWORD_REQUIRED);
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

    return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.COULD_NOT_CHANGE_PASSWORD, Message.CHANGE_PASSWORD_FAIL);
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
