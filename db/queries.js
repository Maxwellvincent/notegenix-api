// This file contains all the queries functions for the database
const knex = require('./knex'); //the connection file, for the connection

module.exports = {
    getAllTodos() {
        return knex('todos');
    },
    isValidId(req, res, next){
        if(!isNaN(req.params.id)) return next();
        next(new Error('Invalid ID'));
    },
    getOneTodo(id) {
        return knex('todos').where('id', id).first();
    },
    createTodo(todo){
        return knex('todos').insert(todo, '*');
    },
    validTodo(todo) {
        const hasDescription = typeof todo.description == "string" && todo.description.trim() != '';
        return hasDescription;
    },
    updateTodo(id, todo) {
        return knex('todos').where('id', id).update(todo);
    },
    deleteTodo(id) {
        return knex('todos').where('id', id).delete();
    },
    getUser(email) {
        return knex('users').where('email', email).first()
    },
    createNewUser(user_name, email, bPassword){
        return knex('users').insert([{user_name, email, user_password: bPassword}],"*");
    }

}