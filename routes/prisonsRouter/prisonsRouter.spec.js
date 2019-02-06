const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');


// afterEach(async () => {
//     await db('prisons').truncate();
// });

// afterEach(async () => {
//     await db('users').truncate();
// });

let token;

beforeAll((done) => {
    request(server)
        .post('/api/users/register')
        .send({
            username: "user",
            password: "pw",
            prisonId: 1
        })
        .end((err, response) => {
            done();
    });

    request(server)
        .post('/api/users/login')
        .send({
            username: "user",
            password: "pw"
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});

describe('prisonsRouter.js', () => {
    describe('GET to /api/prisons endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisons');
            
            expect(response.status).toBe(200);
        });
    });

    // describe('POST to /api/prisons endpoing', () => {
    //     it('should add a prison, respond with status 201 and the new id of the prison', async () => {
    //         // Registering a user
    //         const regInfo = { username: "daren", password: "pass", prisonId: 1};
    //         await request(server).post('/api/users/register').send(regInfo);

    //         // Logging the user in so the user is authorized to add a prison
    //         const loginInfo = { username: "daren", password: "pass"};
    //         const responseLogin = await request(server).post('/api/users/login').send(loginInfo);
    //         expect(responseLogin.status).toBe(200);

    //         const token = responseLogin.body.token;
    //         const expectedLogin = { message: 'Welcome daren', prisonId: 1, token: token };
    //         expect(responseLogin.body).toEqual(expectedLogin);

            
    //         // ******** Need to figure this out still **********
    //         // Adding a prison
    //         const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };

    //         const responsePost = await request(server).post('/api/prisons').send(prisonObj).set("Authorization", token);
            
    //         expect(responsePost.status).toBe(201);

    //     });
    // });

    describe('POST to /api/prisons endpoint', () => {
        it('should add a prison, respond with status 201 and the new id of the prison', async () => {
            const prisonObj = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111" };

            const responsePost = await request(server).post('/api/prisons').send(prisonObj).set("Authorization", token);
            
            expect(responsePost.status).toBe(201);
        })
    })

});