const express    = require('express');
const auth       = require('./routes/auth');
const bluebird   = require('bluebird');
const passport   = require('passport');
const session    = require("express-session");
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/layground', { useMongoClient: true });
mongoose.Promise = bluebird;


const app = express();

app.use(express.static('dist'));

app.use(session({secret: 'secret'}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', auth);


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!\n`);
});