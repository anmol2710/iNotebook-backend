const express = require("express")
const mongoose = require("mongoose")
const auth = require("./Routes/auth")
const notes = require("./Routes/notes")
const cors = require("cors")
const app = express();
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors());

mongoose.connect("mongodb+srv://anmol:anmol@cluster0.yrfyo8v.mongodb.net/iNotebook?retryWrites=true&w=majority")
    .then(()=>{console.log("Mongodb Connected")})
    .catch(err=>{console.log("Error in Mongodb Connection")})

app.get("/" , (req,res)=>{
    return res.send("Server Started")
})

app.use("/user" , auth)
app.use("/notes" , notes)

app.listen(4000 , ()=>{
    console.log("Server Started")
})