
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {  
          user_name: 'jdox', 
          email: "john@mail.com", 
          user_password: "123" },
        {  
          user_name: 'pham',
          email: "phil@email.com",
          user_password: "123"
        },
        {  
          user_name: 'clam',
          email: "kate@email.com",
          user_password: "123"
        }
      ]);
    });
};
