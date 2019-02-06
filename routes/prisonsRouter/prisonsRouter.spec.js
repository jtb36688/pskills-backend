const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');

// server.use(express.json())

// afterEach(async () => {
//     await db('prisons').truncate();
// });

// afterEach(async () => {
//     await db('users').truncate();
// });

describe('prisonsRouter.js', () => {
    describe('GET to / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisons');
            
            expect(response.status).toBe(200);

            const expected = [{ id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111", totalPrisoners: 0 }];
            
            expect(response.text).toEqual(expected);
        });

        // it('should respond with 1 prison object', async () => {
        //     // const regInfo = { username: "daren", password: "pass", prisonId: 1};
        //     // const responseReg = await request(server).post('/api/users/register').send(regInfo);
        //     // console.log(responseReg);

        //     // const prisonObj = { id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111" };
        //     const expected = { id: 1, name: "Alcatraz Island", location: "San Francisco", phoneNumber: "111-111-1111", totalPrisoners: 0 };
        //     // const loginInfo = { username: "daren", password: "pass"};


        //     // const responseLogin = await request(server).post('/api/users/login').send(loginInfo);
        //     // console.log(responseLogin.body.token);

        //     // const responsePost = await request(server).post('/api/prisons').send(prisonObj).set('Authentication', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhcmVuIiwiaWF0IjoxNTQ5NDY5MzY2LCJleHAiOjE1NDk0NzI5NjZ9.sWfNvMwhUwmzDfXSu9vEzrKNlrTdi5emqwCbd6kUlj8");
        //     // console.log(responsePost);

        //     const responseGet = await request(server).get('/api/prisons')

        //     expect(responseGet).toEqual(expected);
        // });
    });
});