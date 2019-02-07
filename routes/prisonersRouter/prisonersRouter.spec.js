const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');
const { generateToken } = require('../../auth/protected.js');

// Clear out prisons and users after each test
afterEach(async () => {
    await db('prisoners').truncate();
});

afterEach(async () => {
    await db('users').truncate();
});

// Generate a token to be used in POST, PUT, DELETE
let token;

beforeAll((done) => {
    token = generateToken('user')

    done();
});

describe('prisonersRouter.js', () => {
    describe('GET route to /api/prisoners', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisoners');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('should response with an array of prisoner objects', async () => {
            // Adding 2 objects to database
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
            const prisonerObj2 = { name: "Test2 Prisoner", picture: null, prisonId: 2, availability: false, skills: "test skill" };
            await request(server).post('/api/prisoners').send(prisonerObj1).set('authorization', token);
            await request(server).post('/api/prisoners').send(prisonerObj2).set('authorization', token);

            const response = await request(server).get('/api/prisoners');
            
            const expected = [{ id: 1, name: "Test1 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }, { id: 2, name: "Test2 Prisoner", picture: null, prisonId: 2, availability: 0, skills: "test skill" }];
            
            expect(response.body).toEqual(expected);
        });
    });

    describe('POST to /api/prisoners endpoint', () => {
        it('should add prisoners, respond with status 201 and an array of the prisoners with the same prisonId as the one added', async () => {
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
            const prisonerObj2 = { name: "Test2 Prisoner", picture: null, prisonId: 2, availability: false, skills: "test skill" };
            const prisonerObj3 = { name: "Test3 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

            const response1 = await request(server).post('/api/prisoners').send(prisonerObj1).set('authorization', token);
            const expected1 = [{id: 1, name: "Test1 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }];
            expect(response1.status).toBe(201);
            expect(response1.body).toEqual(expected1);

            const response2 = await request(server).post('/api/prisoners').send(prisonerObj2).set('authorization', token);
            const expected2 = [{ id: 2, name: "Test2 Prisoner", picture: null, prisonId: 2, availability: 0, skills: "test skill" }];
            expect(response2.status).toBe(201);
            expect(response2.body).toEqual(expected2);

            const response3 = await request(server).post('/api/prisoners').send(prisonerObj3).set('authorization', token);
            const expected3 = [{id: 1, name: "Test1 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }, { id: 3, name: "Test3 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }];
            expect(response3.status).toBe(201);
            expect(response3.body).toEqual(expected3);
        });

        it('should not add a prison without a token being send in the header, respond with status 401', async () => {
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

            const response = await request(server).post('/api/prisoners').send(prisonerObj1);
            expect(response.status).toBe(401);

            const expected = { error: 'no token provided'};
            expect(response.body).toEqual(expected);
        });
        it('should not add a prisoner with an INVALID token being send in the header, respond with status 401', async () => {
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

            const response = await request(server).post('/api/prisoners').send(prisonerObj1).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcmVuIiwiaWF0IjoxNTQ5NDkzMjQzLCJleHAiOjE1NDk0OTY4NDN9.HFdDT_yE1ZP5lWxUAbtqsiE3_h88ie8iScCzesG0eH8');
            expect(response.status).toBe(401);

            const expected = { error: 'Invalid token'};
            expect(response.body).toEqual(expected);
        });
    });

    describe('PUT to /api/prisoners/:id endpoint', () => {
        it('should edit the prisoner, and respond with status 202 and an array of the prisoners with the same prisonId as the one edited', async () => {
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
            const prisonerObj2 = { name: "Test2 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
            const prisonerObj3 = { name: "Test3 Prisoner", picture: null, prisonId: 2, availability: true, skills: "test skill" };
            await request(server).post('/api/prisoners').send(prisonerObj1).set('authorization', token);
            await request(server).post('/api/prisoners').send(prisonerObj2).set('authorization', token);
            await request(server).post('/api/prisoners').send(prisonerObj3).set('authorization', token);

            const changes = { name: "Edited Prisoner Name" };
            const response = await request(server).put('/api/prisoners/1').send(changes).set('authorization', token);

            const expected = [{id: 1, name: "Edited Prisoner Name", picture: null, prisonId: 1, availability: 1, skills: "test skill" }, {id: 2, name: "Test2 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }];
            expect(response.status).toBe(202);
            expect(response.body).toEqual(expected);
        });

        it('should not allow editing without a valid token', async () => {
            const changes = { name: "Edited Prisoner Name" };
            const response = await request(server).put('/api/prisoners/1').send(changes);

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'no token provided'});
        });
    });

    describe('DELETE to /api/prisoners/:id endpoint', () => {
        it('should delete the prisoner only if token is provided', async () => {
            const prisonerObj1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
            await request(server).post('/api/prisoners').send(prisonerObj1).set('authorization', token);

            const responseNoToken = await request(server).delete('/api/prisoners/1');
            expect(responseNoToken.status).toBe(401);

            const responseWithToken = await request(server).delete('/api/prisoners/1').set('authorization', token);
            expect(responseWithToken.status).toBe(200);
        });
    });
});