const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const User = require("../models/user");
const Category = require("../models/category");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const CategoryProduct = require("../models/categoryProduct");

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}).then((categories) => {
      return categories.map((category) => category.getInfo());
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      categories,
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, tag, description } = req.body;

    const current_category = await Category.findOne({ $or: [{ name }, { tag }] });

    if (current_category) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_EXISTED);
    }

    const new_category = await Category.create({
      name,
      tag,
      description,
    });

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...new_category.getInfo(),
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category || category.name == name) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, Message.ITEM_NOT_FOUND);
    }

    category.name = !name ? category.name : name;
    category.description = !name ? category.description : description;

    await category.save();

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      ...category.getInfo(),
    });
  } catch (error) {
    console.log(error);
    return new ErrorResponse(res, HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, ERROR_CODE.SERVER_ERROR, Message.SERVER_ERROR);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const check_category = await CategoryProduct.find({ category: req.params.id });

    if (check_category.length > 0) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.BAD_REQUEST, ERROR_CODE.INVALID_ITEM, "Category contain products");
    }

    const delete_category = await Category.findByIdAndUpdate(req.params.id, { is_deleted: true });

    if (!delete_category) {
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
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
