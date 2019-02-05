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
};

function getAllPrisoners() {
    return db('prisoners')
};

function insert(prisoner) {
    return db('prisoners')
        .insert(prisoner)
};

// function update(id, changes) {
//     return db('prisoners')
//         .where('id', id)
//         .update(changes)
// };
function update(id, changes) {
    return db('prisoners')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.getByPrisonerId(id) : null));
  }

function remove(id) {
    return db('prisoners')
        .where('id', id)
        .del();
};