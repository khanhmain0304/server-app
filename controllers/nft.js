const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const Set = require("../models/set");
const NFT = require("../models/nft");
const Counter = require("../models/counter");
const User = require("../models/user");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");

const addNFT = async (req, res, next) => {
  try {
    let { chain_id, data } = req.body;
    let { address, itemId, rarity } = data;

    let owner = address;
    // TODO: RANDOM
    // TODO: add set with rarity
    let random_setId = itemId;
    // let set_seq_id = random_setId;

    // Check if nft already exist
    const oldNFT = await NFT.findOne({ seq_id: itemId });

    if (oldNFT) {
      return new SuccessResponse(
        res,
        HTTP_STATUS_CODE.OK,
        ERROR_CODE.NFT_OWNED,
        {
          message: Message.NFT_OWNED,
        }
      );
    }

    const set = await Set.findOne({ seq_id: itemId });

    if (!set) {
      return new ErrorResponse(
        res,
        HTTP_STATUS_CODE.BAD_REQUEST,
        ERROR_CODE.INVALID_NFT,
        Message.NFT_INVALID
      );
    }

    //getNext ID
    const seq_id = await Counter.getNextValue("nfts_count");
    // Create item in our database
    const newNFT = await NFT.create({
      seq_id,
      nft_id: itemId,
      set_id: itemId,
      set_seq_id: itemId,
      owner,
      rarity,
      chain_id,
    });

    // Return item
    return new SuccessResponse(res, HTTP_STATUS_CODE.CREATED, ERROR_CODE.NONE, {
      ...newNFT.getInfo(),
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_ITEM,
      Message.CREATE_NFT_FAIL
    );
  }
};

const depositNFT = async (req, res, next) => {
  try {
    let { chain_id, data } = req.body;
    let { address, itemId } = data;
    let owner = address;

    // Check if nft already exist
    const checkNFT = await NFT.findOne({ seq_id: itemId });

    // console.log(address);
    // console.log(checkNFT.owner);
    // console.log(checkNFT.status);

    if (checkNFT && checkNFT.owner === address /*&& checkNFT.status === 0*/) {
      // update NFT satatus
      const lockNFT = await NFT.findByIdAndUpdate(checkNFT._id, { status: 1 });

      if (!lockNFT) {
        return new ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_CODE.NFT_LOCK,
          Message.NFT_LOCK_ERR
        );
      }

      // get set
      const setInfo = await Set.findOne({ seq_id: lockNFT.set_seq_id });

      if (!setInfo) {
        return new ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_CODE.INVALID_NFT,
          Message.NFT_SET_ERR
        );
      }

      // add item to inventory
      const user = await User.findOne({ address: address });

      if (!user) {
        return new ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_CODE.INVALID_USER,
          Message.INVALID_USER
        );
      }

      let itemArr = user.items;

      for (let i in setInfo.items) {
        itemArr.push(setInfo.items[i].part_id);
      }

      const updateUser = await User.findByIdAndUpdate(
        user._id,
        { items: itemArr },
        { new: true }
      );

      if (!updateUser) {
        return new ErrorResponse(
          res,
          HTTP_STATUS_CODE.BAD_REQUEST,
          ERROR_CODE.COULD_NOT_UPDATE_USER,
          Message.UPDATE_USER_FAIL
        );
      }

      // Return item
      return new SuccessResponse(
        res,
        HTTP_STATUS_CODE.CREATED,
        ERROR_CODE.NONE,
        {
          ...updateUser.getInfo(),
        }
      );
    }

    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_NFT,
      Message.INVALID_NFT
    );
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.BAD_REQUEST,
      ERROR_CODE.INVALID_ITEM,
      Message.CREATE_NFT_FAIL
    );
  }
};

const verifyMintNFT = async (req, res, next) => {
  // NOTE: NFT is set, not item.
  // Get user input
  const { address, itemId } = req.body;
  console.log("seq_id: " + itemId);
  try {
    // Check if nft already exist
    const oldNFT = await NFT.findOne({ set_seq_id: itemId });

    if (oldNFT) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        is_valid: false,
        token_uri: "",
      });
    }

    // TODO: check address
    const item = await Set.findOne({ seq_id: itemId });
    const tokenUri = process.env.SV_DOMAIN + "/metadata/" + itemId;

    if (item) {
      return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        is_valid: true,
        token_uri: tokenUri,
      });
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      is_valid: false,
      token_uri: "",
    });
  } catch (err) {
    console.log(err);
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      is_valid: false,
      token_uri: "",
    });
  }
};

const notifyEvent = async (req, res, next) => {
  // Get user input
  const { event_name } = req.body;

  // TODO: validate input

  switch (event_name) {
    case "NFTMinted":
      return addNFT(req, res, next);

      break;
    case "DepositToken":
      break;
    case "WithdrawToken":
      break;
    case "DepositNFT":
      return depositNFT(req, res, next);

      break;
    case "WithdrawNFT":
      break;
    default:
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({});
    // code block
  }

  try {
    return res.status(HTTP_STATUS_CODE.OK).json();
  } catch (err) {
    console.log(err);
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      is_valid: false,
      token_uri: "",
    });
  }
};

const getMetadata = async (req, res, next) => {
  // Date
  let timeNow = new Date();
  let timeOpen = new Date("2022-04-17T00:00:00.000Z").getTime();

  if (timeNow < timeOpen) {
    return res.status(HTTP_STATUS_CODE.OK).json({});
  }

  const nft_id = parseInt(req.params.nft_id);
  try {
    // Validate if user exist in our database
    const nft = await NFT.findOne({ nft_id: nft_id });

    if (nft) {
      const set = await Set.findOne({ seq_id: nft.set_seq_id });

      return res.status(HTTP_STATUS_CODE.OK).json({
        ...nft.getMetadata(),
        ...set.getMetadata(),
      });
    }

    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({});
  } catch (err) {
    console.log(err);
    return new ErrorResponse(
      res,
      HTTP_STATUS_CODE.NOT_FOUND,
      ERROR_CODE.INVALID_ITEM,
      Message.NFT_NOT_FOUND
    );
  }
};

module.exports = {
  verifyMintNFT,
  notifyEvent,
  getMetadata,
};
