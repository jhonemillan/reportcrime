var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const validator = require('node-mongoose-validator');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    twitter: {
                id: {type: String},
                username: {type: String},
                token:{type: String}      
            }    
  });

  UserSchema.statics.findOrCreate = function(token, tokenSecret, profile, done){ 
      let User = this;   
    return User.findOne({'twitter.id': profile.id}).then((u)=>{         
        if(!u){                        
            let user = new User();
            user.twitter.username = profile.username;
            user.twitter.id = profile.id;
            user.twitter.token = token;

            user.save(function(err,usr){
                debugger;
                if(err){
                   throw err;
                }
                return done(null, usr);
            })

        }else{            
            return done(null, u);
        }

    }).catch((e)=> {
        console.log(e);
       return done(e);
    });
}

module.exports = mongoose.model('user',UserSchema,'users');