const request = require('supertest');

const db = require('../../data/dbConfig');
const prisonersHelper = require('./prisonersHelper.js');

afterEach(async () => {
    await db('prisoners').truncate();
});

describe('prisonersHelper', () => {
    it('should insert the provided prisoner', async () => {
        const newPrisoner = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

        await prisonersHelper.insert(newPrisoner);

        const prisoners = await db('prisoners');
        
        const expected = [{ id: 1, name: "Test1 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" }];
        
        expect(prisoners).toHaveLength(1);
        expect(prisoners).toEqual(expected);
    });

    it('should return 2 prisoners', async () => {
        const newPrisoner1 = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };
        const newPrisoner2 = { name: "Test2 Prisoner", picture: null, prisonId: 2, availability: true, skills: "test skill" };

        await prisonersHelper.insert(newPrisoner1);
        await prisonersHelper.insert(newPrisoner2);

        const prisoners = await db('prisoners');

        const expected = [
            { id: 1, name: "Test1 Prisoner", picture: null, prisonId: 1, availability: 1, skills: "test skill" },
            { id: 2, name: "Test2 Prisoner", picture: null, prisonId: 2, availability: 1, skills: "test skill" }
        ];

        expect(prisoners).toHaveLength(2);
        expect(prisoners).toEqual(expected);
    });

    it('should update the prisoner', async () => {
        const newPrisoner = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

        await prisonersHelper.insert(newPrisoner);

        const id = 1;
        const prisonId = 1;
        const changes = { name: "Edited Prisoner Name", availability: false, skills: "edited skillzzz" };

        const prisoner = await prisonersHelper.update(id, changes, prisonId);

        const expected = [{ id: 1,name: "Edited Prisoner Name", picture: null, prisonId: 1, availability: 0, skills: "edited skillzzz" }];

        expect(prisoner).toEqual(expected);
    });

    it('should remove the prisoner', async () => {
        const newPrisoner = { name: "Test1 Prisoner", picture: null, prisonId: 1, availability: true, skills: "test skill" };

        await prisonersHelper.insert(newPrisoner);

        const id = 1;
        const prisonId = newPrisoner.prisonId;
        const prisoner = await prisonersHelper.remove(id, prisonId);

        expect(prisoner).toHaveLength(0);
    });
});