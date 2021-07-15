const passport = require("passport");

const adminAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
        if(user.admin){
            req.user = user;
            next();
        }
      else{
        res.status(403).json({
            message:"접근권한이 없습니다"
        });
      }
    } else {
      res.status(403).json({
          message:"로그인을 해주세요"
      });
    }
  })(req, res, next);
};
module.exports = adminAuth;