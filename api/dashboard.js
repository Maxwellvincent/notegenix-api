const dashRouter = require("express").Router();
const queries = require('../db/queries');
const knex = require('../db/knex'); //connection to database
const authorization = require('../Middleware/authorization'); //make sure user is authorized

dashRouter.get("/", authorization, async(req,res, next) => {
    try {
        //This return the user_id of the person that logged in and is verified
        const user_id = req.user;
        // console.log(user_id);
        // const user = await knex('users').where("user_id", user_id).first();
        // console.log(user);
        //Get the entire user object back in response, but just want the name, and also id to get todos as well later
        // res.json(user.user_name);

        const user = await knex.select("users.user_id", "users.user_name", "todos.task_id", "todos.description").from('users').leftJoin('todos', "users.user_id", "todos.user_id").where("users.user_id",user_id);
        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
    next();
});

// Create a todo

dashRouter.post("/todos", authorization, async (req,res) => {
    try {
        const {description} = req.body;
        // console.log(req.user);
        const newTodo = await knex('todos').insert({description, "user_id":req.user});

        res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo

dashRouter.patch("/todos/:id", authorization, async (req,res) => {
    try {
        const {id} = req.params;
        // console.log(id);
        
        const {description} = req.body;
        // console.log(description);

       const updateTodo = await knex("todos").where("task_id",id).update({"description": description});

       if(updateTodo === 0){
            return res.json("This todo is not yours");
       }

       res.json("Todo was updated");

    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo
dashRouter.delete("/todos/:id", authorization, async (req,res) => {
    try {
        const {id} = req.params;
        
        const deleteTodo = await knex('todos').where("task_id", id).del();

        if(deleteTodo === 0) {
            return res.json("This todo is not yours");
        }

        res.json("Todo was deleted");
        
        console.log(deleteTodo);
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = dashRouter;