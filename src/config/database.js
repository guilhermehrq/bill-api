const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?ssl=require`;

const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : connectionString,
    ssl: isProduction,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle connection', err);
    process.exit(-1);
})

module.exports = { pool };
