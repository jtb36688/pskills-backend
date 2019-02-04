
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisons').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('prisons').insert([
        {name: 'Chicago Prison', location: 'Chicago', phoneNumber: '777-777-7777'},
        {name: 'Mineapolis Prison', location: 'Minneapolis', phoneNumber: '777-777-7777'},
        {name: 'New York Prison', location: 'New York', phoneNumber: '777-777-7777'},
        {name: 'San Diego Prison', location: 'San Diego', phoneNumber: '777-777-7777'},
      ]);
    });
};
