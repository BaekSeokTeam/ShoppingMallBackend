var express = require(express);
var router = express.Router();
const {auth} = require("./middleware/auth");
const controller = requore("./board.controller");

const Board = require("../../../model/board");

router.get('/write',controller.write);
router.get('/rewrite',controller.rewrite);