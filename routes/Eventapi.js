const express = require('express');
const router = express.Router();
const passport = require('passport');
const Event = require('../models/EventSchema');
const Company = require('../models/CompanySchema');

router.get('/events',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const events = await Event.find().populate('tags');
    res.json(events)
});

router.get('/events/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const eventId = await Event.findById(req.params.id);
    res.json(eventId);
});

router.post('/events',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const createdEvent = await Event.create(req.body);
    const updatedCompany = await Company.findByIdAndUpdate(req.user._id,{$push:{events:createdEvent._id}},{new:true})
    res.json(createdEvent);
});

router.put('/events/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const updateEvent = await Event.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(updateEvent);
});

router.delete('/events/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
})
module.exports = router;