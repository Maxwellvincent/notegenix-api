const { NODE_ENV } = require('../src/config');
const config = require('../knexfile');
const environmentConfig = config[NODE_ENV];
const knex = require('knex');
const connection = knex(environmentConfig);


module.exports = connection;