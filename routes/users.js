const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User, validate} = require('../model/user');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
require('dotenv').config();

router.post('/', async (req, res)=> {
    const {error} = validate (req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user =  await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('The user with current email id already exist..');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    
    const token = jwt.sign({_id: user.id}, process.env.jwtSecretKey);
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));

    });

router.get('/me', auth, async (req, res)=> {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
    });

module.exports = router;