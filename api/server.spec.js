const request = require('supertest');
const prisonsRouter = require('../routes/prisonsRouter/prisonsRouter.js');
const prisonersRouter = require('../routes/prisonersRouter/prisonersRouter.js');
const server = require('./server');


describe('prisonsRouter.js', () => {
    describe('GET to / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server.use('/api/prisons', prisonsRouter)).get('/api/prisons/');

            expect(response.status).toBe(200);
        });
    });
});

describe('prisonersRouter.js', () => {
    describe('GET to / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/api/prisoners');
            // let response = await request(server.use('/api/prisoners', prisonersRouter)).get('/');


            expect(response.status).toBe(200);
        });
    });
});