require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../data/dbConfig.js');

// ----- Routes -----
router.post('/register', (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;

    db('users')
        .insert(userInfo)
        .then(ids => {
            res.status(201).json({ message: "You have successfully registered" });
        })
        .catch(err => {
            res.status(500).json({ error: "Something happened. You were not successfully registered" });
        });
});

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

router.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, token });
            } else {
                res.status(401).json({ message: 'You are not authorized. Please try logging again.' });
            };
        })
        .catch(err => res.status(500).json(err));
});


module.exports = router;