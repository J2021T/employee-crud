const mysql = require('mysql2');
const { createConnection } = require('mysql2/promise');

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    },
  );

const display = (err, result) => {
    if (err) throw (err);
    console.table(result);
};

const getDepts = () => {
    db.query(`select * from departments`, (err, result) => {
        display(err, result);
      });
};

const getRoles = () => {
    db.query(`select roles.role_id, roles.job_title, roles.salary, departments.dept_name from roles join departments on roles.dept_id = departments.dept_id`, (err, result) => {
        display(err, result);
    });
};

const getEmployees = () => {
    db.query(`select employees.empl_id, employees.first_name, employees.last_name, roles.job_title, roles.salary, departments.dept_name
        from employees left join roles on employees.role_id = roles.role_id
        left join departments on roles.dept_id = departments.dept_id
        ;`, (err, result) => {
            display(err, result);
    });
};



module.exports = { getDepts, getRoles, getEmployees }