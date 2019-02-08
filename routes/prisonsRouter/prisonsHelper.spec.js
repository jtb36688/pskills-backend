const db = require('../../data/dbConfig');
const prisonsHelper = require('./prisonsHelper.js');

afterEach(async () => {
    await db('prisons').truncate();
});

afterEach(async () => {
    await db('prisoners').truncate();
});

describe('prisonsHelper', () => {
    it('should insert the provided prison', async () => {
        const newPrison = { id: 1, name: "Test Prison", location: 55555, phoneNumber: "111-111-1111"};

        await prisonsHelper.insert(newPrison);

        const prisons = await db('prisons');
        
        expect(prisons).toHaveLength(1);
    });

    it('should return 2 prisons', async () => {
        const newPrison1 = { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111"};
        const newPrison2 = { id: 2, name: "Test Prison2", location: 55555, phoneNumber: "111-111-1111"};

        await prisonsHelper.insert(newPrison1);
        await prisonsHelper.insert(newPrison2);

        const prisons = await db('prisons');

        const expected = [
            { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111"},
            { id: 2, name: "Test Prison2", location: 55555, phoneNumber: "111-111-1111"}
        ];

        expect(prisons).toHaveLength(2);
        expect(prisons).toEqual(expected);
    });

    it('should return all of the prisons', async () => {
        const newPrison1 = { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111"};
        const newPrison2 = { id: 2, name: "Test Prison2", location: 55555, phoneNumber: "111-111-1111"};

        await prisonsHelper.insert(newPrison1);
        await prisonsHelper.insert(newPrison2);

        const prisons = await prisonsHelper.getAll();

        const expected = [
            { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111", totalPrisoners: 0},
            { id: 2, name: "Test Prison2", location: 55555, phoneNumber: "111-111-1111", totalPrisoners: 0}
        ];

        expect(prisons).toHaveLength(2);
        expect(prisons).toEqual(expected);
    });

    it('should update the prison', async () => {
        const newPrison1 = { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111"};

        await prisonsHelper.insert(newPrison1);

        const id = 1;
        const changes = {name: "Test Prison2", location: 11111}

        const prison = await prisonsHelper.update(id, changes);

        const expected = { id: 1, name: "Test Prison2", location: 11111, phoneNumber: "111-111-1111", prisoners: []};

        expect(prison).toEqual(expected);
    });

    it('should remove the prison', async () => {
        const newPrison1 = { id: 1, name: "Test Prison1", location: 55555, phoneNumber: "111-111-1111"};

        await prisonsHelper.insert(newPrison1);

        const id = 1;
        const prison = await prisonsHelper.remove(id);

        expect(prison).toBe(1);

        const prisonsArray = await prisonsHelper.getAll();

        expect(prisonsArray).toEqual([]);
    });
});