const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctors');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'blahSomething'
}


//JWT authentication
passport.use(new JWTStrategy(opts, function (jwtPayLoad, done) {

    // Find doctor with the and set user as doc
    Doctor.findById(jwtPayLoad).then((doc) => {
        if (doc) {
            return done(null, doc);
        } else {
            return done(null, false);
        }
    }).catch((err) => {
        if (err) { console.log('Error in finding doc from JWT'); return; }
    });

}));

module.exports = passport;