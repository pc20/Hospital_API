const express = require('express');
const app = express();

// for securing credentials
require("dotenv").config();

const bodyParser = require('body-parser');
const db = require('./config/mongoose');
db();
const passport = require('passport');
const passportStrategy = require('./config/passport-jwt-Strategy');

app.use(
    bodyParser.urlencoded({ extended: false })
);

app.use(bodyParser.json());


//import or use express router 
app.use('/', require('./routes'));


const PORT = process.env.PORT;
app.listen(PORT, function (err) {
    if (err) {
        console.log('error', err);
    }

    console.log(`Server is running on port: ${PORT}`);
});