import { server } from '../server';
import supertest from 'supertest';
import { ErrorMessages } from '../constants/constants';
const request = supertest(server);

describe('CRUD scenario', () => {
	afterAll(async () => {
		await server.close();
	});
	let createdUserId = '';
	const dataForCreateTestUser = {
		username: 'Kirill',
		age: 28,
		hobbies: ['football', 'coding'],
	};
	const dataForUpdateTestUser = {
		username: 'Maxim',
		age: 30,
		hobbies: ['sleep', 'eat'],
	};
	it('receive all users', async () => {
		const res = await request.get('/api/users');
		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual([]);
	});
	it('create new user', async () => {
		const res = await request.post('/api/users').send(dataForCreateTestUser);
		const newUser = res.body;
		createdUserId = newUser.id;
		expect(res.status).toBe(201);
		expect(newUser.age).toStrictEqual(28);
	});
	it('get user by id', async () => {
		const res = await request.get(`/api/users/${createdUserId}`);
		const user = res.body;
		expect(res.status).toBe(200);
		expect({
			...dataForCreateTestUser,
			id: createdUserId,
		}).toStrictEqual(user);
	});
	it('update user', async () => {
		const res = await request.put(`/api/users/${createdUserId}`).send(dataForUpdateTestUser);
		const updatedUser = res.body;
		expect(res.status).toBe(200);
		expect({
			...dataForUpdateTestUser,
			id: createdUserId,
		}).toStrictEqual(updatedUser);
	});
	it('delete user', async () => {
		const res = await request.delete(`/api/users/${createdUserId}`);
		expect(res.status).toBe(204);
	});
	it('get deleted user', async () => {
		const res = await request.get(`/api/users/${createdUserId}`);
		expect(res.status).toBe(404);
		expect(res.body).toBe(ErrorMessages.userNotFound);
	});
});
