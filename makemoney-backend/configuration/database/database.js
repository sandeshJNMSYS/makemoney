//---------Use sql connectivity----------


const mysql = require('mysql2');


var env = require('../../configuration/.env');
var logger = require('../../configuration/logger/logger').logger

//----------Create database connection----------
var connection = mysql.createConnection({
    host: env.sqlConnection.host,
    user: env.sqlConnection.user,
    password: env.sqlConnection.password,
    database: env.sqlConnection.database,
    multipleStatements: true
});

//----------Connect database---------
connection.connect(function(err){
    if(!!err){
        logger.error('Database :: database connection error : '+ err)
    }
    else{
    logger.info('Database :: database connection success  ')
    
    }
});


 module.exports = connection;
