const { Router } = require("express");
const UserRoutes = require("./users/usersRoutes");
const router = Router();

router.use(UserRoutes);

module.exports = router;
