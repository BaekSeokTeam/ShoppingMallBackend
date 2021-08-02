var express = require('express');
var router = express.Router();
const Cart = require('../../../model/cart');
const controller = require('./cart.controller');

router.post('/cartadd',controller.addCart);
router.post('/cartdelete',controller.deleteCart);
router.get('/showall',controller.showAll);
router.post('/delete',controller.deleteCart);
router.get('/cartinfo',controller.getCartInfo);
module.exports = router;