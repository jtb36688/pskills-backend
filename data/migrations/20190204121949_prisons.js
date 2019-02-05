exports.up = function(knex, Promise) {
    return knex.schema.createTable('prisons', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable().unique() ;
      tbl.string('location', 255).notNullable();
      tbl.string('phoneNumber', 255);
      tbl.integer('adminId').unsigned().references('id').inTable('users');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('prisons');
  };