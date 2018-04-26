var express = require('express');
var router = express.Router();

module.exports = function(passport){
    router.get('/auth/twitter', passport.authenticate('twitter'));
    
    router.get('/auth/twitter/callback',
      passport.authenticate('twitter', { successRedirect: '/',
                                          failureRedirect: '/mal',
                                          failureFlash: true }));
    
    router.get('/logout', function (req, res){
      req.session.destroy(function (err) {
          if (err) {
              console.log(err);
          }
        res.redirect('/'); //Inside a callback… bulletproof!
      });
      req.session = null
    });
    
    router.get('/logout', function (req, res){
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            }
          res.redirect('/'); //Inside a callback… bulletproof!
        });
        req.session = null
      });
}



module.exports = router;