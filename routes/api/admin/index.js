var express = require('express');
var router = express.Router();
const controller = require('./admin.controller');

router.get('/userlist',controller.getUserList);
router.post('/statuschange',controller.changeUserState)
router.post('/givePoint',controller.givePoint);
router.post('/userDelete',controller.userDelete);

module.exports = router;