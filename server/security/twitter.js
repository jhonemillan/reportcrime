var TwitterStrategy  = require('passport-twitter').Strategy;
var User = require('../model/User');
var twitterAuth = require('./config').twitterAuth;

module.exports = function twitterPassport (passport)
{    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use('twitter', new TwitterStrategy(
    {
        consumerKey     : twitterAuth.consumerKey,
        consumerSecret  : twitterAuth.consumerSecret,        
        callbackURL     : twitterAuth.callbackURL,
        userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true"        
    }, function(token, tokenSecret, profile, done) {

        process.nextTick(function() {
            User.findOrCreate(token, tokenSecret, profile, (err, user)=>{                
                return done(err,user);
            });                 
        });        
    }));


}