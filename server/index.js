const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const helmet = require('helmet')
const cors = require('cors');
const logger = require('morgan');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const exsession = require("express-session");
const passport = require('passport');
const app = express();
const port = process.env.port || 3000;
let twitterPassport = require('./security/twitter');
let db = require('./security/config')
app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.static("public"));
app.use(exsession({ secret: "cats", saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());  
twitterPassport(passport);
mongoose.connect('mongodb://localhost/geocrimes');

app.get('*', (req, res)=>{
    res.send('client/dist/index.html');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                      failureRedirect: '/login' }));


app.listen(port, ()=>{
    console.log('Se conecta al puerto ' + port)
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;    