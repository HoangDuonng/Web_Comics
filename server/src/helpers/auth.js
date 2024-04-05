const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/users");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const user = await User.findOne({ 
        authGoogleID: profile.id,
        authType: "google"
      });
      if(user){
        return done(null, user);
      }

      const newUser = new User({
        authGoogleID: profile.id,
        authType: "google",
        email: profile.emails[0].value,
        level: "0",
        username: profile.displayName,
      });
      await newUser.save();
      done(null, newUser);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports = passport;
