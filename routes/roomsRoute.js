const { Router } = require("express");
const RoomsRoutes = require("./rooms/roomsRoutes.js");
const router = Router();

router.use(RoomsRoutes);

module.exports = router;
