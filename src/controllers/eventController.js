const EventModel=require("../models/eventModel")
const UserModel=require("../models/userModel")
const validator=require("../utils/validator")


const addEvent=async(req,res)=>{
    try{
            
        if(!validator.isValidRequestBody(req.body))
        return res.status(400).json({status:false,msg:"invalid request parameters ,please provide event details"})

        let {title,description,eventDate}=req.body;
        let {invitee,timings}=req.body.invitees[0];
     
        if(!validator.isValid(title))
        return res.status(400).json({status:false,msg:"please provide title"})

        if(!validator.isValid(description))
        return res.status(400).json({status:false,msg:"please provide description"})

        if(!validator.isValid(eventDate))
        return res.status(400).json({status:false,msg:"please provide event date"})

        if(!validator.isValidObjectId(invitee) && !validator.isValid(invitee))
        return res.status(400).json({status:false,msg:"please provide valid invite id"})

        if(!validator.isValid(timings))
        return res.status(400).json({status:false,msg:"please provide timings"})

        let newEvent = await EventModel.create(req.body)
        return res.status(201).json({status:true,msg:"event added successfully",data:newEvent})

    }catch(err){
        return res.status(500).json({status:false,msg:err.message})
    }
}

//

const invite=async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({status:false,msg:err.message})
    }
}

//


const events=async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({status:false,msg:err.message})
    }
}

//


const updateEvent=async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({status:false,msg:err.message})
    }
}

//


const details=async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({status:false,msg:err.message})
    }
}

module.exports={addEvent,invite,events,updateEvent,details};