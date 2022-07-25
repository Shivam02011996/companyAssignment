const express=require("express");
const router=express.Router();

const userController=require("../controllers/userController");
const evntController=require("../controllers/eventController");

router.post("/registerUser",userController.registerUser);
router.post("/login",userController.login);


module.exports=router;