var express = require('express');
var router = express.Router();
const controller = require('./userinfo.controller');

router.get('/', function(req, res, next) {
    res.json({
        body:req.user
    })
});
router.post('/revise',controller.changeUserInfo);
router.get('/getcartlist', controller.getCart);

module.exports = router;