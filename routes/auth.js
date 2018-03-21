const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcrypt');
const passport = require('../models/strat');


const User = require('../models/user');

const saltRound = 10;



router.get('/users', function(req, res){

    User.find({}, function(err, user){
        if (err) {
            console.log(err);
            return res.json({type: 'error', message: 'You don\'t have access to that.'});
        }
        res.send(user);
    });
});




router.post('/register', function(req, res){

    if (!req.body.username || !req.body.password){
        return res.json({type: 'error', message: 'Username or Password is not validate'});
    }

    bcrypt.hash(req.body.password, saltRound, function(err, pwhash) {
        const user = {
            username: req.body.username,
            password: pwhash
        };

        User.create(user, function(err, user){
            if (err) {
                console.log(err);
                return res.json({type: 'error', message: 'Username or Password is not validate'});
            }
            res.json({type: 'success', username: user.username});
        });
    });
});



// router.post('/login', function(req, res){
//     const bodyusername = req.body.username;
//     const bodypassword = req.body.password;
//
//     if (!bodyusername || !bodypassword){
//         return res.json({type: 'error', message: 'Username or Password is not validate'});
//     }
//
//     User.findOne({username: bodyusername}, function(err, user){
//
//         if (err) {
//             console.log(err);
//             return res.json({type: 'error', message: 'Username or Password is not validate'});
//         }
//
//         user.validatePassword(bodypassword, user.password).then(function(response){
//
//             if (!response){
//                 res.json({type: 'error', message: 'Username or Password is not validate'});
//             }
//
//             res.json({
//                 type: 'success',
//                 message: 'Success!',
//                 username: user.username
//             });
//
//         })
//     });
//
// });
// router.post('/login',
//     passport.authenticate('local',
//         { successRedirect: '/',
//         failureRedirect: '/login',
//         failureFlash: true },
//     function(err, user, info){
//         console.log(done);
//     })
// );

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        console.log(err);
        console.log(user);
        console.log(info);
        // if (err) { return next(err); }
        // if (!user) { return res.redirect('/login'); }
        // req.logIn(user, function(err) {
        //     if (err) { return next(err); }
        //     return res.redirect('/users/' + user.username);
        // });
        res.json({type: 'success', message: 'You\'ve logged in.'});
    })(req, res, next);
});

router.get('/test', checkAuth, function(req, res){
    console.log('Is Authenticated');
    res.json({type: 'success', message: 'Wow you\'re authenticated!'})
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});



function checkAuth(req,res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;