const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Company = require('../models/CompanySchema');

//Sign Up
router.post('/register',async(req,res)=>{
    const companyFound = await Company.findOne({email:req.body.email})
    if(companyFound == null){
        bcrypt.hash(req.body.password, 10, async(error, hash)=>{
            if (error) {
                res.status(500).json({message: 'Server error ! '});
            }
            req.body.password = hash;
            await Company.create(req.body);
            res.json({message: 'Register successfullu'});
        });
    }else{
        res.status(400).json({message: 'E-mail Exist !'});
    }
});

//Sign In
router.post('login',async(req,res)=>{
    const loginCompany = await Company.findOne({email: req.body.email});
    if (loginCompany != null) {
        const validPassword = await bcrypt.compare(req.body.password, loginCompany.password);
        if (validPassword) {
            const tokenData = {
                companyName: loginCompany.companyName,
                companyId: loginCompany._id
            }
            const createdToken = jwt.sign(tokenData, process.env.JWT_SECRET,{expiresIn: process.nextTick.EXPIRE});
            res.status(200).json({message: 'Login seccessfully', token: createdToken});
        } else {
            res.status(400).json({message: 'Please verify your E-mail or Password'});
        }
    } else {
        res.status(400).json({message: 'Please verify your E-mail or Password'});
    }
})

module.exports = router;