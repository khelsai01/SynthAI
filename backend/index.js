const express = require("express");
const { interviewerRouter } = require("./routes/interview.routes");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");


const app = express()
;
app.use(cors());
app.use(express.json());
app.use("/interview",interviewerRouter);


app.listen(8080 ,async()=>{
    try {
        await connection;
        console.log("Server has been connected in Database")
        console.log(`Server has been runting at port ${process.env.PORT}`)

    } catch (error) {
        throw new Error(`error`)
    }
})