const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
const { type } = require('os');
db.query = util.promisify(db.query);

async function queryMyDatabase() {
    console.log('Viewing all departments...');


    // Inquirer prompt questions
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'Action',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'Add A Department',
                    'View All Employees',
                    'Update An Employee Role',
                    'Add An Employee',
                    'View All Roles',
                    'Add Role',
                    'Quit',
                ],
            }
        ])
        .then((answers) => {
            switch (answers.Action) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add A Department':
                    addDepartment();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Update An Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Add An Employee':
                    addEmployee();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Quit':
                    db.end();
                    return;
            }
        });
}

// View all departments
function viewDepartments() {
    db.query('SELECT * FROM departemtn', (err, res) => {
        if (err) throw err;
        console.table(res);
        queryMyDatabase();
    });
}

// Add a department
function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department you would like to add:',
        })
        .then((answer) => {
            db.query('INSERT INTO department (department_name) VALUES (?)
            [answer.name],
                (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Department added successfully!');
                        queryMyDatabase();
                    }
                }
            );
        });
}

// View all employees




