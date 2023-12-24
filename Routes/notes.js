const express = require("express")
const router = express.Router();
const NOTE = require("../models/Note")

router.post("/fetch" , async (req,res)=>{
    const notes = await NOTE.find({user:req.body.user});
    res.json({notes})
})

router.post("/add" , async (req,res)=>{
    const note = await NOTE.create({
        user:req.body.token,
        title:req.body.title,
        description:req.body.description
    });
    res.send(note)
})

router.get("/:id" ,async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const note = await NOTE.find({_id:id})
    console.log(note)
    res.send(note);
})

router.delete("/delete/:id" , async(req,res)=>{
    console.log()
    const deleteNote = await NOTE.findByIdAndDelete(req.params.id);
    console.log(deleteNote)
    if(deleteNote){
        return res.status(404).json({msg:"Note not found"})
    }
    else{
        return res.status(200).json({msg:"Note deleted Succesfully"})
    }
})

module.exports = router;