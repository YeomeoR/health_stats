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

// connection.query('SELECT * FROM users', (err, results) => {
//   if (err) throw err;
//   console.log('Data received from the database!');
//   console.log(results);

// });


// connection.end();



module.exports = connection;