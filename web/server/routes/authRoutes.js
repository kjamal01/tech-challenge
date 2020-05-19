const passport = require("passport");
var requireLogin = require("../middleware/requireLogin");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:5000/api/signedin");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send({
      message:
        "you have officially been signed out, thanks for visiting my mavennet backend challenge!",
    });
  });

  app.get("/api/signedin", (req, res) => {
    res.send({
      message:
        "congratulations! you just sign into my mavennet API with your secure google credentials! (sorry for the lack of front end!)",
      profile: req.user,
    });
  });

  app.get("/api/currentuser", requireLogin, (req, res) => {
    res.send({ "here is your google id:": req.user.googleId });
  });
};
