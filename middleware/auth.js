const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next)
{
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied. No token provided.');

    try
    {    
        const payload = jwt.verify(token, process.env.jwtSecretKey);
        req.user = payload;
        next();
    }
    catch (err)
    {
        res.status(400).send('Access denied. Token is invalid');
    }

}

module.exports = auth;