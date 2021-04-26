const express = require('express');
const router = express.Router();
const passport = require('passport');
const Tag = require('../models/TagSchema');

router.get('/tags',async(req, res) =>{
  const tags = await Tag.find();
  res.json(tags);  
});

router.get('/tags/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
const tagId = await Tag.findById(req.params.id);
res.json(tagId);
});

router.post('/tags',async(req,res)=>{
    
    const tagFound = await Tag.findOne({title:req.body.title})
    if(tagFound == null){
        await Tag.create(req.body);
        res.json('Tag created !')
    }else
    res.status(400).json('tag already exists');
});

router.put('/tags/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTag);
});

router.delete('/tags/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const deleteTag = await Tag.findOneAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
})

module.exports = router;