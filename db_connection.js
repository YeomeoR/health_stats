const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ry_health_stats'

});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database!');
});



// connection.end();



module.exports = connection;