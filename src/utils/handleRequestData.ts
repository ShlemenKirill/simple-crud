import { IncomingMessage } from 'http';
import { UserRequest } from '../interfaces/user.interface';

export const handleRequestData = (req: IncomingMessage) => {
	return new Promise<UserRequest>((resolve, reject) => {
		try {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				resolve(JSON.parse(body));
			});
		} catch (error) {
			reject(error);
		}
	});
};
