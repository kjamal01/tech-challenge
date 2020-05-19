var mongoose = require("mongoose");
mongoose.plugin((schema) => {
  schema.options.usePushEach = true;
});

var album = mongoose.model("album", {
  userID: {
    type: String,
    required: true,
  },
  name: {
      type: String,
      required: true,
      unique: true 
  }
});

module.exports = { album };
