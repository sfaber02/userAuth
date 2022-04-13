const pgp = require("pg-promise")();
require('dotenv').config();

let cn = {};
//FOR PRODUCTION
if (process.env.DATABASE_URL) {
    //production mode - links to heroku psql
    cn = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
} else {
    //DEVELOPMENT mode links to local psql
    cn = {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        user: process.env.PG_USER,
        // password: process.env.PG_PASSWORD,
    }
}

const db = pgp(cn);


module.exports = db;