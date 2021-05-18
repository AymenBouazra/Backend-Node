const express = require('express');
const router = express.Router();
const passport = require('passport')
const Events = require('../models/EventSchema');
const Companies = require('../models/CompanySchema');
const Tags = require('../models/TagSchema')
const Reservation = require('../models/reservationSchema');


router.get('/dashboard',passport.authenticate('bearer', { session: false }), async(req,res)=>{
    const events = await Events.count()
    const tags = await Tags.count()
    const companies = await Companies.count()
    const reservation = await Reservation.count()
    res.json({
        'eventcount': events,
        'tagcount':tags,
        'companycount':companies,
        'reservationcount':reservation
    });
    // res.json({message : 'Numbers counted!'})
})

module.exports = router;