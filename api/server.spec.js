const request = require('supertest');
const server = require('./server');


// describe('prisonsRouter.js', () => {
//     describe('GET to / endpoint', () => {
//         it('should respond with status code 200 OK', async () => {
//             let response = await request(server).get('/api/prisons/');

//             expect(response.status).toBe(200);
//         });
//     });
// });

describe('server.js', () => {
    describe('GET / endpoint', () => {
      it('should respond with status code 200 OK', async () => {
        let response = await request(server).get('/api/prisons');
  
        expect(response.status).toBe(200);
      });
    });
});