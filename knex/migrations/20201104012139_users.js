
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
      table.increments('user_id');
      table.string('user_name').notNullable();
      table.string('email').notNullable();
      table.string('user_password').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
