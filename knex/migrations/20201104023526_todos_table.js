
exports.up = function(knex) {
    return knex.schema.createTable('todos', (table) => {
        table.increments("task_id");
        table.text('description');
        table.integer('user_id').unsigned().notNullable();
        
        table.foreign('user_id').references('user_id').inTable('users');
        
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('todos');
  };
