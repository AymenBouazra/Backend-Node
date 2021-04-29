const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Company = require('../models/CompanySchema');
const Token = require('../models/tokenSchema');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


router.post('/forgot-password', async (req, res) => {
    const company = await Company.findOne({ email: req.body.email });

    if (!company) {
        res.status(400).json({ message: "Company does not exist" });
    }
    else{

        const token = await Token.findOne({ companyId: company._id });
        if (token) {
            await token.deleteOne()
        };
        const bcryptSalt = process.env.BCRYPT_SALT;
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
    
        const createdToken = await new Token({
            companyId: company._id,
            token: hash,
            createdAt: Date.now(),
        }).save();
        //send mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const templatePath = path.resolve('./views','resetPassword.html');
        const registerTemplate = fs.readFileSync(templatePath, {encoding:'utf-8'})
        const render= ejs.render(registerTemplate,{name:company.companyName,link:`${process.env.FRONT_URL}reset-password/${createdToken.token}`})
         const info = await transporter.sendMail({
            from: '"Amalia Entertainement event <amaliaentertainment@gmail.com>', // sender address
            to: `${company.email}`,
            subject: "Password reset", 
            html: render
        });
    
        res.json({ message: 'Check your mailbox' })
    }
})

module.exports = router;