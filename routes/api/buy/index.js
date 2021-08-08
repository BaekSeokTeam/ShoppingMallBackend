var express = require('express');
var router = express.Router();
const controller = require('./buy.controller');



router.post('/buy',controller.buy);


router.post('/stateChange',controller.stateChange)
router.get('/viewAll',controller.viewAllOrder);
router.get('/deleteAll',controller.deleteAllOrder);
module.exports = router;