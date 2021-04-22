const express = require('express');
const router = express.Router();
const passport = require('passport');
const Tag = require('../models/TagSchema');

router.get('/tags',async(req, res) =>{
  const tags = await Tag.find();
  res.json(tags);  
});

router.get('/tags/:id',async(req,res)=>{
const tagId = await Tag.findById(req.params.id);
res.json(tagId);
});

router.post('/tags',async(req,res)=>{
    const createdTag = await Tag.create(req.body);
    res.json(createdTag);
});

router.put('/tags/:id',async(req,res)=>{
    const updateTag = await Tag.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateTag);
});

router.delete('/tags/:id',async(req,res)=>{
    const deleteTag = await Tag.findOneAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
})

module.exports = router;