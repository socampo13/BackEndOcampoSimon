import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import { allArguments } from './utilities/getArgs';
import { exec } from 'child_process';
import { stderr, stdout } from 'process';

const commandFork = 'pm2 start src/index.mjs --name="ServerFork" --watch --8080';

const commandCluster = 'pm2 start src/index.mjs --name="ServerCluster" --watch -i max --8081';

if(allArguments.s == "cluster"){
    exec(commandCluster, (err, stdout, stderr) => {
        if(err){
            console.log(`Error => ${err.message}`);
            return;
        }
        console.log(stderr);

        if(stderr){
            console.log(stderr);
            return;
        }
        console.log(process.pid);
        initWsServer(myServer);
        dbConnection();
        myServer.listen(8080, () => console.log(`Listening on port 8080`));
    });
}else{
    exec(commandFork, (err, stdout, stderr) => {
        if(err){
            console.log(`Error => ${err.message}`);
            return;
        }
        console.log(stderr);
        if(stderr){
            console.log(stderr);
            return;
        }
        console.log(stdout);
        console.log(process.pid);
        initWsServer(myServer);
        dbConnection();
        myServer.listen(8080, () => console.log(`Listening on port 8080`));
    });
}

