const express = require('express');
const router = express.Router();
const passport = require('passport');
const Company = require('../models/CompanySchema');

router.get('/company',async(req,res)=>{
    const companys = await Company.find().populate('events');
    res.json(companys);
});

router.get('/company/:id',async(req,res)=>{
    const companyId = await Company.findById(req.params.id);
    res.json(companyId);
});

router.post('/company',async(req,res)=>{
    const createdCompany = await Company.create(req.body);
    res.json(createdCompany);
});

router.put('/company/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const updateCompany = await Company.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updateCompany);
})

router.delete('/company/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const deleteCompany = await Company.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
});

module.exports = router;