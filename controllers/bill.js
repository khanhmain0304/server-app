const mongoose = require("mongoose");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const Product = require("../models/product");
const Bill = require("../models/bill");
const User = require("../models/user");

const getBillHistory = async (req, res, next) => {
  try {
    const { minTotalAmount, maxTotalAmount, page, pageSize, sortBy, sortOrder } = req.query;

    let conditions = {
      user: mongoose.Types.ObjectId(req.user_jwt.user_id),
    };
    let sort = {};

    if (minTotalAmount && maxTotalAmount) {
      conditions.total_amount = { $gte: Number(minTotalAmount), $lte: Number(maxTotalAmount) };
    } else if (maxTotalAmount) {
      conditions.total_amount = { $lte: Number(maxTotalAmount) };
    } else if (minTotalAmount) {
      conditions.total_amount = { $gte: Number(minTotalAmount) };
    }

    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const bills = await Bill.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $unwind: "$user_data",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "products_data",
        },
      },
      {
        $match: conditions,
      },
      {
        $project: {
          _id: 1,
          user: {
            name: "$user_data.name",
            phone: "$user_data.phone",
            address: "$user_data.address",
            avatar: "$user_data.avatar",
            is_deleted: "$user_data.is_deleted",
          },
          total_amount: 1,
          products: {
            $map: {
              // $ dùng cho những trường có trước từ ban đầu: $products, $user
              // $$ dùng cho những biến được định nghĩa: $$prod được định nghĩa cho array product của Bill, $$this._id là biến định nghĩa cho products_data từ $lookup
              input: "$products",
              as: "prod",
              in: {
                _id: "$$prod.product",
                quantity: "$$prod.quantity",
                name: {
                  // $let để gán kết quả của $arrayElemAt vào một biến vars = matchedProduct
                  $let: {
                    vars: {
                      matchedProduct: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$products_data",
                              cond: {
                                $eq: [{ $toString: "$$this._id" }, { $toString: "$$prod.product" }],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: "$$matchedProduct.name",
                  },
                },
                price: {
                  // $let để gán kết quả của $arrayElemAt vào một biến vars = matchedProduct
                  $let: {
                    vars: {
                      matchedProduct: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$products_data",
                              cond: {
                                $eq: [{ $toString: "$$this._id" }, { $toString: "$$prod.product" }],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: "$$matchedProduct.price",
                  },
                },
              },
            },
          },
        },
      },
    ]);

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      bills,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const getBillDetail = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      bill,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const createBill = async (req, res, next) => {
  try {
    const { bill_products } = req.body;

    const products_id = bill_products.map((item) => {
      return item.product;
    });

    const products = await Product.find({ _id: { $in: products_id } });

    const total_amount = products.reduce((amount, product) => {
      const quantity = bill_products.find((item) => item.product == String(product._id)).quantity;

      return amount + product.price * quantity;
    }, 0);

    for (const bill of bill_products) {
      const a = await Product.findByIdAndUpdate(bill.product, {
        $inc: { inventory_quantity: -bill.quantity },
      });
    }

    const bill = await Bill.create({
      user: req.user_jwt.user_id,
      total_amount,
      products: bill_products,
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      bill,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const updateBill = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const deleteBill = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};
module.exports = {
  getBillHistory,
  getBillDetail,
  createBill,
  updateBill,
  deleteBill,
};
