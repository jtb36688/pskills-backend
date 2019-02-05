const db = require('../../data/dbConfig.js');

module.exports = {
    getAllPrisoners,
    insert,
    getByPrisonerId,
    update,
    remove,
};

function getByPrisonerId(id) {

    return db('prisoners')
        .where('prisoners.id', id)
        .first();
    // let prisoner =  db('prisoners')
    //     .where('prisoners.id', id)
    //     .first();

    // let pSkills = db('prisoners_skills as ps')
    //     .join('skills as s', 's.id', '=', 'ps.skillsId')
    //     .select('s.name')
    //     .where('ps.prisonerId', id)
    //     .then(skills => skills.map(skill => {
    //             return skill['name'];
    //         })
    //     );

    // return Promise.all([prisoner, pSkills]).then(results => {
        
    //     let [prisoner, pSkills] = results;
        
    //     let result = {...prisoner, skills: pSkills};
    //     return result;
    // });
};

function getAllPrisoners() {
    return db('prisoners')


    // return db('prisoners as p')
    //     .then(prisonerList => {
    //         prisonerList.map(prisoner => {
    //             getByPrisonerId(prisoner.id)
    //                 .then(newPrisoner => {
    //                     prisonerArray.push(newPrisoner);
    //                     console.log(prisonerArray);
    //                 })
    //             })
    //         })
    // let prisonerArray = [];

    // let prisoners = db('prisoners as p')
    //     .then(prisonerList => {
    //         prisonerList.map(prisoner => {
    //             getByPrisonerId(prisoner.id)
    //                 .then(newPrisoner => {
    //                     prisonerArray.push(newPrisoner);
    //                     // console.log(prisonerArray);
    //                 })
    //             })
    //             console.log(prisonerArray);
    //         return prisonerArray;
    //     })
        
    // return Promise.all([prisoners]).then(results => {
    //     // console.log('hello');
    //     console.log(results);
    //     let [prisoners] = results;
        
    //     let result = {...prisoners};
    //     return result;
    // });
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