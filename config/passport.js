const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const passwordUtils = require("../lib/passwordUtils");

const verifyCallback = (username, password, done) => {
  const user = 1;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      const isValid = passwordUtils.validatePassword(
        password,
        user.hash,
        user.salt
      );
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});
