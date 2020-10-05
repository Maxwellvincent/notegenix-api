
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      const todos = [
        {
        description: "this is note 1"
      },{
        description: "this is note 2"
      }, {
        description: "this is note 3"
      }];
    
      return knex('todos').insert(todos);  
  });
  
};
