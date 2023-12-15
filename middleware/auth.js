const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const checkJWTAuth = (req, res, next) => {
  const jwt_token =
    req.body.jwt_token || req.query.jwt_token || req.headers["x-access-token"];

  if (!jwt_token) {
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.FORBIDDEN,
      ERROR_CODE.INVALID_USER,
      Message.TOKEN_REQUIRE
    );
  }
  try {
    const decoded = jwt.verify(jwt_token, process.env.SV_JWT_TOKEN_KEY);

    if (!decoded.user_id) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.UNAUTHORIZED,
        ERROR_CODE.INVALID_USER,
        Message.INVALID_TOKEN
      );
    }

    req.user_jwt = decoded;

    if(!req.user_jwt.version) {
      req.user_jwt.version= "default";
    }


  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      ERROR_CODE.INVALID_USER,
      Message.INVALID_TOKEN
    );
  }
  return next();
};

module.exports = checkJWTAuth;
