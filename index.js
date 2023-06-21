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
            db.query('INSERT INTO department (department_name) VALUES (?)'
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
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            queryMyDatabase();
        }
    });
}

// Update an employee role
function updateEmployeeRole() {
    db.query('SELECT * FROM role', (err, role) => {
        if (err) {
            console.log(err);
            queryMyDatabase();
        } else {
            db.query('SELECT * FROM employee', (err, managers) => {
                if (err) {
                    console.log(err);
                    queryMyDatabase();
                } else {
                    inquirer
                    .prompt([
                        {
                            name: 'first_name',
                            type: 'input',
                            message: 'What is the employees\'s first name:',
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'What is the employee\'s last name:',
                        },
                        {
                            name: 'role_id',
                            type: 'list',
                            message: 'What is the employee\'s new role:',
                            choices: role.map((role) => role.title),
                        },
                        {
                            name: 'manager_id',
                            type: 'list',
                            message: 'Select the employee\'s new manager:',
                            choices: managers.map((manager) => `${manager.first_name} ${manager.last_name}`),
                        },
                    ])
                    .then((answer) => {
                        const roleId = role.find((role) => role.title === answer.role_id).id;

                        const managerId = managers.find((manager) => `${manager.first_name} ${manager.last_name}` === answer.manager_id).id;

                        db.query(
                            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                            [answer.first_name, answer.last_name, roleId, managerId],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Employee added successfully!');
                                }
                                queryMyDatabase();
                            }
                        );
                    });
                }
            });
        }
    });
};

// Add an employee
function addEmployee() {
    db.query('SELECT * FROM role', (err, role) => {
        if (err) {
            console.log(err);
            queryMyDatabase();
        } else {
            db.query('SELECT * FROM employee', (err, managers) => {
                if (err) {
                    console.log(err);
                    queryMyDatabase();
                } else {
                    inquirer
                    .prompt([
                        {
                            name: 'first_name',
                            type: 'input',
                            message: 'What is the employees\'s first name:',
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'What is the employee\'s last name:',
                        },
                        {
                            name: 'role_id',
                            type: 'list',
                            message: 'What is the employee\'s new role:',
                            choices: role.map((role) => role.title),
                        },
                        {
                            name: 'manager_id',
                            type: 'list',
                            message: 'Select the employee\'s new manager:',
                            choices: managers.map((manager) => `${manager.first_name} ${manager.last_name}`),
                        },
                    ])
                    .then((answer) => {
                        const roleId = role.find((role) => role.title === answer.role_id).id;

                        const managerId = managers.find((manager) => `${manager.first_name} ${manager.last_name}` === answer.manager_id).id;

                        db.query(
                            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                            [answer.first_name, answer.last_name, roleId, managerId],
                            (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Employee added successfully!');
                                }
                                queryMyDatabase();
                            }
                        );
                    });
                }
            });
        }
    });
};

// View all roles
function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            queryMyDatabase();
        }
    });
}

// Add a role
function addRole() {
    db.query('SELECT * FROM department', (err, department) => {
        if (err) {
            console.log(err);
        } else {
            inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the role you would like to add:',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the role you would like to add:',
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'Select the department for the role you would like to add:',
                    choices: department.map((department) => department.department_name),
                },
            ])
            .then((answers) => {
                const departmentId = department.find((department) => department.department_name === answers.department_id).id;

                db.query(
                    'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
                    [answers.title, answers.salary, departmentId],
                    (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Role added successfully!');
                            queryMyDatabase();
                        }
                    }
                );
            });
        }
    });
};

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    queryMyDatabase();
});