const express = require("express")
const router = express.Router();
const USER = require("../models/User")
const { body , validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

const jwtKey = "Anmol7900##@@$%^&(*&^%$#@";

router.get("/signup" , (req,res)=>{
    res.json({msg:"Signup"})
})

router.post("/signup", [
    body("name").isLength({min:3}),
    body("email").isEmail(),
    body("password").isLength({min:8})
], async (req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){

        let user = await USER.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({msg:"User already exist"})
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            let secPassword = bcrypt.hashSync(req.body.password,salt);

            user = await USER.create({
                name:req.body.name,
                email:req.body.email,
                password:secPassword
            })
            return res.status(201).json({id:user.id})
        }
    }
    else{
        res.send(result)
    }
})

router.get("/login" , (req,res)=>{
    res.json({msg:"Signin"})
})

router.post("/login", [
    body("email").isEmail(),
    body("password").isLength({min:8})
], async (req,res)=>{

    const result = validationResult(req);
    if(result.isEmpty()){

        const{email , password} = req.body;
        try {
            const user = await USER.findOne({email})
            if(!user){
                return res.status(401).json({msg:"Invalid Credentials"})
            }
            else{
                const PassCompare = bcrypt.compareSync(password , user.password);  
                if(PassCompare){
                    req.user = user.id;
                    console.log({id:user.id})
                    return res.status(201).json({id:user.id})
                }
                else{
                    return res.status(401).json({msg:"Invalid Credentials"})
                }
            }
        } catch (error) {
            return res.status(401).json({msg:error})
        }

    }
    else{
        console.log(result)
        return res.status(401).json(result)
    }

})

module.exports = router;