const express = require('express');
const router = express.Router();
const db = require('./prisonsHelper.js');
const { protected } = require('../../auth/protected');

// ----- Routes -----
router.get('/:prisonId', (req, res) => {
    const id = req.params.prisonId;

    db.getByPrisonId(id)
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

router.post('/', protected, (req, res) => {
    const prisonInfo = req.body;

    db.insert(prisonInfo)
        .then(newPrison => {
            res.status(201).json(newPrison)
        })
});

router.put('/:id', protected, (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.update(id, changes)
        .then(res => {
            res.status(202).json({ message: 'Prison successfully updated' });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', protected, (req, res) => {
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