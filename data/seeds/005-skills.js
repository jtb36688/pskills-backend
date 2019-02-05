
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {name: 'sewing'},
        {name: 'technology'},
        {name: 'carpentry'},
        {name: 'forklift driver'},
        {name: 'welding'},
      ]);
    });
};