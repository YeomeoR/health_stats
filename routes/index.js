var express = require('express');
var router = express.Router();

const connection = require('../db_connection');

// db cols are date (timestamp), weight (int), chest, waist, alcohol_days, comments
const insertStatsQuery = 'INSERT INTO stats (weight, chest, waist, alcohol, comments) VALUES (?, ?, ?, ?, ?)';

router.post('/upload', function(req, res) {
  console.log(req.body);
  // use the database connection to insert into stats
  connection.query(insertStatsQuery, [req.body.weight, req.body.chest, req.body.waist, req.body.alcohol, req.body.comments], (err, results) => {
    if (err) throw err;
    console.log('Data received from the database!');
    console.log(results);
    res.redirect('/upload');
  });

  res.send('Got it!');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
