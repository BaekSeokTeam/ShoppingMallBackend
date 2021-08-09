var express = require('express');
var router = express.Router();
const path = require('path');

//html file
const index = path.resolve(__dirname, '../../client/build');
/* GET home page. */
router.get('/ ', (req, res) => {
  connsole.log(1)
  res.sendFile(index);
});
router.get('/board ', (req, res) => {
  connsole.log(1)
});

module.exports = router;
