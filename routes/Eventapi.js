const express = require('express');
const router = express.Router();
const passport = require('passport');
const Event = require('../models/EventSchema');

router.get('/events',async(req,res)=>{
    const events = await Event.find().populate('tags');
    res.json(events)
});

router.get('/events/:id',async(req,res)=>{
    const eventId = await Event.findById(req.params.id);
    res.json(eventId);
});

router.post('/events',async(req,res)=>{
    const createdEvent = await Event.create(req.body);
    res.json(createdEvent);
});

router.put('/events/:id',async(req,res)=>{
    const updateEvent = await Event.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(updateEvent);
});

router.delete('/events/:id',async(req,res)=>{
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
})
module.exports = router;