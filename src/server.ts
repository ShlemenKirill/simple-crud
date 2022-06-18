import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { mainRouter } from './utils/mainRouter';

export const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
	try {
		await mainRouter(req, res);
	} catch (err) {
		if (err instanceof Error) {
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify('Server error'));
			res.end();
		}
	}
});
