const passport = require("passport");

const auth = (req, res, next) => {

  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      req.user=null;
      res.status(200).json({
          message:"로그인을 해주세요"
      });
    }
  })(req, res, next);
};
module.exports = auth;