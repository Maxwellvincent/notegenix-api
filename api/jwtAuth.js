const routesAuth = require('express').Router();
const queries = require('../db/queries');
const knex = require('../db/knex'); //methods to search database
const bcrypt = require('bcrypt');

//registering to add data, someone new
routesAuth.post('/register', async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const {user_name, email, user_password} = req.body;
        //2. check if user exist, (if user exist then throw error)
         queries.getUser(email).then(async user => {
            if(user){
                res.status(401).send("email already exist");
            } else {
                 //3. bcrypt the user password
                    const saltRound = 10;
                    const salt = await bcrypt.genSalt(saltRound);
                    const bcryptPassword = await bcrypt.hash(user_password, salt);
                    //4. enter the new user inside our databse
                    queries.createNewUser(user_name, email, bcryptPassword).then(user => res.json(user[0]));
                    //5. generating our jwt token
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = routesAuth;