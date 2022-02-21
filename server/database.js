const mysql = require('mysql2');

// below comments are to setup your local database

 const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: '390db',


 })

 connection.connect();

 module.exports = connection;




//  below comments for future deployment

/*
var mysql = require("mysql");

const config = {

    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
};

if (
    process.env.INSTANCE_CONNECTION_NAME &&
    process.env.NODE_ENV === "production"
) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}
const connection = mysql.createConnection(config);

module.exports = connection;
*/