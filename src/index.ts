import 'dotenv/config';
import { server } from './server';
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});
server.on('close', () => {
	console.log('Server closed');
});
