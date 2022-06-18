import { v4 as uuidv4 } from 'uuid';
import { User, UserRequest } from '../interfaces/user.interface';
import { ErrorMessages, UUID_PATTERN } from '../constants/constants';

let users: User[] = [];

const getUsers = async () => {
	return new Promise<User[]>((resolve, _) => resolve(users));
};

const getUserById = async (id: string) => {
	return new Promise<User>((resolve, reject) => {
		const isUuid = UUID_PATTERN.test(id);
		if (!isUuid) {
			reject(new Error(ErrorMessages.notValidUUID));
		}
		const desiredUser = users.find((user) => user.id === id);
		if (desiredUser) {
			resolve(desiredUser);
		} else {
			reject(new Error(ErrorMessages.userNotFound));
		}
	});
};

const createUser = async (data: UserRequest) => {
	return new Promise<User>((resolve, reject) => {
		const newUuid = uuidv4();
		const { username, age, hobbies } = data;
		if (!username || !age || !hobbies) {
			console.log(username, age, hobbies);
			reject(new Error('Please fill required fields'));
		}
		const newUser: User = {
			id: newUuid,
			username: username,
			age: age,
			hobbies: [...hobbies],
		};
		users.push(newUser);
		resolve(newUser);
	});
};

const updateUser = async (id: string, data: UserRequest) => {
	return new Promise<User>((resolve, reject) => {
		const isUuid = UUID_PATTERN.test(id);
		if (!isUuid) {
			reject(new Error(ErrorMessages.notValidUUID));
		}
		const desiredUser = users.find((user) => user.id === id);
		if (desiredUser) {
			const userIndex = users.indexOf(desiredUser);
			const usersCopy = [...users];
			const { username, age, hobbies } = data;
			usersCopy[userIndex] = {
				id: id,
				username: username,
				age: age,
				hobbies: [...hobbies],
			};
			users = usersCopy;
			resolve(usersCopy[userIndex]);
		} else {
			reject(new Error(ErrorMessages.userNotFound));
		}
	});
};

const deleteUser = (id: string) => {
	return new Promise((resolve, reject) => {
		const isUuid = UUID_PATTERN.test(id);
		if (!isUuid) {
			reject(new Error(ErrorMessages.notValidUUID));
		}
		const desiredUser = users.find((user) => user.id === id);
		if (desiredUser) {
			const userIndex = users.indexOf(desiredUser);
			let usersCopy = [...users];
			usersCopy.splice(userIndex, 1);
			users = usersCopy;
			resolve('Done');
		} else {
			reject(new Error(ErrorMessages.userNotFound));
		}
	});
};

const userService = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};

export default userService;
