const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.serializeUser((existingUser, done) => {
  done(null, existingUser.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      var existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        var existingUser = await new User({
          googleId: profile.id,
          familyName: profile.name.familyName,
          givenName: profile.name.givenName,
        }).save();
        done(null, existingUser);
      }
    }
  )
);
