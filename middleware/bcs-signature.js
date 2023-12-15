const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const {
  generateSignature,
  getGSAccessKey,
  getGSSecretKey,
} = require("../controllers/helper");

const checkBCSSignature = (req, res, next) => {
  if (["get"].includes(req.method.toLowerCase())) {
    if (req.headers["x-access-key"] !== getGSAccessKey()) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.FORBIDDEN,
        ERROR_CODE.SIGNATURE_INVALID,
        Message.INVALID_SIGNATURE
      );
    }
  } else {
    const signature = req.headers["x-signature"];
    // console.log(signature);
    // console.log(generateSignature(req.body));

    if (!signature || signature !== generateSignature(req.body)) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.FORBIDDEN,
        ERROR_CODE.SIGNATURE_INVALID,
        Message.INVALID_SIGNATURE
      );
    }
  }

  return next();
};

module.exports = checkBCSSignature;
