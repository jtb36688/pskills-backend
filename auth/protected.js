const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

module.exports = {
    protect,
    generateToken
};

// use this function as middleware on any routes that need to be protected
function protect(req, res, next) {
    const token = req.headers.authorization;
    
    if (token) {
        jwt.verify(token, jwtKey, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(401).json({ error: 'Invalid token' });
                
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'no token provided' });
    };
};

// Generate a token. Used in the /api/users/login route. It is called if the user logs in with a valid username and password.
function generateToken(user) {
    const payload = {
        username: user.username,
    };

    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '60m'
    };

    return jwt.sign(payload, secret, options);
};