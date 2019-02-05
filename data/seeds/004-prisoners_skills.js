
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisoners_skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('prisoners_skills').insert([
        {prisonerId: 1, skillsId: 1},
        {prisonerId: 1, skillsId: 2},
        {prisonerId: 1, skillsId: 3},
        {prisonerId: 1, skillsId: 4},
        {prisonerId: 2, skillsId: 1},
        {prisonerId: 3, skillsId: 1},
        {prisonerId: 4, skillsId: 1}
      ]);
    });
};
