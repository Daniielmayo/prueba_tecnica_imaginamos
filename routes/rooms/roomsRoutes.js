const { Router } = require("express");
const { CreateRoom } = require("../../controllers/Rooms/CreateRooms");
const { AllRooms } = require("../../controllers/Rooms/allRooms");

const router = Router();

router.get("/", AllRooms);
router.post("/createRoom", CreateRoom);

module.exports = router;
