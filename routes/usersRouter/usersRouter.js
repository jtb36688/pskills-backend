require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbConfig.js');
const { generateToken } = require('../../auth/protected');

// ----- Routes -----
router.post('/register', (req, res) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 12);
    userInfo.password = hash;
    console.log(hash);

    db('users')
        .insert(userInfo)
        .then(id => {
            res.status(201).json(id);
        })
        .catch(err => {
            res.status(500).json({ error: "Something happened. You were not successfully registered" });
        });
});

router.post('/login', (req, res) => {
    const creds = req.body;

    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}`, id: user.id, token });
            } else {
                res.status(401).json({ message: 'You are not authorized. Please try logging again.' });
            };
        })
        .catch(err => res.status(500).json(err));
});

router.get('/users', (req, res) => {
    db('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;