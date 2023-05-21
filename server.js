const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connnect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log('Connection to the employee_db database was successful...')
);

connection.connect(err => {
    if (err) throw err;
    console.log('it is connected as id ' + connection.threadId);
    afterConnection();
});

// Function for after connection, Employee Manager image
afterConnection = () => {
    console.log('***********************')
    console.log('**                   **')
    console.log('** Employee Manager  **')
    console.log('**                   **')
    console.log('***********************')
    promptUser();
};

// Inquirer prompt questions
const promptUser = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'Add A Department',
                'Delete A Department',
                'View All Employees',
                'View Employees By Department',
                'Update An Employee Role',
                'Add An Employee',
                "Delete An Employee",
                'Update An Employee Manager',
                'View All Roles',
                'Add Role',
                'Delete A Role',
                'View Department Budgets',
                'Quit'
            ]
        }
    ])
    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View All Departments') {
            showDepartments();
        }

        if (choices === 'Add A Department') {
            addDepartment();
        }

        if (choices === 'Delete A Department') {
            deleteDepartment();
        }

        if (choices === 'View All Employees') {
            showEmployees();
        }

        if (choices === 'View Employees By Department') {
            showEmployeeDepartment();
        }

        if (choices === 'Update An Employee Role') {
            updateEmployee();
        }

        if (choices === 'Add An Employee') {
            addEmployee();
        }

        if (choices === 'Delete An Employee') {
            deleteEmployee();
        }

        if (choices === 'Update An Employee Manager') {
            updateEmployeeManager();
        }

        if (choices === 'View All Roles') {
            showRoles();
        }

        if (choices === 'Add Role') {
            addRole();
        }

        if (choices === 'Delete A Role') {
            deleteRole();
        }

        if (choices === 'View Department Budgets') {
            showDepartmentBudget();
        }

        if (choices === 'Quit') {
            connection.end();
        };
    });
};

// Query database
let deletedRow = 2;

db.query('DELETE FROM employee_db WHERE id = ?', deletedRow, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

// Query database
db.query('SELECT * FROM employee_db', function (err, results) {
    console.log(results);
});

