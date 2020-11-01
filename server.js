require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');
const login = require('./routes/login');

if(!process.env.jwtSecretKey)
{
    console.log('jwtSecretKey is not defined');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/users')
.then(()=> console.log('Connected Successfully..'))
.catch(err => console.error('Couldnot connect to MongoDB', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/login', login);

const port = process.env.PORT||3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));

