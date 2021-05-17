const express = require('express');
const app = express()
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/UserSchema');
const Reservation = require('../models/reservationSchema');
const Event = require('../models/EventSchema')
const path = require('path');
const ejs = require('ejs');
const pdf = require("pdf-creator-node");
const fs = require("fs");
const QRCode = require("qrcode");
app.set('view engine', 'ejs')

router.post('/reservation/:id', async (req, res) => {
    const event = await Event.findById(req.params.id)
    const user = await User.create(req.body.user);
    const reservations = await Reservation.insertMany(req.body.reservations);
    // step 2 GENERATE PDF containing reservation invitation
  

    await reservations.forEach( async (reservation) => {
        //generate qrcode 
        const startDate= new Date(event.startDate);
        const formatedStartDate = `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`
        const endDate= new Date(event.endDate);
        const formatedEndDate = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`
        const startTime= new Date(event.startTime);
        const formatedStartTime = `${startTime.getHours()} : ${startTime.getMinutes()}`
        const endTime= new Date(event.endTime);
        const formatedEndTime = `${endTime.getHours()} : ${endTime.getMinutes()}`
        let reserved = {
            fullName: `${reservation.firstName} ${reservation.lastName}`,
            firstname: `${reservation.firstName}`,
            lastname: `${reservation.lastName}`,
            email: `${reservation.email}`,
            qrcodeLink: `http://localhost:3000/qrcodes/${reservation._id}.png`,
            eventName: `${event.eventName}`,
            startDate: `${formatedStartDate}`,
            endDate:`${formatedEndDate}`,
            startTime : `${formatedStartTime}`,
            endTime:`${formatedEndTime}`
        }
       
        await QRCode.toFile(path.resolve(`./qrcodes/${reservation._id}.png`),JSON.stringify(reserved))

        // render
        const html = fs.readFileSync("views/reservation.html", "utf8");
        const render = ejs.render(html, reserved)
        // pdf creation 
        const Document = {
            html: render,
            data: {
                users: reservation,
            },
            path: path.resolve('./ticket.pdf'),
            type: "",
        };
        var options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm"
        };
       
        pdf.create(Document,options).then((res) => {
            
            // step 3 send mail for each reservation
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                },
            });
            transporter.sendMail({
                from: process.env.EMAIL,
                to: reserved.email,
                subject: 'Your reservation ticket',
                text: 'Here is your reservation ticket',
                attachments: [{
                    filename: 'ticket.pdf',
                    content: fs.createReadStream(res.filename)
                }]
            });

        }).catch((error) => {
            console.error(error);
        })
    })

    res.json({ message: 'Reservation created successfully!' });
});

module.exports = router;