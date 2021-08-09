var express = require('express');
var router = express.Router();
const path = require('path');

//html file
const index = path.resolve(__dirname, '../../client/build');
/* GET home page. */
router.get('/ ', (req, res) => {

});


module.exports = router;
