var express = require('express');
var router = express.Router();
var user=require('./users/index')
var auth=require('../../middleware/auth')
var userinfo=require('./userinfo/index')
var adminAuth=require('../../middleware/adminAuth')
var admin=require('./admin/index')
var item=require('./item/index')
var cart=require('./cart/index')
var board=require('./board/index')
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../public/api/');
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
router.use('/cart', auth);
router.use('/cart', cart);
router.use('/board',auth);
router.use('/board',board);
router.use('/buy',auth);
router.use('/buy',board)
router.use('/users', user);
router.get('/img', function(req, res, next) {
  res.render('index', { title: 'img' });
});
router.get('/hello', function(req, res, next) {


  res.json({
    hello:"hi"
  })
});

module.exports = router;