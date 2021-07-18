var express = require(express);
var router = express.Router();
const controller = requore("./board.controller");

router.post('/write',controller.write);
router.post('/rewrite',controller.rewrite);