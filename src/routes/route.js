const express=require("express");
const router=express.Router();

const userController=require("../controllers/userController");
const evntController=require("../controllers/eventController");
const {authorization}=require("../middleware/mid")
router.post("/registerUser",userController.registerUser);
router.post("/login",userController.login);
router.get("/logout",authorization,userController.logout)

module.exports=router;