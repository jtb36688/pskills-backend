const db = require('../../data/dbConfig.js');

module.exports = {
    getAllPrisoners,
    insert,
    getByPrisonerId,
    update,
    remove,
    getPrisonersByPrisonId
};

function getByPrisonerId(id) {
    return db('prisoners')
        .where('prisoners.id', id)
        .first();
};

function getAllPrisoners() {
    return db('prisoners')
};

function getPrisonersByPrisonId(prisonId) {
    return db('prisoners').where('prisoners.prisonId', prisonId)
};

function insert(prisoner) {
    return db('prisoners')
        .insert(prisoner)
        .then(id => (id ? getPrisonersByPrisonId(prisoner.prisonId): null));
};

function update(id, changes, prisonId) {
    return db('prisoners')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getPrisonersByPrisonId(prisonId) : null));
};

function remove(id, prisonId) {
    return db('prisoners')
        .where('id', id)
        .del()
        .then(count => (count > 0 ? getPrisonersByPrisonId(prisonId) : null));
};