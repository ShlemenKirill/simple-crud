import { cpus } from 'node:os';
import 'dotenv/config';
import cluster from 'node:cluster';
import { server } from './server';
const PORT = process.env.PORT || 5000;

const startCluster = () => {
	const numCPUs = cpus().length;
	if (cluster.isPrimary) {
		console.log(`Number of CPUs is ${numCPUs}`);
		console.log(`Primary ${process.pid} is running`);

		for (let i = 0; i < numCPUs; i++) {
			cluster.fork();
		}

		cluster.on('exit', (worker, code, signal) => {
			console.log(`Worker ${worker.process.pid} died`);
		});
	} else {
		server.listen(PORT, () => {
			console.log(`server started on port: ${PORT}`);
		});
		server.on('close', () => {
			console.log('Server closed');
		});

		console.log(`Worker ${process.pid} started`);
	}
}

startCluster()


