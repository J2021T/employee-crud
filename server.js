require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const art = require('ascii-art');
const { createConnection } = require('mysql2/promise');
const { getDepts, getRoles, getEmployees, addDept, addRole } = require('./functions');



// Connect to database
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  art.font('Employee Manager', 'doom', (err, rendered) => {
    if (err) throw err;
    return console.log(rendered);
  })
);



db.connect(err => {
    if (err) throw err;
    startSystem();
});

const startSystem = () => {
  inquirer.prompt({
    type: 'list',
    name: 'choices',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
  }).then(res => {
    if (res.choices === 'View all departments') {
      getDepts();
    } else if (res.choices === 'View all roles') {
      getRoles();
    } else if (res.choices === 'View all employees') {
      getEmployees();
    } else if (res.choices === 'Add a department') {
      addDept();
    } else if (res.choices === 'Add a role') {
      addRole();
    }
  });
};

