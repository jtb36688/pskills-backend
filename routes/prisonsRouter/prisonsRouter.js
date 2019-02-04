const express = require('express');
const router = express.Router();
const db = require('./prisonsHelper.js');

// ----- Routes -----
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getById(id)
        .then(prison => {
            res.status(200).json(prison);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    db.getAll()
    .then(prisons => {
        res.status(200).json(prisons);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    const prisonInfo = req.body;

    db.insert(prisonInfo)
        .then(newPrison => {
            res.status(201).json(newPrison)
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.update(id, changes)
        .then(updatedPrison => {
            res.status(200).json(updatedPrison);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(count => {
            res.status(200).json({ message: `${count} prison removed` });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;