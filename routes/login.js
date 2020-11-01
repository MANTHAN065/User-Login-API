const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const {User} = require('../model/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res)=> {
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user =  await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email id or password..');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email id or password..');

    const token = user.generateAuthToken();
    res.send(token);
    });

router.get('/:id', async (req, res)=> {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send(`The customer with Id: ${req.params.id} cannot be found`);
    res.send(customer);
    });

    function validateLogin(req)
    {
        const schema = {

            email: Joi.string().min(5).max(255).email(),
            password: Joi.string().min(5).max(255).required()
            
        };
            return Joi.validate(req, schema);
    }
    
    module.exports.User = User;
    module.exports.validate = validateLogin;


module.exports = router;