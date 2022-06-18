import { IncomingMessage, ServerResponse } from 'http';
import userService from '../services/userService';
import { ErrorMessages } from '../constants/constants';
import { handleRequestData } from '../utils/handleRequestData';
import { UserRequest } from '../interfaces/user.interface';

const getAllUsers = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const users = await userService.getUsers();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(users));
		res.end();
	} catch (err) {
		console.log(err);
	}
};

const getUserById = async (req: IncomingMessage, res: ServerResponse) => {
	if (req.url?.match(/\/api\/users\/(.)/)) {
		try {
			const routeArray = req.url?.split('/');
			const user = await userService.getUserById(routeArray[3]);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(user));
			res.end();
		} catch (err) {
			if (err instanceof Error) {
				const statusCode = err.message === ErrorMessages.notValidUUID ? 400 : 404;
				res.writeHead(statusCode, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(err.message));
				res.end();
			}
		}
	}
};

const postUser = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const reqData = await handleRequestData(req);
		const createdUser = await userService.createUser(<UserRequest>reqData);
		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.write(JSON.stringify(createdUser));
		res.end();
	} catch (err) {
		if (err instanceof Error) {
			const statusCode = err.message === ErrorMessages.notValidUUID ? 400 : 404;
			res.writeHead(statusCode, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(err.message));
			res.end();
		}
	}
};

const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
	if (req.url?.match(/\/api\/users\/(.)/)) {
		try {
			const routeArray = req.url?.split('/');
			const reqData = await handleRequestData(req);
			const createdUser = await userService.updateUser(routeArray[3], <UserRequest>reqData);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(createdUser));
			res.end();
		} catch (err) {
			if (err instanceof Error) {
				const statusCode = err.message === ErrorMessages.notValidUUID ? 400 : 404;
				res.writeHead(statusCode, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(err.message));
				res.end();
			}
		}
	}
};
const deleteUser = async (req: IncomingMessage, res: ServerResponse) => {
	if (req.url?.match(/\/api\/users\/(.)/)) {
		try {
			const routeArray = req.url?.split('/');
			await userService.deleteUser(routeArray[3]);
			res.writeHead(204, { 'Content-Type': 'application/json' });
			res.end();
		} catch (err) {
			if (err instanceof Error) {
				const statusCode = err.message === ErrorMessages.notValidUUID ? 400 : 404;
				res.writeHead(statusCode, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(err.message));
				res.end();
			}
		}
	}
};

const userController = {
	getAllUsers,
	getUserById,
	postUser,
	updateUser,
	deleteUser,
};

export default userController;
