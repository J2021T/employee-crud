require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const { createConnection } = require('mysql2/promise');
const { startSystem } = require('./functions/startFunction');

// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  figlet(`Employee\n Manager`, {font: 'Cybermedium'}, (err, rendered) => {
    if (err) throw err;
    console.log(rendered);
    startSystem();
  })
);

// figlet.fonts((err, fonts) => {
//   if (err) throw err;
//   console.dir(fonts);
// });

// db.connect(err => {
//     if (err) throw err;
// });
