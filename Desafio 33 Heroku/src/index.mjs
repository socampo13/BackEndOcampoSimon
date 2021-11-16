import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import cluster from 'cluster';
import os from 'os';
import { portArgument, clusterArg } from './utilities/getArgs.mjs';
import { consoleLogger } from './middlewares/logger';

dbConnection();
initWsServer(myServer);

const port = process.env.PORT || 8080;
const clusterArgument = clusterArg || false;
const numCPUS = os.cpus().length;

if(cluster.isMaster && clusterArgument){
    
    console.log(`Number of cpus ${numCPUS}`);
    console.log(`PID master ${process.pid}`);
    for(let i = 0; i < numCPUS; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died at ${Date()}`);
        cluster.fork();
    });
}else{
    myServer.listen(port, () => 
        console.log(`Express server running on port ${port} - PID worker ${process.pid}`)
    );
}

