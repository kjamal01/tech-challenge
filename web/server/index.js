const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const keys = require("./config/keys.js");

const { mongoose } = require("./db/mongoose");

const passport = require("passport");

const { user } = require("./models/user");

const PORT = process.env.PORT || 5000;

const passportService = require("./services/passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require("./routes/authRoutes.js")(app);
require("./routes/appRoutes")(app);

app.listen(PORT, () => {
  console.log("This app is listening on port 5000");
});
