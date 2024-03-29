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

// db.connect(err => {
//     if (err) throw err;
//     console.log('it is connected as id ' + db.threadId);
// });

db.on('error', (err) => {
    console.log('error connecting: ' + err.stack, err.message);
});

 module.exports = db;