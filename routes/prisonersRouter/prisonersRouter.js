const express = require('express');
const router = express.Router();
const db = require('./prisonersHelper.js');


// ----- Routes -----
router.get('/:id/skills', (req, res) => {
    const id = req.params.id;

    db.getPrisonerSkills(id)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getById(id)
        .then(prisoner => {
            res.status(200).json(prisoner);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
  
//     db('prisoners')
//       .where('prisoner.id', id)
//       .then(prisoner => {
//         if (prisoner.length) {
//           db('prisoners_skills as ps')
//             .where({ prisonerId: id })
//             .then(skills => {
//               res.status(200).json({ prisoner, skills });
//             })
//             .catch(err => {
//               res.status(500).json(err);
//             });
//         } else {
//           res.status(404).json({ msg: "not found" });
//         }
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   });

router.get('/', (req, res) => {
    db.getAll()
    .then(prisoners => {
        res.status(200).json(prisoners);
    })
    .catch(err => {
        res.status(500).json(err);
    });
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