const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    insert,
    getByPrisonId,
    update,
    remove,
};

function getByPrisonId(id) {
    let prisonInfo = db('prisons')
        .where('prisons.id', id)
        .first();

    let prisonersList = db('prisoners as p')
        .where('p.prisonId', id)

    return Promise.all([prisonInfo, prisonersList]).then(results => {
        let [prisonInfo, prisonersList] = results;

        let result = {...prisonInfo, prisoners: prisonersList};
        return result;
    });
};

function getAll() {
    return db.raw(`SELECT p.*, (SELECT count(*) FROM prisoners as pr WHERE pr.prisonId = p.id) as totalPrisoners FROM prisons as p`);
};

function insert(prison) {
    return db('prisons')
        .insert(prison)
};

function update(id, changes) {
    return db('prisons')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getByPrisonId(id) : null));
};

function remove(id) {
    return db('prisons')
        .where('id', id)
        .del();
};