const { connect, connection } = require("mongoose");

module.exports = () => {
  if (process.env.DB_ENV === "production") {
    // const uri =
    //   "mongodb+srv://" +
    //   process.env.ATLAS_DB_USER +
    //   ":" +
    //   process.env.ATLAS_DB_PASS +
    //   "@" +
    //   process.env.ATLAS_DB_HOST +
    //   "/" +
    //   process.env.ATLAS_DB_NAME +
    //   "?retryWrites=true&w=majority";
    // connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })

    const uri =
      "mongodb://" +
      process.env.ATLAS_DB_HOST +
      ":" +
      process.env.ATLAS_DB_PORT;
    connect(uri, {
      dbName: process.env.ATLAS_DB_NAME,
      user: process.env.ATLAS_DB_USER,
      pass: process.env.ATLAS_DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log("Connection estabislished with MongoDB");
      })
      .catch((error) => console.error(error.message));
  } else {
    const uri = "mongodb://" + process.env.DB_URI + ":" + process.env.DB_PORT;
    connect(uri, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log("Connection estabislished with MongoDB");
      })
      .catch((error) => console.error(error.message));
  }

  connection.on("connected", () => {
    console.log("Mongoose connected to DB Cluster");
  });

  connection.on("error", (error) => {
    console.error(error.message);
  });

  connection.on("disconnected", () => {
    console.log("Mongoose Disconnected");
  });
};

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {

//     const uri = "mongodb://" + process.env.DB_URI + ":" + process.env.DB_PORT;

//     await mongoose.connect(uri,{
//       dbName: process.env.DB_NAME,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })

//     console.log('MongoDB connected!!')
//   } catch (err) {
//     console.log('Failed to connect to MongoDB', err)
//   }
// }
