const express = require('express');
const router = express.Router();
const passport = require('passport');
const Company = require('../models/CompanySchema');

router.get('/company',async(req,res)=>{
    const companys = await Company.find();
    res.json(companys);
});

router.get('/company/:id',async(req,res)=>{
    const companyId = await Company.findById(req.params.id);
    res.json(companyId);
})

router.post('/company')


module.exports = router;