const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./helpers/auth");

const app = express();

module.exports = (app) => {
  app.use(
    session({
      secret: "cats",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }

app.use(
	cors({
		origin: "http://localhost:8080",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

  app.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        authGoogleID: req.user.authGoogleID,
      });
    } else {
      res.status(403).json({ error: true, message: "Lỗi gì đấy r" });
    }
  });

  app.get("/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get("/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/protected",
      failureRedirect: "/auth/google/failure",
    })
  );

  app.get("/protected", isLoggedIn, (req, res) => {
    res.redirect('http://localhost:8080/');
  }),

  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("Goodbye!");
  });

  app.get("/auth/google/failure", (req, res) => {
    res.send("Failed to authenticate..");
  });
};
