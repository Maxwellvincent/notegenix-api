const bcrypt = require('bcrypt');

// const saltRound = 10;
// const salt = bcrypt.genSalt(saltRound);
const bcryptPassword = bcrypt.hashSync("123", 10);


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {return knex('users').del()})
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {  
          user_name: 'jdox', 
          email: "john@mail.com", 
          user_password: bcryptPassword },
        {  
          user_name: 'pham',
          email: "phil@email.com",
          user_password: bcryptPassword
        },
        {  
          user_name: 'clam',
          email: "kate@email.com",
          user_password: bcryptPassword
        }
      ]);
    });
};
