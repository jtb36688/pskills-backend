const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');
const { generateToken } = require('../../auth/protected.js');

// Clear out prisons and users after each test
afterEach(async () => {
    await db('prisons').truncate();
});

afterEach(async () => {
    await db('users').truncate();
});

afterEach(async () => {
    await db('prisoners').truncate();
});

// Generate a token to be used in testing POST, PUT, DELETE
let token;

beforeAll((done) => {
    token = generateToken('user');

    done();
});

describe('prisonsRouter.js', () => {
    describe('GET to /api/prisons endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisons');
            
            expect(response.status).toBe(200);
        });

        it('should response with an array of prison objects', async () => {
            // Adding 2 objects to database
            const prisonObj1 = { id: 1, name: "Test1 Prison", location: 55555, phoneNumber: "111-111-1111" };
            const prisonObj2 = { id: 2, name: "Test2 Prison", location: 55555, phoneNumber: "111-111-1111" };
            await request(server).post('/api/prisons').send(prisonObj1).set('authorization', token);
            await request(server).post('/api/prisons').send(prisonObj2).set('authorization', token);

            const response = await request(server).get('/api/prisons');
            const expected = [{ id: 1, name: "Test1 Prison", location: 55555, phoneNumber: "111-111-1111", totalPrisoners: 0 }, { id: 2, name: "Test2 Prison", location: 55555, phoneNumber: "111-111-1111", totalPrisoners: 0 }];
            expect(response.body).toEqual(expected);
        });
    });

    describe('POST to /api/prisons endpoint', () => {
        it('should add a prison, respond with status 201 and the new id of the prison', async () => {
            // Create a prison object, send it via a POST with the token in header, response should be status 201 and the id of the prison in an array.
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };
            const responsePost = await request(server).post('/api/prisons').send(prisonObj).set('authorization', token);
            expect(responsePost.status).toBe(201);
            const expectedPost = [1];
            expect(responsePost.body).toEqual(expectedPost);

            // After creating the prison, a GET request should return 1 prison object in an array
            const responseGet = await request(server).get('/api/prisons');
            const expectedGet = [{ id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111", totalPrisoners: 0 }];
            expect(responseGet.body).toEqual(expectedGet);
        })

        it('should not add a prison without a token being send in the header, respond with status 401', async () => {
            // Create a prison object, send it via a POST WITHOUT the token in header, response should be status 201 and the id of the prison in an array.
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };
            const responsePost = await request(server).post('/api/prisons').send(prisonObj);
            expect(responsePost.status).toBe(401);
            const expectedPost = { error: 'no token provided'};
            expect(responsePost.body).toEqual(expectedPost);
        });
        it('should not add a prison with an INVALID token being send in the header, respond with status 401', async () => {
            // Create a prison object, send it via a POST WITHOUT the token in header, response should be status 201 and the id of the prison in an array.
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };
            const responsePost = await request(server).post('/api/prisons').send(prisonObj).set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcmVuIiwiaWF0IjoxNTQ5NDkzMjQzLCJleHAiOjE1NDk0OTY4NDN9.HFdDT_yE1ZP5lWxUAbtqsiE3_h88ie8iScCzesG0eH8');
            expect(responsePost.status).toBe(401);
            const expectedPost = { error: 'Invalid token'};
            expect(responsePost.body).toEqual(expectedPost);
        });
    });

    describe('PUT to /api/prisons/:id endpoint', () => {
        it('should edit the prison, and return the updated prison object', async () => {
            // Create a prison object, send it via a POST with the token in header, response should be status 201 and the id of the prison in an array.
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };
            await request(server).post('/api/prisons').send(prisonObj).set('authorization', token);

            const changes = { name: "Edited Prison Name" };
            const response = await request(server).put('/api/prisons/1').send(changes).set('authorization', token);
            const expected = { id: 1, name: "Edited Prison Name", location: 55555, phoneNumber: "111-111-1111", prisoners: [] };
            expect(response.status).toBe(202);
            expect(response.body).toEqual(expected);
        });

        it('should not allow editing without a valid token', async () => {
            const changes = { name: "Edited Prison Name" };
            const response = await request(server).put('/api/prisons/1').send(changes);

            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'no token provided'});
        });
    });

    describe('DELETE to /api/prisons/:id endpoint', () => {
        it('should delete the prison if token is provided', async () => {
            // Create a prison object, send it via a POST with the token in header, response should be status 201 and the id of the prison in an array.
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };
            await request(server).post('/api/prisons').send(prisonObj).set('authorization', token);

            const responseNoToken = await request(server).delete('/api/prisons/1');
            expect(responseNoToken.status).toBe(401);

            const responseWithToken = await request(server).delete('/api/prisons/1').set('authorization', token);
            expect(responseWithToken.status).toBe(200);
        });
    });
});