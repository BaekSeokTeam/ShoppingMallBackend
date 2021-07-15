var express = require('express');
var router = express.Router();
const controller = require('./admin.controller');

router.get('/userlist',controller.getUserList);
router.post('/statuschange',controller.changeUserState)

module.exports = router;