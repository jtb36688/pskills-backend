exports.up = function(knex, Promise) {
    return knex.schema.alterTable('prisoners', tbl => {
        tbl.string('skills', 255);
    });
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropColumn('skills');
  };
