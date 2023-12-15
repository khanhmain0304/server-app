//middleware to hanlde errors
const env = process.env.NODE_ENV || 'development';

const awaitErorrHandlerFactory = middleware => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            if (env === 'development') {
                console.log("awaitErorrHandlerFactory", err);
            }
            console.log(err);
            next(err);
        }
    };
};

module.exports = awaitErorrHandlerFactory;