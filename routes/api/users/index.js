var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const controller = require('./user.controller');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'user' });
});
router.post('/signup', controller.signUp);
router.post('/signin',  async(req, res, next) => {
  
  try {
    
		// 아까 local로 등록한 인증과정 실행
    passport.authenticate('local',{ session: false }, (passportError, user, info) => {
      
			// 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError || !user) {
        console.log(1)
        console.log(passportError)
        res.status(400).json({ message:info});
        return;
      }
			// user데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginError) => {
        console.log(2)
        if (loginError) {
          res.send(loginError);
          return;
        }
		// 클라이언트에게 JWT생성 후 반환
		const token = jwt.sign(
			{ email: user.email},
			process.env.JWT_SECRET
		);
       res.json({ token });
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;