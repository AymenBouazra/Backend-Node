const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({ debug: process.env.DEBUG });
const passport = require('./passports/passport');
const port = 3000;

const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: "52428800"}));
app.use(bodyParser.urlencoded({limit: "52428800", extended: true, parameterLimit:50000}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
//import connection to database
const connect = require('./database/connect');

//import routing
const AuthAPI = require('./routes/Authapi');
const companyAPI = require('./routes/Companyapi');
const eventAPI = require('./routes/Eventapi');
const tagAPI = require('./routes/Tagapi');
const homeAPI = require('./routes/homeAPI');
const forgotPasswordAPI = require('./routes/forgotPasswordAPI');
const resetPasswordAPI = require('./routes/resetPasswordAPI');
const contactAPI = require('./routes/Contactapi');
const reservationAPI = require('./routes/Reservationapi')
app.get('/', async (req, res) => {
    res.json({message: "Hello World!"});
});

//use routing
app.use('',AuthAPI);
app.use('',companyAPI);
app.use('',eventAPI);
app.use('',tagAPI);
app.use('',reservationAPI);
app.use('',homeAPI);
app.use('',forgotPasswordAPI);
app.use('',resetPasswordAPI);
app.use('',contactAPI);


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });