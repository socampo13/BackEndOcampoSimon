import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import os from 'os';
import { portArgument, clusterArgument } from './util/getArguments.js';
import { logger } from './middlewares/logger';
import cluster from 'cluster';

dbConnection();
initWsServer(myServer);

const port = portArgument || 8080;
const clusterArgument = clusterArgument || false;
const numCPUs = os.cpus().length;

if(cluster.isMaster && clusterArgument){
    logger.info(`Number of CPU's is ${numCPUs}`);
    logger.info(`PID ${process.pid}`);

    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit',(worker : any) => {
        logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
        cluster.fork();
    });
}else{
    myServer.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
}