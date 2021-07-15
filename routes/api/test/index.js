var express = require('express');
var router = express.Router();
const Cart = require('../../../model/cart');
const controller = require('./test.controller');

router.post('/cartadd',controller.addCart);


module.exports = router;