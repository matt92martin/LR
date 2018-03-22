var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var saltRound = 10;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: [6, 'Make sure your password is at least 6 characters.'],
        maxlength: [100, 'This is a really long password'],
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date,
        default: Date.now
    }
});


userSchema.methods.validatePassword = function(ptpw, hash){
    return bcrypt.compare(ptpw, hash);
};


userSchema.methods.registerUser = function(cb){

    bcrypt.hash(this.password, saltRound, function(err, pwhash) {

        const user = {
            username: this.username,
            password: pwhash
        };

        this.save(function(err){
            if (err) {
                cb(err);
            }
            cb(null);
        });
    });


};

module.exports = mongoose.model('User', userSchema);