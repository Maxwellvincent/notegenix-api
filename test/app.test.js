const {expect} = require('chai');
const request  = require('supertest');
const app  = require('../src/app');
const fixtures = require('./fixtures');


const knex = require('../db/knex');

describe('CRUD todos', () => {
    before(async () => {
        await knex.migrate.latest()
        .then(() => {
            return knex.seed.run();
        })
    })


    it('List all Records', (done) => {
       request(app)
        .get('/api/v1/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((resp) => {
            expect(resp.body).to.be.a('array');
            console.log(resp.body)
            done();
        })
    });

    it('Shows one task by id', (done) => {
        request(app)
            .get('/api/v1/todos/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((resp) => {
                expect(resp.body).to.be.a('object');
                done();
            });
    });

    it('Create a record', (done) => {
        request(app)
            .post('/api/v1/todos')
            .send(fixtures.todo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object')
                console.log(res.body)
                fixtures.todo.id = res.body.id;
                expect(res.body).to.deep.equal(fixtures.todo);
                done();
            });
    });

    if('Can update a todo', (done) => {
        fixtures.todo.description = "You can do it!";
        request(app)
            .put('/api/v1/todos/1')
            .send(fixtures.todo)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object')
                console.log(res.body)
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal(fixtures.todo);
                done();
            });
    });
    


    it('Can Delete a todo by id', (done) => {
        request(app)
            .delete('/api/v1/todos/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).to.be.a('object')
                console.log(res.body)
                expect(res.body).to.be.a('object');
                expect(res.body).to.deep.equal({
                    delete: true
                });
                done();
            });
    });
});