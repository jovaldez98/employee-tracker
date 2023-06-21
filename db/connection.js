const mysql = require('mysql');

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

db.connect(err => {
    if (err) throw err;
    console.log('it is connected as id ' + db.threadId);
    afterConnection();
});

// // Function for after connection, Employee Manager image
afterConnection = () => {
    console.log('***********************')
    console.log('**                   **')
    console.log('** Employee Manager  **')
    console.log('**                   **')
    console.log('***********************')
    answer();
};