import { options } from '../sqlite3';
import knex from 'knex';

(async () => {
    try{
        const tableName = "messages";
        if(await knex.schema.hasTable(tableName)){
            await knex.schema.dropTable(tableName);
        }

        await knex.schema.createTable(tableName, (table) => {
            table.string("author", 10).notNullable();
            table.string("date").notNullable();
            table.string("text").notNullable();
        });

        await knex(tableName).insert(message);
        console.log("New message");
        console.log("New table created");
    }catch(error){
        console.log(error);
    }finally{
        knex.destroy();
    }
})();