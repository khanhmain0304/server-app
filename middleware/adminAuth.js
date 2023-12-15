const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");

const checkAdminAuth = async (req, res, next) => {
  console.log("checkAdminAuth")
  // req.body.jwt_token || req.query.jwt_token || 
  const jwt_token = req.headers["x-access-token"];
  // console.log({...req.headers})

  if (!jwt_token) {
    return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
      error_code: ERROR_CODE.INVALID_USER,
      data: {
        message: "A jwt token is required for authentication",
      },
    });
  }
  try {
    const decoded = jwt.verify(jwt_token, process.env.SV_JWT_TOKEN_KEY);
    // console.log("decoded", decoded)

    if (!decoded.user_id) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "Invalid JWT Token",
        },
      });
    }

    req.user_jwt = decoded;

    if (decoded.role !== "Admin") {
      console.log("Admin only")
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "Admin only",
        },
      });
    }

    // Validate if user exist in our database
    // const user = await User.findById(req.user_jwt.user_id);

    // if (user)
    // {
    //     if(/*user.hasOwnProperty('role') &&*/ user.role ==="Admin")
    //     {

    //     }
    //     else
    //     {
    //         return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
    //             error_code: ERROR_CODE.INVALID_USER,
    //             data: {
    //               message: "Admin only",
    //             },
    //           });
    //     }
    // }
  } catch (err) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
      error_code: ERROR_CODE.INVALID_USER,
      data: {
        message: "Invalid JWT Token",
      },
    });
  }
  return next();
};

module.exports = checkAdminAuth;
