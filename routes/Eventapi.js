const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const Event = require('../models/EventSchema');
const Company = require('../models/CompanySchema');

const myStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        const folder = path.resolve('./uploads');
        cb(null,folder);
    },
    filename: async(req,file,cb) => {
        const extension = path.extname(file.originalname) ;
        const newFileName = Date.now() + extension;
        await User.findByIdAndUpdate(req.params.id,{photo: newFileName},{new:true})
        cb(null,newFileName);
    },
    
});
const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.png','.jpeg','.jpg']
    const extension = path.extname(file.originalname) ;
    cb(null, allowedFileExtensions.includes(extension));
}
const upload = multer({ 
    storage: myStorage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 200
    },
});

router.get('/events',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const events = await Event.find().populate('tags');
    res.json(events)
});

router.get('/events/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const eventId = await Event.findById(req.params.id);
    res.json(eventId);
});

router.post('/events',[passport.authenticate('bearer', { session: false }),upload.single('photo')],async(req,res)=>{
    const createdEvent = await Event.create(req.body);
    const updatedCompany = await Company.findByIdAndUpdate(req.user._id,{$push:{events:createdEvent._id}},{new:true})
    res.json(createdEvent);
    console.log(createdEvent);
    console.log(updatedCompany);
});

router.put('/events/:id',[passport.authenticate('bearer', { session: false }),upload.single('photo')],async(req,res)=>{
    const updateEvent = await Event.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(updateEvent);
});

router.delete('/events/:id',passport.authenticate('bearer', { session: false }),async(req,res)=>{
    const deleteEvent = await Event.findByIdAndDelete(req.params.id);
    res.json({message: 'delete seccussefuly'});
})
module.exports = router;