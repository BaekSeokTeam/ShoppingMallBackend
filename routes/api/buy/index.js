var express = require('express');
var router = express.Router();
const controller = require('./buy.controller');



router.post('/buy',controller.buy);

router.post('/givePoint',controller.givePoint);
router.post('/stateChange',controller.stateChange)
router.get('/viewAll',controller.viewAllOrder);

module.exports = router;