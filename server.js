require('dotenv').config();
const mysql = require('mysql2');
const cTable = require('console.table');
const { createConnection } = require('mysql2/promise');


// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the empl_mngmt database.`)
);



db.query(`select database()`, (err, result) => {
    if (err) throw err;
    console.log(result);
});