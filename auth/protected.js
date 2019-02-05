const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

module.exports = {
    protected,
};


// use this function as middleware on any routes that need to be protected
function protected(req, res, next) {
    const token = req.headers.authorization; //grabs the token from the request header. This token was originally sent to the client from the .post /api/login

    if (token) {
        jwt.verify(token, jwtKey, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'no token provided' });
    };
};