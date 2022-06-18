import { IncomingMessage, ServerResponse } from 'http';
import userController from '../controllers/userController';
import { ROUTE_WITH_USER_ID_PATTERN } from '../constants/constants';

export const mainRouter = async (req: IncomingMessage, res: ServerResponse) => {
	if (req.url === '/api/users' && req.method === 'GET') {
		await userController.getAllUsers(req, res);
	} else if (req.url?.match(ROUTE_WITH_USER_ID_PATTERN) && req.method === 'GET') {
		await userController.getUserById(req, res);
	} else if (req.url === '/api/users' && req.method === 'POST') {
		await userController.postUser(req, res);
	} else if (req.url?.match(ROUTE_WITH_USER_ID_PATTERN) && req.method === 'PUT') {
		await userController.updateUser(req, res);
	} else if (req.url?.match(ROUTE_WITH_USER_ID_PATTERN) && req.method === 'DELETE') {
		await userController.deleteUser(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
};
