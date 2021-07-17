var express = require('express');
var router = express.Router();
var user=require('./users/index')
var auth=require('../../middleware/auth')
var userinfo=require('./userinfo/index')
var adminAuth=require('../../middleware/adminAuth')
var admin=require('./admin/index')
var item=require('./item/index')
var test=require('./test/index')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api' });
});
router.use('/userinfo', auth);
router.use('/userinfo', userinfo);
router.use('/admin', adminAuth);
router.use('/admin', admin);
//router.use('/item', adminAuth); 테스트할때 로그인 귀찮아서 잠깐 주석처리
router.use('/item', item);
router.use('/test', test);
router.use('/users', user);

module.exports = router;