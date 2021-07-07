const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
          message:"로그인을 해주세요"
      });
    }
  })(req, res, next);
};
module.exports = auth;