const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    insert,
    getById,
    update,
    remove,
    getPrisonerSkills,
};

function getById(id) {
    let prisoner =  db('prisoners')
        .where('prisoners.id', id)
        .first();

    let pSkills = db('prisoners_skills as ps')
        .join('skills as s', 's.id', '=', 'ps.skillsId')
        .select('s.name')
        .where('ps.prisonerId', id)

    return Promise.all([prisoner, pSkills]).then(results => {
        let [prisoner, pSkills] = results;
        
        let result = {...prisoner, skills: pSkills};
        return result;
    })
    
};

// function getPrisoners(id) {
//     let query = db('prisoners as p').select('p.id', 'p.name', 'p.picture', 'p.prisonId', 'p.availability')

//     if (id) {
//         query.where('p.id', id).first();

//         const promises = [query, this.getPrisonerSkills(id)];

//         return Promise.all(promises).then(function(results) {
//             let [prisoner, skills] = results;

//             if (!prisoner) {
//                 return null;
//             } else {
//                 prisoner.skills = skills;

//                 return skillsToBody(skill)
//             }
//         })
//     }
// };



function getAll() {
    return db('prisoners')
};

function insert(prisoner) {
    return db('prisoners')
        .insert(prisoner)
};

function update(id, changes) {
    return db('prisoners')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? getById(id) : null));
};

function remove(id) {
    return db('prisoners')
        .where('id', id)
        .del();
};

function getPrisonerSkills (prisonerId) {
    return db('prisoners_skills as ps')
        .join('skills as s', 's.id', '=', 'ps.skillsId')
        .select('s.name')
        .where('ps.prisonerId', prisonerId)
        .then(skills => skills.map(skill => skillsToBody(skill)));
};

// function skillsToBody(skill) {
//     return {
//         ...skill
//     };
// };