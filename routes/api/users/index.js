var express = require('express');
var router = express.Router();
const controller = require('./user.controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'user' });
});
router.post('/signup', controller.signUp);
// router.post('/signup', function(req, res, next) {
//   res.json({
//     message:"sibal"
//   })
// });

module.exports = router;