var mongoose = require("mongoose");
mongoose.plugin((schema) => {
  schema.options.usePushEach = true;
});

var user = mongoose.model("user", {
  googleId: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
  },
  givenName: {
    type: String,
  },
});

module.exports = { user };
