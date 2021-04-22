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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import connection to database
const connect = require('./database/connect');

//import routing
const AuthAPI = require('./routes/Authapi');
const companyAPI = require('./routes/Companyapi');
const eventAPI = require('./routes/Eventapi');
const tagAPI = require('./routes/Tagapi');

app.get('/', async (req, res) => {
    res.json({message: "Hello Nadhem"});
});

//use routing
app.use('',AuthAPI);
app.use('',companyAPI);
app.use('',eventAPI);
app.use('',tagAPI);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });