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
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs');
//import connection to database
const connect = require('./database/connect');

//import routing
const AuthAPI = require('./routes/Authapi');
const companyAPI = require('./routes/Companyapi');
const eventAPI = require('./routes/Eventapi');
const tagAPI = require('./routes/Tagapi');
const forgotPasswordAPI = require('./routes/forgotPasswordAPI');
const resetPasswordAPI = require('./routes/resetPasswordAPI');
app.get('/', async (req, res) => {
    res.json({message: "Hello World!"});
});

//use routing
app.use('',AuthAPI);
app.use('',companyAPI);
app.use('',eventAPI);
app.use('',tagAPI);
app.use('',forgotPasswordAPI);
app.use('',resetPasswordAPI);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });