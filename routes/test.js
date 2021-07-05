var express = require('express');
var router = express.Router();

/* test-dk. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '덕규바보2yyyyyyyyyyyyyyyyyyyyyaaaaa' });
});

module.exports = router;
