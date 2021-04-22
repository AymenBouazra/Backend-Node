const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import connection to database
const connect = require('./database/connect');

//import routing

app.get('/', async (req, res) => {
    res.json({message: "Hello Nadhem"});
});

//use routing


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });