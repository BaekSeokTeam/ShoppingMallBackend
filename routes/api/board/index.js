var express = require('express');
var router = express.Router();
const controller = require("./board.controller");

router.post('/write',controller.write);
router.post('/rewrite',controller.rewrite);

module.exports = router;