const inquirer = require('inquirer');
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
            });
        });
    });
};


module.exports = { getDepts, getRoles, getEmployees, addDept, addRole }