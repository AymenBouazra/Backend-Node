const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const Company = require('../models/CompanySchema');
const bcrypt = require('bcrypt');
const path = require('path')

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = path.resolve('./uploads');
        cb(null, folder);
    },
    filename: async (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const newFileName = Date.now() + extension;
        const photoLink = 'http://localhost:3000/uploads/' + newFileName;
        if (req.params.id) {
            req.body.photo = photoLink;
            await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
        } else {
            req.body.photo = photoLink;
            bcrypt.hash(req.body.password, 10, async (error, hash) => {
                if (error) {
                    res.status(500).json({ message: 'Server error ! ' });
                }
                req.body.password = hash;
                await Company.create(req.body);
                cb(null, newFileName);;
            })
        }
    },
});
const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.png', '.jpeg', '.jpg']
    const extension = path.extname(file.originalname);
    cb(null, allowedFileExtensions.includes(extension));
}
const upload = multer({
    storage: myStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 20000
    },
});

router.get('/company', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const companys = await Company.find().populate('events');
    res.json(companys);
});

router.get('/company/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const companyId = await Company.findById(req.params.id);
    res.json(companyId);
});

router.post('/company', [passport.authenticate('bearer', { session: false }), upload.single('photo')], async (req, res) => {
    res.status(200).json({ message: 'Saved !' });
});

router.put('/company/:id', [passport.authenticate('bearer', { session: false }), upload.single('photo')], async (req, res) => {
    res.json({message:'Updated! '});
})

router.delete('/company/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const deleteCompany = await Company.findByIdAndDelete(req.params.id);
    res.json({ message: 'delete seccussefuly' });
});

module.exports = router;