const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', async(req, res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from: `${req.body.email}`, // sender address
        to: `${process.env.EMAIL}`,
        subject: `${req.body.subject}`, 
        text: `${req.body.text}`
    });
    res.json({message: 'Mail send successfully'})
})


module.exports = router;