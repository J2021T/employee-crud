const inquirer = require('inquirer');
const mysql = require('mysql2');
const { createConnection } = require('mysql2/promise');
const { getDepts, getRoles, getEmployees } = require('./viewFunctions');
const { updateRole } = require('./updateFunctions');

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

const addDept = (res) => {
  inquirer.prompt(
      {
          type: 'input',
          name: 'dept_name',
          message: 'What is the department name?',
          validate: dept_nameInput => {
              if (dept_nameInput) {
                  return true;
              } else {
                  console.log('Please enter a department name!');
                  return false;
              }
          }
      }
  ).then(data => {
      const params = data.dept_name;
      db.query('insert into departments (dept_name) values (?)', params, (err, result) => {
          if (err) throw err;
          console.log('Department added');
          startSystem();
      });
  });
};

const addRole = () => {
  db.query(`select * from departments`, (err, result) => {
      if (err) throw err;
      const dept_names = result.map(({ dept_name, dept_id }) => ({
          value: dept_id, 
          name: `${dept_name}`
      }));
      console.log(dept_names);
      inquirer.prompt([
          {
              type: 'input',
              name: 'job_title',
              message: 'What is the job title for the role?',
              validate: job_titleInput => {
                  if (job_titleInput) {
                      return true;
                  } else {
                      console.log('Please enter a job title!');
                      return false;
                  }
              }
          },
          {
              type: 'input',
              name: 'salary',
              message: "What is the role's salary?",
              validate: salaryInput => {
                  if (salaryInput) {
                      return true;
                  } else {
                      console.log('Please enter a role salary!');
                      return false;
                  }
              }
          },
          {
              type: 'list',
              name: 'dept_id',
              message: 'Pick the department your role will be in.',
              choices: dept_names
          }
      ])
      .then(data => {
          console.log(data.dept_id);
          const params = [data.job_title, data.salary, data.dept_id];
          db.query('insert into roles (job_title, salary, dept_id) values (?,?,?)', params, (err, result) => {
              if (err) throw err;
              console.log('Role added');
              startSystem();
          });
      });
  });
};

const addEmployee = () => {
  db.query(`select e.empl_id, concat(e.first_name, ' ', e.last_name) as name, r.role_id, r.job_title, d.dept_name from employees e left join roles r on e.role_id = r.role_id left join departments d on r.dept_id = d.dept_id`, (err, result) => {
      if (err) throw err;
      const roles = result.map(({ role_id, job_title }) => ({
          value: role_id,
          name: `${job_title}`
      }));
      const managers = result.map(({ empl_id, name, job_title }) => ({
          value: empl_id,
          name: `${name} --- ${job_title}`
      }));
      // const nDepts = [...new Set(depts.map(dept => dept.value))]
      // .map(value => {
      //     return depts.find(dept => dept.value === value)
      // });
      inquirer.prompt([
          {
              type: 'input',
              name: 'first_name',
              message: "What is the employee's first name?",
              validate: first_nameInput => {
                  if (first_nameInput) {
                      return true
                  } else {
                      console.log('Please enter the first name!');
                      return false;
                  }
              }
          },
          {
              type: 'input',
              name: 'last_name',
              message: "What is the employee's last name?",
              validate: last_nameInput => {
                  if (last_nameInput) {
                      return true
                  } else {
                      console.log('Please enter the last name!');
                      return false;
                  }
              }
          },
          {
              type: 'list',
              name: 'role_id',
              message: 'What role will the new employee fill?',
              choices: roles
          },
          {
              type: 'list',
              name: 'mngr_id',
              message: "Who will be the employee's manager?",
              choices: managers
          }
      ])
      .then(data => {
          const params = [data.first_name, data.last_name, data.role_id, data.mngr_id];

          db.query(`insert into employees (first_name, last_name, role_id, mngr_id) values (?,?,?,?)`, params, (err, result) => {
              if (err) throw err;
              console.log(`Employee added`);
              startSystem();
          });
      });
  });
};

module.exports = { addDept, addRole, addEmployee }