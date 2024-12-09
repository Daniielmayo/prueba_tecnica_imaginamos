const { Router } = require("express");
const { CreateUser } = require("../../controllers/Users/CreateUser");
const { Login } = require("../../controllers/Users/loginUser");

const router = Router();

router.post("/createUser", CreateUser);
router.post("/", Login);

module.exports = router;
