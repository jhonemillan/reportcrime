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
const MongoDBStore = require('connect-mongodb-session')(exsession);
let twitterPassport = require('./security/twitter');
let db = require('./security/config')
app.use(logger('dev'));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, '../client/dist')));


var store = new MongoDBStore(
    {
      uri: db.database,
      databaseName: 'geocrimes',
      collection: 'sessions'
    });

app.use(passport.initialize());
app.use(exsession({ secret: db.secretApp, 
                    saveUninitialized: true, 
                    store: store,
                    cookie: {
                        secure: false,
                        maxage: 6000000
                    },
                    resave: true }));                    

twitterPassport(passport);
mongoose.connect(db.database);

// file:app/authentication/middleware.js
function authenticationMiddleware () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.render('/');
    }
  }

app.get('/auth/twitter', passport.authenticate('twitter'));


app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                      failureRedirect: '/login',
                                      failureFlash: true }));

app.get('/logout', function (req, res){
  req.session.destroy();      
  req.logOut();
  res.send('fuera');
});

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

// Catch errors
store.on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

module.exports = app;    