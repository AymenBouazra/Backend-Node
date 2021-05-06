const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', (req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    transporter.sendMail({
        from: req.body.email,
        to: process.env.EMAIL,
        subject: 'Message from: '+req.body.name+', with his e-mail :'+req.body.email+', Subject: '+req.body.subject,
        text: req.body.text
    });
    res.json({message: 'Mail send successfully'})
})


module.exports = router;