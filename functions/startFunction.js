// const inquirer = require('inquirer');
// const cTable = require('console.table');
// const { getDepts, getRoles, getEmployees } = require('./viewFunctions');
// const { addDept, addRole, addEmployee } = require('./addFunctions');
// const { updateRole } = require('./updateFunctions');



// const startSystem = () => {
//     inquirer.prompt({
//       type: 'list',
//       name: 'choices',
//       message: 'What would you like to do?',
//       choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit']
//     }).then(res => {
//       if (res.choices === 'View all departments') {
//         getDepts()
//       } else if (res.choices === 'View all roles') {
//         getRoles();
//       } else if (res.choices === 'View all employees') {
//         getEmployees();
//       } else if (res.choices === 'Add a department') {
//         addDept();
//       } else if (res.choices === 'Add a role') {
//         addRole();
//       } else if (res.choices === 'Add an employee') {
//         addEmployee();
//       } else if (res.choices === 'Update employee role') {
//           updateRole();
//       } else {
//           return process.exit();
//       }
//     });
//   };
  
//   module.exports = { startSystem };