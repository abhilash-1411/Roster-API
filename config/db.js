const mysql = require('mysql2')
const dbConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Abhilash@143',
    database : 'eventsdb'
})

module.exports = dbConnection