require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')


const app = express()
const todosRouter = require('../api/todos');
const routesAuth = require('../api/jwtAuth');

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

    //middleware

app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use(express.json()); //allows for access to req.body
app.use(morgan(morganOption));
app.use(helmet());


//ROUTES//

app.use('/api/v1/todos', todosRouter);


//register and login in routes
app.use('/auth', routesAuth);



app.use(function errorHandler(error, req, res, next) {
    let response;
    if(NODE_ENV === 'production'){
    response = {error: {message: "server error"}}
    } else {
    console.error(error)
    response = {message: error.message,error}
    }
    res.status(500).json(response)
});



app.get('/', (req, res) => {
    res.send("Hello, world!");
})

module.exports = app