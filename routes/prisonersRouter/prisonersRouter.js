const express = require('express');
const router = express.Router();
const db = require('./prisonersHelper.js');
const { protected } = require('../../auth/protected');


// ----- Routes -----
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getByPrisonerId(id)
        .then(prisoner => {
            if(prisoner) {
                res.status(200).json(prisoner);
            } else {
                res.status(404).json({ message: 'The prisoner does not exist. Please try again.' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.get('/', (req, res) => {
    db.getAllPrisoners()
        .then(prisoners => {
            res.status(200).json(prisoners);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', protected, (req, res) => {
    const prisoner = req.body;
    const { name, prisonId } = req.body;

    if (name && prisonId) {
        db.insert(prisoner)
            .then(newPrisoner => {
                res.status(201).json(newPrisoner)
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).json({ message: "Prisoner not created. Please ensure you provide a name and prisonId." })
    }
});

router.put('/:id', protected, (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    const prisoner = db.getByPrisonerId(id);

    db.update(id, changes)
        .then(res => {
            res.status(200).json({ message: `Prisoner id ${prisoner.id} edited successfully`});
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', protected, (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(count => {
            res.status(200).json({ message: `${count} prisoner removed` });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;