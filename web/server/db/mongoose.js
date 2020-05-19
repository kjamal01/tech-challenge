const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, (error) => {
  if (error) {
    return error;
  }
  console.log("successfully connected to database");
});
module.exports = { mongoose };
