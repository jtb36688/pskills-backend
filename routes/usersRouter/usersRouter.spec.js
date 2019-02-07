const request = require('supertest');
const server = require('../../api/server.js');
const db = require('../../data/dbConfig');

afterAll(async () => {
    await db('users').truncate();
});

describe('usersRouter.js', () => {
    describe('POST to /api/users/register', () => {
        it('should register a user', async () => {
            const userInfo = {username: 'testUser', password: 'pass'};

            const response = await request(server).post('/api/users/register').send(userInfo);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveLength(1); 
        });
    });

    describe('Post to /api/users/login', () => {
        it('should login the user and return a JWT', async () => {
            const userInfo = {username: 'testUser', password: 'pass'};

            const response = await request(server).post('/api/users/login').send(userInfo);

            expect(response.status).toBe(200);
            expect(response.body.id).toEqual(1);
            

        });
    });
});