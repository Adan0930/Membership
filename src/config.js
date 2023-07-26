import { config } from "dotenv";
config();

export const database ={
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "mypassword" ,
    database: process.env.DB_NAME || "login" 
};

export const port = process.env.PORT || 4000;