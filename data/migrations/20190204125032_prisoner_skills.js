exports.up = function(knex, Promise) {
    return knex.schema.createTable('prisoners_skills', tbl => {
      tbl.increments();
      tbl.integer('prisonerId').unsigned().references('id').inTable('prisoners').notNullable();
      tbl.integer('skillsId').unsigned().references('id').inTable('skills').notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('prisoners_skills');
  };