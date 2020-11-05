const dashRouter = require("express").Router();
const { orWhereNotExists } = require("../db/knex");
const knex = require('../db/knex'); //connection to database
const authorization = require('../Middleware/authorization'); //make sure user is authorized

dashRouter.get("/", authorization, async(req,res, next) => {
    try {
        //This return the user_id of the person that logged in and is verified
        const user_id = req.user;
        // console.log(user_id);
        const user = await knex('users').where("user_id", user_id).first();
        // console.log(user);
        //Get the entire user object back in response, but just want the name, and also id to get todos as well later
        res.json(user.user_name);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
    next();
});

module.exports = dashRouter;