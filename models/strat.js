const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');



passport.use(new LocalStrategy(
    function(username, password, done) {

        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { type: 'error', message: 'Incorrect username.' });
            }

            user.validatePassword(password, user.password).then(function(response){

                if (!response){
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);

            });

        });

    }
));

module.exports = passport;