var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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

userSchema.methods.registerUser = function(){
    return bcrypt.compare(ptpw, hash);
};

module.exports = mongoose.model('User', userSchema);