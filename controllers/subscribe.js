const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const Subscribe = require("../models/subscribe");
const Counter = require("../models/counter");
var nodemailer = require("nodemailer");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const addSubcribe = async (req, res, next) => {
  let email = req.params.email;
  let name = req.params.name;

  // Validate user input
  if (!email) {
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_USER,
      Message.EMAIL_REQUIRED
    );
  }

  try {
    // Validate if user exist in our database
    // console.log(email);
    email = email.toLowerCase();

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GS_GMAIL_USER,
        pass: process.env.GS_GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let unsubURL = "https://gs-dev.wwz.io/api/v1/unsubscribe/" + email;

    var mailOptions = {
      list: {
        // List-Unsubscribe: <https://gs-dev.wwz.io> (Unsubscribe)
        unsubscribe: {
          url: unsubURL,
          comment: "Unsubscribe",
        },
      },
      from: "no-reply@wwz.io",
      to: email,
      subject: "You have subscribed to WWZ newsletter successfully!",
      // text: 'That was easy!',
      html: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            Hey there,<br/>
            You've received this email because you've subscribed to our newsletter. <br/>

            Please join our Discord support server if you have any question or if you just want to know more about WWZ project!<br/>

            Our Discord server  https://discord.gg/wwsio<br/>
            <p><h8>
            WWZ is an immersive cross-IP metaverse that empowers everyone to mirror their current and/or  create a new lives in the virtual worlds by utilizing the power of web3.
            </h8></p>
            <a href="${unsubURL}">Unsubscribe</a>

            </p>
          </body>
        </html>`,
    };

    /////

    const oldSubscribe = await Subscribe.findOne({ email });

    if (oldSubscribe) {
      if (oldSubscribe.unsubscribe) {
        const updateSubscribe = await Subscribe.findOneAndUpdate(
          { email: email },
          {
            unsubscribe: false,
          }
        );

        if (updateSubscribe) {
          return new SuccessResponse(
            res,
            HTTP_STATUS_CODE.OK,
            ERROR_CODE.NONE,
            {
              message: Message.SUBSCRIBE_SUCCESS,
            }
          );
        }
      }

      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.CONFLICT,
        ERROR_CODE.INVALID_USER,
        Message.ALREADY_SUBSCRIBE
      );
    }

    /// Send Mail
    let info = await transporter.sendMail(mailOptions);
    if (info) {
      console.log("Email sent: " + info.response);
    } else {
      console.log(error);
    }
    ///

    const newSubscribe = await Subscribe.create({
      email: email,
      name: name, // sanitize: convert email to lowercase
    });

    if (newSubscribe) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        message: Message.SUBSCRIBE_SUCCESS,
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_ITEM,
      Message.SUBSCRIBE_FAIL
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_ITEM,
      Message.SUBSCRIBE_FAIL
    );
  }
};

const unSubcribe = async (req, res, next) => {
  let email = req.params.email;

  // Validate user input
  if (!email) {
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_USER,
      Message.EMAIL_REQUIRED
    );
  }

  try {
    // Validate if user exist in our database
    // console.log(email);
    email = email.toLowerCase();

    const updateSubscribe = await Subscribe.findOneAndUpdate(
      { email: email },
      {
        unsubscribe: true,
      }
    );

    if (updateSubscribe) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        message: Message.UNSUBSCRIBE_SUCCESS,
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_ITEM,
      Message.UNSUBSCRIBED
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_ITEM,
      Message.UNSUBSCRIBED
    );
  }
};

module.exports = {
  addSubcribe,
  unSubcribe,
};
