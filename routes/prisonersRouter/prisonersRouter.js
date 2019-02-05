const express = require('express');
const router = express.Router();
const db = require('./prisonersHelper.js');


// ----- Routes -----
router.get('/:prisonerId', (req, res) => {
    const id = req.params.prisonerId;

    db.getByPrisonerId(id)
        .then(prisoner => {
            res.status(200).json(prisoner);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.get('/', (req, res) => {
    // db.getAllPrisoners()
    //     .then(prisoners => {
    //         res.status(200).json(prisoners);
    //     })
    //     .catch(err => {
    //         res.status(500).json(err);
    //     });

    // let prisonerArray = [];

    // db.getAllPrisoners()
    //     .then(prisonerList => {
    //         prisonerList.map(prisoner => {
    //             db.getByPrisonerId(prisoner.id)
    //                 .then(newPrisoner => {
    //                     prisonerArray.push(newPrisoner);
    //                     // console.log('log2',prisonerArray);
    //                 })
    //         })
    //     })
    //     console.log(prisonerList)
    //     res.status(200).json(prisonerArray);
});

router.post('/', (req, res) => {
    const prisonerInfo = req.body;

    db.insert(prisonerInfo)
        .then(newPrisoner => {
            res.status(201).json(newPrisoner)
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.update(id, changes)
        .then(updatedPrisoner => {
            res.status(200).json(updatedPrisoner);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
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