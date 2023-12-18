const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const swaggerOption = require("./docs");
const apiv1Router = require("./routes/api");
const apiMetadata = require("./routes/api/v1/metadata");
const multer = require("multer");
const { setLimitSchedule, setBuffDailyChallenge } = require("./helper/cron");
const compression = require("compression");

const HTTP_STATUS_CODE = require("./config/http_status_code");
const ERROR_CODE = require("./config/error_code");
const { initGameConfigRedis } = require("./controllers/gameConfig");
const env = process.env.NODE_ENV || "development";

// MongoDB
require("./config/database")();
require("./config/redisClient");

// Limit
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 200,
  message: "Too many connection",
});

// Multer Upload
// const multerMid = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

// Express
const app = express();

// remove cache
app.disable("etag");

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "200mb", limit: "200mb" }));
// app.set("json spaces", 2);

// compress all responses
app.use(compression());

// app.use(multerMid.single("avatar"));

// Apply the rate limiting middleware to API calls only
app.use("/api", apiLimiter);
app.use("/api", apiv1Router);

app.use("/metadata", apiLimiter);
app.use("/metadata", apiMetadata);

// Swagger Docs
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerOption));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error_code: err.error_code || 500,
    data: {
      message: err.message,
    },
  });
  if (env === "development") {
    console.log(err);
  }
});

setLimitSchedule.start();
setBuffDailyChallenge.start();

// initGameConfigRedis();

module.exports = app;
