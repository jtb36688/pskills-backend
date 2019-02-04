exports.up = function(knex, Promise) {
    return knex.schema.createTable('prisoners', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable().unique() ;
      tbl.string('picture', 255);
      tbl.integer('prisonId').unsigned().references('id').inTable('prisons').notNullable();
      tbl.string('skills', 255).unsigned().references('id').inTable('prisoner_skills');
      tbl.string('availability', 255);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('prisoners');
  };