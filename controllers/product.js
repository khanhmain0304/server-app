const mongoose = require("mongoose");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Product = require("../models/product");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const Category = require("../models/category");
const CategoryProduct = require("../models/categoryProduct");

const getAllProduct = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, page, pageSize, sortBy, sortOrder } = req.query;

    let conditions = {};
    let sort = {};

    const check_category = await Category.findOne({ tag: category });
    if (check_category) {
      conditions["category.tag"] = category;
    }

    if (search) {
      conditions.name = { $regex: search, $options: "i" };
    }

    if (minPrice && maxPrice) {
      conditions.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (maxPrice) {
      conditions.price = { $lte: Number(maxPrice) };
    } else if (minPrice) {
      conditions.price = { $gte: Number(minPrice) };
    }

    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // $lookup từ Product sang CategoryProduct, sau đó $lookup từ CategoryProduct sang Category
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categoryproducts", // Model CategoryProduct => categoryproducts
          localField: "_id",
          foreignField: "product",
          as: "category_product",
        },
      },
      {
        $lookup: {
          from: "categories", // Model Category => categories
          localField: "category_product.category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: conditions,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          inventory_quantity: 1,
          imageUrl: 1,
          is_deleted: 1,
          createdAt: 1,
          updatedAt: 1,
          category: "$category",
        },
      },
      {
        $sort: sort,
      },
    ]);
    // .skip((page - 1) * pageSize)
    // .limit(pageSize);

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      products,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      product,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, inventory_quantity, imageUrl, category } = req.body;

    if (!name || !price) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_REQUIRE);
    }

    const check_category = await Category.findById(category);

    if (!check_category) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_NOT_FOUND);
    }

    const new_product = await Product.create({
      name,
      description,
      price,
      inventory_quantity,
      imageUrl,
    });

    const new_category_product = await CategoryProduct.create({
      product: new_product._id,
      category,
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      product: { ...new_product.getInfo() },
      category_product: { ...new_category_product.getInfo() },
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, inventory_quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product || product.name == name) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_NOT_FOUND);
    }

    product.name = !name ? product.name : name;
    product.description = !description ? product.description : description;
    product.price = !price ? product.price : price;
    product.inventory_quantity = !inventory_quantity ? product.inventory_quantity : inventory_quantity;

    await product.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...product.getInfo(),
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const delete_product = await Product.findByIdAndUpdate(req.params.id, { is_deleted: true });

    if (!delete_product) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_NOT_FOUND);
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      message: "Delete Success",
    });
  } catch (error) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

module.exports = {
  getAllProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
