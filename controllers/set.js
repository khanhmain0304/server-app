const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const Set = require("../models/set");
const Counter = require("../models/counter");
// const { json } = require("body-parser");

// const addSet = async (req, res, next) => {
// try {
//   // Get set input
//   const {
//       description,
//       name,
//       image,
//       sets } = req.body;

//   // Validate set input
//   if (!(name && image)) {
//     return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
//       error_code: ERROR_CODE.INVALID_ITEM,
//       data: {
//         message: "name, image are required",
//       },
//     });
//   }

//   // Check if set already exist
//   // Validate if set exist in our database
//   const oldSet = await Set.findOne({ name });

//   if (oldSet) {
//     return res.status(HTTP_STATUS_CODE.CONFLICT).json({
//       error_code: ERROR_CODE.INVALID_ITEM,
//       data: {
//         message: "Set Already Exist. Please Login",
//       },
//     });
//   }

//   //getNext ID
//   const seq_id = await Counter.getNextValue("sets_count");
//   // Create set in our database
//   const newSet = await Set.create({
//       seq_id,
//       description,
//       name,
//       image,
//       sets
//   });


//   // Return set
//   return res.status(HTTP_STATUS_CODE.CREATED).json({
//     error_code: ERROR_CODE.NONE,
//     data: {
//       ...newSet.getInfo(),
//     },
//   });
// } catch (err) {
//   console.log(err);
//   return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
//     error_code: ERROR_CODE.INVALID_ITEM,
//     data: {
//       message: "Can't create set!",
//     },
//   });
// }
// };



const getSet = async (req, res, next) => {
  const set_id = req.params.set_id;
  console.log('seq_id: ' + set_id);
  try {
    // Validate if user exist in our database
    const set = await Set.findOne({set_id:set_id});

    if (set) {
      return res.status(HTTP_STATUS_CODE.OK).json({
          ...set.getMetadata(),
      });
    }

    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      error_code: ERROR_CODE.INVALID_ITEM,
      data: {
        message: "Set Not Foud!",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      error_code: ERROR_CODE.INVALID_ITEM,
      data: {
        message: "Set Not Foud!",
      },
    });
  }
};


// const getMetadata = async (req, res, next) => {
//   const set_id = req.params.set_id;
//   console.log('seq_id: ' + set_id);
//   try {
//     // Validate if user exist in our database
//     const set = await Set.findOne({set_id:set_id});

//     if (set) {
//       return res.status(HTTP_STATUS_CODE.OK).json({
//           ...set.getMetadata(),
//       });
//     }

//     return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
//       error_code: ERROR_CODE.INVALID_ITEM,
//       data: {
//         message: "Set Not Foud!",
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
//       error_code: ERROR_CODE.INVALID_ITEM,
//       data: {
//         message: "Set Not Foud!",
//       },
//     });
//   }
// };




module.exports = {
    // addSet,
    // getSet,
    //getMetadata,
};
