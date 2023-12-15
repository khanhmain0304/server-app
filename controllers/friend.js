const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const FriendRequest = require("../models/friendrequests");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const getAllFriend = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    if (user) {
      if (user.friend_ids) {
        const friendArray = user.friend_ids.map((x) => x);

        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.OK,
          ERROR_CODE.NONE,
          friendArray
        );
      }

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        friend_ids: [],
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const getFriendInfo = async (req, res, next) => {
  try {
    // Validate if user exist in our database

    const { friendIds } = req.body;

    // Validate user input
    if (!friendIds) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    console.log(friendIds);

    const user = await User.find({ _id: { $in: friendIds } });

    if (user) {
      const userArray = user.map((x) => x.getInfo());
      console.log(userArray);

      return new SuccessResponse(
        res,
        HTTP_STATUS_CODE.OK,
        ERROR_CODE.NONE,
        userArray
      );
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const getAllFriendInfo = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const currentUser = await User.findById(req.user_jwt.user_id);

    const user = await User.find({ _id: { $in: currentUser.friend_ids } });

    if (user) {
      const userArray = user.map((x) => x.getInfo());
      console.log(userArray);

      return new SuccessResponse(
        res,
        HTTP_STATUS_CODE.OK,
        ERROR_CODE.NONE,
        userArray
      );
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const getOnlineFriend = async (req, res, next) => {
  try {
    // Validate if user exist in our database

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const getFriendRequest = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const friendRequest = await FriendRequest.find({
      receiver: req.user_jwt.user_id,
    });

    if (friendRequest) {
      const friendRequestIdArray = friendRequest.map((x) => x.sender);

      const user = await User.find({ _id: { $in: friendRequestIdArray } });

      if (user) {
        const userArray = user.map((x) => x.getInfo());

        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.OK,
          ERROR_CODE.NONE,
          userArray
        );
      } else {
        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.OK,
          ERROR_CODE.NONE,
          []
        );
      }
    } else {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, []);
    }
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const getPendingRequest = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const pendingFriendRequest = await FriendRequest.find({
      sender: req.user_jwt.user_id,
    });

    if (pendingFriendRequest) {
      const pendingFriendRequestIdArray = pendingFriendRequest.map(
        (x) => x.sender
      );

      const user = await User.find({
        _id: { $in: pendingFriendRequestIdArray },
      });

      if (user) {
        const userArray = user.map((x) => x.getInfo());

        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.OK,
          ERROR_CODE.NONE,
          userArray
        );
      } else {
        return new SuccessResponse(
          res,
          HTTP_STATUS_CODE.OK,
          ERROR_CODE.NONE,
          []
        );
      }
    } else {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, []);
    }
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        error_code: ERROR_CODE.INVALID_USER,
        data: {
          message: "friendId is required",
        },
      });
    }

    const oldFriendRequest = await FriendRequest.findOne({
      receiver: req.user_jwt.user_id,
      sender: friendId,
    });

    if (oldFriendRequest) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        error_code: ERROR_CODE.NONE,
        data: {
          message: "Already send!",
        },
      });
    }

    const newFriendRequest = await FriendRequest.create({
      sender: req.user_jwt.user_id,
      receiver: friendId,
    });

    if (newFriendRequest) {
      return res.status(HTTP_STATUS_CODE.OK).json({
        error_code: ERROR_CODE.NONE,
        data: {
          message: "SendFriendRequest Successful!",
        },
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const acceptFriendRequest = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    // console.log({
    //     receiver: req.user_jwt.user_id,
    //     sender: friendId,
    // })

    const friendRequest = await FriendRequest.findOne({
      receiver: req.user_jwt.user_id,
      sender: friendId,
    });

    if (friendRequest) {
      const update_user = await User.findByIdAndUpdate(
        req.user_jwt.user_id,
        { $push: { friend_ids: friendRequest.sender } },
        { new: true }
      );

      if (req.user_jwt.user_id != friendRequest.sender) {
        const update_user2 = await User.findByIdAndUpdate(
          friendRequest.sender,
          { $push: { friend_ids: req.user_jwt.user_id } },
          { new: true }
        );
      }

      if (update_user) {
        await FriendRequest.findByIdAndDelete(friendRequest._id);

        return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
          ...update_user.getInfo(),
        });
      }
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const deleteFriend = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    // console.log({
    //     receiver: req.user_jwt.user_id,
    //     sender: friendId,
    // })

    const update_user = await User.findByIdAndUpdate(
      req.user_jwt.user_id,
      { $pull: { friend_ids: friendId } },
      { new: true }
    );

    const update_user2 = await User.findByIdAndUpdate(
      friendId,
      { $pull: { friend_ids: req.user_jwt.user_id } },
      { new: true }
    );

    if (update_user) {
      // await FriendRequest.findByIdAndDelete(friendRequest._id);

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...update_user.getInfo(),
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const declineFriendRequest = async (req, res, next) => {
  try {
    // Validate if user exist in our database

    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    const friendRequest = await FriendRequest.findOne({
      receiver: req.user_jwt.user_id,
      sender: friendId,
    });

    if (friendRequest) {
      await FriendRequest.findByIdAndDelete(friendRequest._id);
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        message: Message.DECLINE_FRIEND_REQUEST,
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const blockUser = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    // Validate if user exist in our database
    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    const update_user = await User.findByIdAndUpdate(
      req.user_jwt.user_id,
      { $push: { blocked_user_ids: friendId } },
      { new: true }
    );

    if (update_user) {
      // await FriendRequest.findByIdAndDelete(friendRequest._id);

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...update_user.getInfo(),
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

const unblockUser = async (req, res, next) => {
  try {
    // Validate if user exist in our database
    // Validate if user exist in our database
    const { friendId } = req.body;

    // Validate user input
    if (!friendId) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_USER,
        Message.FRIEND_ID_REQUIRE
      );
    }

    const update_user = await User.findByIdAndUpdate(
      req.user_jwt.user_id,
      { $pull: { blocked_user_ids: friendId } },
      { new: true }
    );

    if (update_user) {
      // await FriendRequest.findByIdAndDelete(friendRequest._id);

      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        ...update_user.getInfo(),
      });
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_USER,
      Message.FRIEND_NOT_FOUND
    );
  }
};

module.exports = {
  getAllFriend,
  getOnlineFriend,
  getFriendRequest,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  blockUser,
  unblockUser,
  getFriendInfo,
  deleteFriend,
  getPendingRequest,
  getAllFriendInfo,
};
