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
    db.query(`select r.role_id, r.job_title, r.salary, d.dept_name from roles r join departments d on r.dept_id = d.dept_id`, (err, result) => {
        display(err, result);
    });
};

const getEmployees = () => {
    db.query(`select e.empl_id, e.first_name, e.last_name, r.job_title, r.salary, d.dept_name, concat(m.first_name, ' ', m.last_name) as manager
        from employees e
        left join roles r on e.role_id = r.role_id
        left join departments d on r.dept_id = d.dept_id
        left join employees m on m.empl_id = e.mngr_id
        `, (err, result) => {
            display(err, result);
    });
};



module.exports = { getDepts, getRoles, getEmployees }