import { FileSystemDao } from "./daos/FileSystemDao.mjs";
import { MySqlDao } from "./daos/MySqlDao.mjs";
import { SqliteDao } from "./daos/SqliteDao.mjs";
import { MongoDbDao } from "./daos/MongoDbDao.mjs";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao.mjs";
import { FirebaseDao } from "./daos/FirebaseDao.mjs";
import { IDao } from "./interface/daos/IDao.mjs";

export class DaoFactory{
    constructor(){

    let getDao = new IDao;        
        getDao(IDao) 
            switch(getDao){
                case 0: 
                    return new FileSystemDao();
                    break;
                case 1: 
                    return new MySqlDao();
                    break;
                case 2:
                    return new SqliteDao();
                    break;
                case 3: 
                    return new MongoDbDao();
                    break;
                case 4: 
                    return new MongoDbaaSDao();
                    break;
                case 5: 
                    return new FirebaseDao();
                    break;
                default:
                    return new FileSystemDao();
                    break;
                    
            }
    }
}

