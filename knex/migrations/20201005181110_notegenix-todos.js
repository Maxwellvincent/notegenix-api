
exports.up = function(knex) {
  return knex.schema.createTable('todos', (table) => {
      table.increments();
      table.text('description');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
