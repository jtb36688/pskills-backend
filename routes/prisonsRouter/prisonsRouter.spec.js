const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');


// afterEach(async () => {
//     await db('prisons').truncate();
// });

afterEach(async () => {
    await db('users').truncate();
});

describe('prisonsRouter.js', () => {
    describe('GET to /api/prisons endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisons');
            
            expect(response.status).toBe(200);

            // const expected = [{ id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111", totalPrisoners: 1 }];
            
            // expect(response.body).toEqual(expected);
        });

        // it('should respond with 1 prison object', async () => {
        //     const regInfo = { username: "daren", password: "pass", prisonId: 1};
        //     const responseReg = await request(server).post('/api/users/register').send(regInfo);

        //     const loginInfo = { username: "daren", password: "pass"};
        //     const responseLogin = await request(server).post('/api/users/login').send(loginInfo);
            
        //     const prisonObj = { id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111" };
        //     const responsePost = await request(server).post('/api/prisons').send(prisonObj).set('Authentication', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcmVuIiwiaWF0IjoxNTQ5NDY5MzY2LCJleHAiOjE1NDk0NzI5NjZ9.sWfNvMwhUwmzDfXSu9vEzrKNlrTdi5emqwCbd6kUlj8");
            
        //     const expected = { id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111", totalPrisoners: 0 };


        //     const responseGet = await request(server).get('/api/prisons')

        //     expect(responseGet.body).toEqual(expected);
        // });
    });

    describe('POST to /api/prisons endpoing', () => {
        it('should add a prison, respond with status 201 and the new id of the prison', async () => {
            // Registering a user
            const regInfo = { username: "daren", password: "pass", prisonId: 1};
            const responseReg = await request(server).post('/api/users/register').send(regInfo);

            // Logging the user in so he is authorized to add a prison
            const loginInfo = { username: "daren", password: "pass"};
            const responseLogin = await request(server).post('/api/users/login').send(loginInfo);
            expect(responseLogin.status).toBe(200);

            const token = responseLogin.body.token;
            const expectedLogin = { message: 'Welcome daren', token: token };
            expect(responseLogin.body).toEqual(expectedLogin);

            // Adding a prison
            const prisonObj = { id: 1, name: "Test Prison", location: "Test Location", phoneNumber: "111-111-1111" };
            const responsePost = await request(server).post('/api/prisons').send(prisonObj).set("Authorization", token);
            expect(responsePost.status).toBe(201);

        });
    });
});