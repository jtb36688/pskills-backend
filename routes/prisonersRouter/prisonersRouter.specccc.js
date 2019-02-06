it('should respond with 1 prison object', async () => {
    const prisonObj = { name: "Bill Gates", picture: null, prisonId: 1, availability: null, skills: "sewing, technology, carpentry, forklift driver" };

    await request(server).post('/api/prisons').send(prisonObj);

    const responseGet = await request(server).get('/api/prisons');

    const expected = { id: 1, name: "Bill Gates", picture: null, prisonId: 1, availability: null, skills: "sewing, technology, carpentry, forklift driver" };

    expect(responseGet).toContain(expected);
});