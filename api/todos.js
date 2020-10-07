const express = require('express');
const todosRouter = express.Router();
const queries = require('../db/queries');




// Get All todos , ('/') this is the root that grabs all data from the todos database
todosRouter.get('/', async(req, res) => {
    try {
        queries.getAllTodos().then(todos => {
            res.json(todos);
        })
    } catch (error) {
        console.error(error.message)
    }
});

// Get One todo

todosRouter.get('/:id', queries.isValidId, async(req, res, next) => {
    try {
        queries.getOneTodo(req.params.id).then(todos => {
            if(todos){
                res.json(todos);
            } else {
                res.status(404);
                next();
            }
            
        })
    } catch (error) {
        console.error(error.message)
    }
});

// Create a todo
// Sends a post request to /api/v1/todos
todosRouter.post('/', async(req, res, next) => {
    try {
        if(queries.validTodo(req.body)){
            // insert into databse
            queries.createTodo(req.body).then(todo => {
                res.json(todo[0]);
            });
        } else {
            next(new Error('Invalid todo was created'));
        }
        
    } catch (error) {
        console.log(error.message);
    }
})

// Create a route to edit/ update todo
todosRouter.put('/:id', queries.isValidId, async(req,res, next) => {
    if(queries.validTodo(req.body)) {
        queries.updateTodo(req.params.id, req.body).then(todo => {
            res.json(todo[0]);
        })
    }else {
        next(new Error('Invalid todo'));
    }
})

// Create a delete route to DELETE a todo;
todosRouter.delete('/:id', queries.isValidId, (req, res, next) => {
    queries.deleteTodo(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    })
})


// Make sure to export or you will receive an error stating that the route is not defined
module.exports = todosRouter;