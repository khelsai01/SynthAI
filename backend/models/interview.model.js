const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    question:String,
    answer:String,
},{
    versionKey:false
});

const QuestionModel = mongoose.model("question",questionSchema);

module.exports= {QuestionModel};