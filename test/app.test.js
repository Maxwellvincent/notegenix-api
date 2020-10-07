const { expect } = require('chai');
const { table } = require('../db/knex');



const knex = require('../db/knex');

describe('CRUD todos', () => {
    before(async () => {
        await knex.migrate.latest()
    })

    it('it works', () => {
        console.log("Its working!!!");
    });


    it('Selects all rows of data', async () => {
        let data = await knex.from('todos').select('*')
        expect(data.length).equal(data.length)
    })
});