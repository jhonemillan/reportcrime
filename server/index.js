const bodyparser = require('body-parser');
const express = require('express');
var path = require('path');
const helmet = require('helmet')
const cors = require('cors');
const logger = require('morgan');
const favicon = require('serve-favicon');
var mongoose = require('mongoose');

const passport = require('passport');
const app = express();
const port = process.env.port || 3000;

  
  app.use(logger('dev'));
  app.use(cors());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
//   var expressSession = require('express-session');
//   app.use(expressSession({secret: 'mySecret'}));
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Initialize Passport
// var initPassport = require('./config/init');
// initPassport(passport);

app.get('*', (req, res)=>{
    res.send('client/dist/index.html');
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

module.exports = app;    