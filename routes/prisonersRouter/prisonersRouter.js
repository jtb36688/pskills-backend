const express = require('express');
const router = express.Router();
const db = require('./prisonersHelper.js');
const { protect } = require('../../auth/protected');


// ----- Routes -----
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getByPrisonerId(id)
        .then(prisoner => {
            if(prisoner) {
                res.status(200).json(prisoner);
            } else {
                res.status(404).json({ message: 'The prisoner does not exist. Please try again.' });
            };
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

router.get('/prison/:prisonId', (req, res) => {
    const prisonId = req.params.prisonId;
    
    db.getPrisonersByPrisonId(prisonId)
        .then(prisoners => {
            res.status(200).json(prisoners);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', protect, (req, res) => {
    const prisoner = req.body;
    const { name, prisonId } = req.body;

    if (name && prisonId) {
        db.insert(prisoner)
            .then(prisoners => {
                res.status(201).json(prisoners);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    } else {
        res.status(400).json({ message: "Prisoner not created. Please ensure you provide a name and prisonId." });
    };
});

router.put('/:id', protect, (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.getByPrisonerId(id)
        .then(prisonerObj => {
            db.update(id, changes, prisonerObj.prisonId)
                .then(Prisoners => {
                    res.status(202).json(Prisoners);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', protect, (req, res) => {
    const id = req.params.id;

    db.getByPrisonerId(id)
        .then(prisonerObj => {
            db.remove(id, prisonerObj.prisonId)
                .then(prisoners => {
                    res.status(200).json(prisoners);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;