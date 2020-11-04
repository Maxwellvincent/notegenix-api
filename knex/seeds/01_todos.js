
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Created an array of objects for out notes
      const todos = [
        {
        description: "this is note 1",
        user_id: 1
        
      },{
        description: "this is note 2",
        user_id: 2
      }, {
        description: "this is note 3",
        user_id: 3
      }];
    // placing the array of notes into the todos table
      return knex('todos').insert(todos);  
  });
  
};
