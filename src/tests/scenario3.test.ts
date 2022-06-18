import { server } from '../server';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from '../constants/constants';
const request = supertest(server);

describe("Get by id errors", () => {
	const dataForCreateTestUser = {
		username: 'Kirill',
		age: 28,
		hobbies: ['football', 'coding'],
	};
	let createdUserId = '';
	it('will return empty array', async () => {
		const res = await request.get('/api/users');
		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual([]);
	});
	it('will create new user', async () => {
		const res = await request.post('/api/users').send(dataForCreateTestUser);
		const newUser = res.body;
		createdUserId = newUser.id;
		expect(res.status).toBe(201);
		expect(newUser.age).toStrictEqual(28);
	});
	it('will return user', async () => {
		const res = await request.get(`/api/users/${createdUserId}`);
		const user = res.body;
		expect(res.status).toBe(200);
		expect({
			...dataForCreateTestUser,
			id: createdUserId,
		}).toStrictEqual(user);
	});
	it('wil return not found error', async () => {
		const newUuid = uuidv4();
		const res = await request.get(`/api/users/${newUuid}`);
		expect(res.status).toBe(404);
		expect(newUuid).not.toBe(createdUserId)
		expect(res.body).toBe(ErrorMessages.userNotFound);
	});
	it('wil return not valid uuid error', async () => {
		const res = await request.get(`/api/users/notValidUuid`);
		expect(res.status).toBe(400);
		expect(res.body).toBe(ErrorMessages.notValidUUID);
	});
})