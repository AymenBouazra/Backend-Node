const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../models/userschema');

router.get('/users',passport.authenticate('bearer', { session: false }),async(req, res) =>{
  const users = await user.find();
  res.json(users);  
});

router.get('/users/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
const userId = await user.findById(req.params.id);
res.json(userId);
});

router.post('/users',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    
    const userFound = await user.findOne({title:req.body.title})
    if(userFound == null){
        await user.create(req.body);
        res.json('user created !')
    }else
    res.status(400).json('user already exists');
});

router.put('/users/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const updateuser = await user.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateuser);
});

router.delete('/users/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const deleteuser = await user.findOneAndDelete(req.params.id);
    res.json(deleteuser);
})

module.exports = router;