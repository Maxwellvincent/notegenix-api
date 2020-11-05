const routesAuth = require('express').Router();
const queries = require('../db/queries');
const knex = require('../db/knex'); //methods to search database
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require("../Middleware/validinfo");
const authorization = require("../Middleware/authorization");



//registering to add data, someone new
routesAuth.post('/register', validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const {user_name, email, user_password} = req.body;
        //2. check if user exist, (if user exist then throw error)
         queries.getUser(email).then(async user => {
            let token;
            if(user){
                res.status(401).send("email already exist");
            } else {
                 //3. bcrypt the user password
                    const saltRound = 10;
                    const salt = await bcrypt.genSalt(saltRound);
                    const bcryptPassword = await bcrypt.hash(user_password, salt);
                    //4. enter the new user inside our databse
                    
                        //had to create a function getToken() to store token value from promise?
                    
                    const newUser = queries.createNewUser(user_name, email, bcryptPassword).then(user => {
                        res.json(user[0]);
                    });

                        //5. generating our jwt token
                    token = jwtGenerator(newUser.user_id);
                } 
                // console.log({token});
                res.json({token});
        });
         
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


//login route

routesAuth.post('/login', validInfo, async (req,res) => {
    try {
        //1. destructure the req.body
        const {email, user_password} = req.body;
        //2. check if the user doesnt exist (if not throw error)
        const user = await knex('users').where('email', email).first();
        console.log(user);
        if(!user) {
            return res.status(401).json("Password or Email is incorrect");
        }
        //3. if does exist, chec the password that was entered is the same as the database password
        const validPassword = await bcrypt.compare(user_password, user.user_password);
        // console.log(validPassword);
        if(!validPassword){
            return res.status(401).json("Password or Email is not valid");
        }
        //4. give the jwt token
        const token = jwtGenerator(user.user_id);

        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

routesAuth.get("/is-verify", authorization, async (req,res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});

module.exports = routesAuth;