const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/UserSchema');
const Reservation = require('../models/reservationSchema');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');

router.post('/reservation',async(req,res)=>{
   const createUser = await User.create(req.body.user);
   const createReservation = await Reservation.insertMany(req.body.reservation)   
   // step 2 GENERATE PDF containing reservation invitation

    // step 3 send mail for each reservation
    
   res.json({message:'Reservation created successfully!'});
});

module.exports = router;