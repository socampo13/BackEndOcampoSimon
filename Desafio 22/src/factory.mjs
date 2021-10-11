import { FileSystemDao } from "./daos/FileSystemDao.mjs";
import { MySqlDao } from "./daos/MySqlDao.mjs";
import { SqliteDao } from "./daos/SqliteDao.mjs";
import { MongoDbDao } from "./daos/MongoDbDao.mjs";
import { MongoDbaaSDao } from "./daos/MongoDbaaSDao.mjs";
import { FirebaseDao } from "./daos/FirebaseDao.mjs";
import { IDao } from "./interface/daos/IDao.mjs";

export class DaoFactory{
    constructor(){

    this.FileSystemDao = new FileSystemDao();     
    this.MySqlDao = new MySqlDao();
    this.SqliteDao = new SqliteDao();
    this.MongoDbDao = new MongoDbDao();
    this.MongoDbaaSDao = new MongoDbaaSDao();
    this.FirebaseDao = new FirebaseDao();
    }    
    
        getDao(number){
            switch(number){
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

