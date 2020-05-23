const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true
    })
    .then(() => {
      console.log("Mongo db connected");
    })
    .catch(error => console.log(error));
};

module.exports = connectDB;
