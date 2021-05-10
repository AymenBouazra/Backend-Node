const express = require('express');
const app = express()
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/UserSchema');
const Reservation = require('../models/reservationSchema');
const path = require('path');
const ejs = require('ejs');
const pdf = require("pdf-creator-node");
const fs = require("fs");
const QRCode = require("qrcode");
const { Canvas } = require('node-canvas')
app.set('view engine', 'ejs')

router.post('/reservation', async (req, res) => {
    const user = await User.create(req.body.user);
    const reservations = await Reservation.insertMany(req.body.reservations);
    // step 2 GENERATE PDF containing reservation invitation

    reservations.forEach(reservation => {
        const html = fs.readFileSync("views/reservation.html", "utf8");
        // console.log(" for each" + reservations)
        let reserved = {
            fullName: `${reservation.firstName} ${reservation.lastName}`,
            firstname: `${reservation.firstName}`,
            lastname: `${reservation.lastName}`,
            email: `${reservation.email}`,
            // canvas:''
        }



        // const stringdata = JSON.stringify(reserved);

        // if(stringData.length ===0 ) {
        //     res.send('Empty data!')
        // }else {
        //     QRCode.toDataURL(stringData, (err,url)=>  {
        //         if(err){
        //             res.send('Error occured')
        //         }else{
        //             res.render(html,{url})
        //         }
        //     })
        // };

        // let s = ''
        // generateQR = async (stringdata) => {


        // QRCode.toCanvas(new Canvas(),stringdata,{type: "png"})
        //     .then(canvas => {
        //       console.log(canvas)
        //     //   reserved.canvas = canvas
        //     })
        //     .catch(err => {
        //       console.error(err)
        //     })



        // (async () => {
        //     let a = await generateQR(stringdata)
        //     console.log(reserved)
        // })()
        // render
        const render = ejs.render(html, reserved)
        // console.log(render);

        // pdf creation 

        const document = {
            html: render,
            data: {
                users: reservations,
            },
            path: "./output.pdf",
            type: "",
        };

        pdf.create(document, reservation).toStream((buffer) => {
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
                attachements: [{
                    filename: 'ticket.pdf',
                    content: buffer
                }]
            });

        }).catch((error) => {
            console.error(error);
        })
    })

    res.json({ message: 'Reservation created successfully!' });
});

module.exports = router;