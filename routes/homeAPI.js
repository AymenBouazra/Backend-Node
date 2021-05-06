const express = require('express');
const router = express.Router();
const Event = require('../models/EventSchema');



router.get('/all-events', async (req, res) => {
    const events = await Event.find().populate('tags');
    res.json(events)
});
router.get('/events/:id',async(req,res)=>{
    const eventId = await Event.findById(req.params.id);
    res.json(eventId);
});

module.exports = router;