
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisoners').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('prisoners').insert([
        {name: 'Jon Erickson', prisonId: 1, skills: 'sewing, technology, carpentry, forklift driver'},
        {name: 'Dwight Schrute', prisonId: 1, skills: 'sewing'},
        {name: 'Jim Halpert', prisonId: 2, skills: 'sewing'},
        {name: 'Michael Scott', prisonId: 3, skills: 'sewing'}
      ]);
    });
};
