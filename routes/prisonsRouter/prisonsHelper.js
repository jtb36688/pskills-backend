const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    insert,
    getByPrisonId,
    update,
    remove,
};

function getByPrisonId(id) {
    return db('prisons')
        .where('prisons.id', id)
        .first();
};

function getAll() {
    return db('prisons')
};

function insert(prison) {
    return db('prisons')
        .insert(prison)
};

function update(id, changes) {
    return db('prisons')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? getById(id) : null));
};

function remove(id) {
    return db('prisons')
        .where('id', id)
        .del();
};