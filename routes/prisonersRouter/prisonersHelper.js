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
    return db('prisoners')
        .where('prisoners.id', id)
        .first();
};

function getPrisonerSkills(prisonerId) {

};

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