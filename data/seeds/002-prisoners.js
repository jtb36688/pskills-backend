
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisoners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('prisoners').insert([
        {name: 'Jon Erickson', prisonId: 1},
        {name: 'Dwight Schrute', prisonId: 1},
        {name: 'Jim Halpert', prisonId: 2},
        {name: 'Michael Scott', prisonId: 3}
      ]);
    });
};
