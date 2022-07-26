const express=require("express");
const router=express.Router();

const userController=require("../controllers/userController");
const evntController=require("../controllers/eventController");
const {authorization}=require("../middleware/mid");

// User`s Api`s
router.post("/registerUser",userController.registerUser);
router.post("/login",userController.login);
router.get("/logout",authorization,userController.logout);
router.post("/changePassword/:userId",authorization,userController.changePassword);

// Event`s Api`s
router.post("/addEvent",evntController.addEvent);
router.post("/inviteEvent/:id",evntController.invite);
router.get("/listEvent",evntController.events);
router.post("/changeEvent/:userId",evntController.updateEvent);
router.post("/eventsDetails",evntController.details);

module.exports=router;