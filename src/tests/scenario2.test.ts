import { server } from '../server';
import supertest from 'supertest';
const request = supertest(server);

describe('Users create and delete', () => {
	afterAll(async () => {
		await server.close();
	});
	let createdUsersIds: string[] = [];
	const numberOfCreatedUsers = 10;
	const dataForCreateTestUser = {
		username: 'Kirill',
		age: 28,
		hobbies: ['football', 'coding'],
	};
	it('will return empty array', async () => {
		const res = await request.get('/api/users');
		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual([]);
	});
	it(`will create ${numberOfCreatedUsers} new users`, async () => {
		for (let i = 0; i < numberOfCreatedUsers; i++) {
			const res = await request.post('/api/users').send(dataForCreateTestUser);
			const newUser = res.body;
			createdUsersIds.push(newUser.id);
			expect(res.status).toBe(201);
			expect(newUser.age).toStrictEqual(28);
		}
	});
	it(`will return ${numberOfCreatedUsers} new users`, async () => {
		const res = await request.get('/api/users');
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(10);
	});
	it(`will return ${numberOfCreatedUsers} users`, async () => {
		for (let i = 0; i < numberOfCreatedUsers; i++) {
			const res = await request.delete(`/api/users/${createdUsersIds[i]}`);
			expect(res.status).toBe(204);
		}
	});
	it('will return empty array', async () => {
		const res = await request.get('/api/users');
		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual([]);
	});
});
