const express  = require("express");
const {QuestionModel} = require("../models/interview.model")
const interviewerRouter = express.Router();


interviewerRouter.get("/",async(req,res)=>{

    try {
        const question =  await QuestionModel.find();
       return res.status(200).send(question);

    } catch (error) {
        return res.status(400).send({message:error.message})
    }
});

interviewerRouter.post("/add",async(req,res)=>{

    try {
        const question =new  QuestionModel(req.body);
        await question.save();

       return res.status(200).send({message:"new question has been add","newQue":question});

    } catch (error) {
        return res.status(400).send({message:error.message})
    }
});


module.exports ={interviewerRouter};