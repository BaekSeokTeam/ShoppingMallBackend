var express = require('express');
var router = express.Router();
var user=require('./users/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'api' });
});

router.use('/users', user);

module.exports = router;