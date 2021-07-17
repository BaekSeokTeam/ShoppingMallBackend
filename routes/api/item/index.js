var express = require('express');
var router = express.Router();
const Item = require('../../../model/item');
const controller = require('./item.controller');

router.post('/add',controller.addItem);
router.post('/delete',controller.deleteItem);
router.post('/edit',controller.editItem);
router.get('/viewAll',controller.viewAllItem);

module.exports = router;