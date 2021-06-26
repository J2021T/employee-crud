const inquirer = require('inquirer');
const mysql = require('mysql2');
const { createConnection } = require('mysql2/promise');
const { getDepts, getRoles, getEmployees } = require('./viewFunctions');
const { addDept, addRole, addEmployee } = require('./addFunctions');

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
  );

const startSystem = () => {
    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'What would you like to do next?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
    }).then(res => {
        if (res.choices === 'View all departments') {
            getDepts()
        } else if (res.choices === 'View all roles') {
            getRoles();
        } else if (res.choices === 'View all employees') {
            getEmployees();
        } else if (res.choices === 'Add a department') {
            addDept();
        } else if (res.choices === 'Add a role') {
            addRole();
        } else if (res.choices === 'Add an employee') {
            addEmployee();
        } else if (res.choices === 'Update employee role') {
            updateRole();
        } else {
            return process.exit();
        }
    });
};

const updateRole = () => {
    db.query(`select e.empl_id, concat(e.first_name, ' ', e.last_name) as name, r.role_id, r.job_title from employees e left join roles r on e.role_id = r.role_id`, (err, result) => {
        if (err) throw err;
        const employees = result.map(({ empl_id, name }) => ({
            value: empl_id,
            name: `${name}`
        }));
        const roles = result.map(({ role_id, job_title }) => ({
            value: role_id,
            name: `${job_title}`
        }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'empl_id',
                message: "Which employee's role would you like to update?",
                choices: employees
            },
            {
                type: 'list',
                name: 'role_id',
                message: "What will be the employee's role now?",
                choices: roles
            }
        ])
        .then(data => {
            const params = [data.role_id, data.empl_id];
            db.query(`update employees set role_id = ? where empl_id = ?`, params, (err, result) => {
                if (err) throw err;
                console.log(`Employee updated`);
                startSystem();
            })
        })
    });
};

module.exports = { updateRole }