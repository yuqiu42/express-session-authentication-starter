module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports.isAdmin = (req, res, next) => {};
