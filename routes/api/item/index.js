var express = require('express');
var router = express.Router();
const Item = require('../../../model/item');
const controller = require('./item.controller');

router.post('/add',controller.addItem);


module.exports = router;