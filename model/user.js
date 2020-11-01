const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    },

    email: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {   
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, process.env.jwtSecretKey);
    return token;
}

const User = mongoose.model ('User', userSchema);

function validateUser(user)
{
    const schema = {

        name: Joi.string().min(5).max(25).required(),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required()
        
    };
        return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;