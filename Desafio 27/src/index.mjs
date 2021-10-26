import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';

const port = process.env.PORT || 8080;
initWsServer(myServer);
dbConnection();

myServer.listen(port, () => console.log(`Server listening on port ${port}`));