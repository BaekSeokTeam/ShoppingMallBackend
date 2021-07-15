var express = require('express');
var router = express.Router();
var user=require('./users/index')
var auth=require('../../middleware/auth')
var userinfo=require('./userinfo/index')
var adminAuth=require('../../middleware/adminAuth')
var admin=require('./admin/index')
var item=require('./item/index')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api' });
});
router.use('/userinfo', auth);
router.use('/userinfo', userinfo);
router.use('/admin', adminAuth);
router.use('/admin', admin);
router.use('/item', adminAuth);
router.use('/item', item);
router.use('/users', user);

module.exports = router;