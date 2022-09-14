const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function(req,email,password,done){
        let user = await User.findOne({email: email}); 
            console.log(user);
            if(!user ||user.password != password){
                console.log('wrong Credentials');
                return done(null, false);
            }

            return done(null, user);
        })
    );

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding User --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication= function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;