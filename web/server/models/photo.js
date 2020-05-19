var mongoose = require("mongoose");
mongoose.plugin((schema) => {
  schema.options.usePushEach = true;
});

var photo = mongoose.model("photo", {
  userID: {
    type: String,
    required: true,
  },
  albumID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  urlLink: {
    type: String,
  },
});

module.exports = { photo };
