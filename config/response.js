// const { redisLogError } = require("./redisClient");


class SuccessResponse {
    constructor(res, httpCode, errorCode, data) {
        return res.status(httpCode).json({
            errorCode,
            data,
        });
    }
}

class ErrorResponse {
    constructor(res, httpCode, errorCode, message) {

        console.log({httpCode, errorCode, message});

        // redisLogError(JSON.stringify({httpCode, errorCode, message}));

        return res.status(httpCode).json({
            errorCode,
            data: {
                message
            }
        });
    }
}

module.exports = { SuccessResponse, ErrorResponse }