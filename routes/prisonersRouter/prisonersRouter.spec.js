const request = require('supertest');
const server = require('../../api/server.js');


describe('prisonersRouter.js', () => {
    describe('GET route to /api/prisoners', () => {
        it('should respond with status code 200 OK', async () => {
            const response = await request(server).get('/api/prisoners');

            expect(response.status).toBe(200);
        });

        it('should respond with a prisoner', async () => {
            const response = await request(server).get('/api/prisoners');

            const expected = [
                {
                    id: 1,
                    name: 'OJ',
                    picture: null,
                    prisonId: 1,
                    availability: null,
                    skills: 'sewing'
                }
            ];

            expect(response.body).toEqual(expected);
        });
    })

});


// it('should respond with 1 prison object', async () => {
//     const prisonObj = { name: "Bill Gates", picture: null, prisonId: 1, availability: null, skills: "sewing, technology, carpentry, forklift driver" };

//     await request(server).post('/api/prisons').send(prisonObj);

//     const responseGet = await request(server).get('/api/prisons');

//     const expected = { id: 1, name: "Bill Gates", picture: null, prisonId: 1, availability: null, skills: "sewing, technology, carpentry, forklift driver" };

//     expect(responseGet).toContain(expected);
// });