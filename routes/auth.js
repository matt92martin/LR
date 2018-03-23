const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcrypt');
const passport = require('../models/strat');


const User = require('../models/user');

const saltRound = 10;



router.get('/users', function(req, res){

    User.find({}, function(err, users){
        if (err) {
            return res.json({type: 'error', message: 'You don\'t have access to that.'});
        }
        res.json(users);
    });
});




router.post('/register', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password){
        return res.json({type: 'error', message: 'Your username or password is not validate.'});
    }

    User.hashPW(password, function(err, pwhash){

        if (err) return res.json({success: false, extras: { msg: 'Your username or password is not validate.'} });

        User.create({username: username, password: pwhash}, function (err, user) {
            if (err) return res.json({ success: false, extras: { msg: 'User could not be created.' } });

            // res.json({success: true, extras: { msg: 'Sign in successful.', payload: user.username } });
            var json = JSON.stringify({success: true});
            console.log(json);
            res.json(json);
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