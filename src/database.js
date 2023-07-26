
import mysql from "mysql2/promise";
import {database} from "./config.js"

export const createPool = mysql.createPool(database);
export const pool = await createPool.getConnection( (err,connection)=>{
    if (err) {
        console.log(err);
    }
    if(connection) connection.release();
    console.log('Db is connection');
    return;
} );

