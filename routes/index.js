var express = require('express');
var router = express.Router();

const connection = require('../db_connection');

// db cols are date (timestamp), weight (int), chest, waist, alcohol_days, comments
const insertStatsQuery = 'INSERT INTO stats (weight, chest, waist, alcohol, comments) VALUES (?, ?, ?, ?, ?)';

router.post('/upload', function(req, res) {
  console.log(req.body);
  // use the database connection to insert into stats
  connection.query(insertStatsQuery, 
    [
      req.body.weight, 
      req.body.chest, 
      req.body.waist, 
      req.body.alcohol, 
      req.body.comments
    ], (err, results) => {
    if (err) throw err;
    console.log(results);
  });

  res.send('Got it!');
  connection.end();
});

router.get('/chart', function(req, res) {
  // use the database connection to get the stats
  connection.query('SELECT * FROM stats', (err, results) => {
    if (err) throw err;
    console.log(results);

    const stats = results.map((row) => {
      return {
        date: row.date,
        weight: row.weight,
        chest: row.chest,
        waist: row.waist,
        alcohol: row.alcohol,
      };
    });

    const weightChange = (stats[stats.length - 1].weight - stats[0].weight).toFixed(1);

    let lastChest = null;
    for (let i = stats.length - 1; i >= 0; i--) {
      if (stats[i].chest) {
        lastChest = stats[i].chest;
        break;
      }
    }

    let lastWaist = null;
    for (let i = stats.length - 1; i >= 0; i--) {
      if (stats[i].waist) {
        lastWaist = stats[i].waist;
        break;
      }
    }
    const chestChange = lastChest - stats[0].chest;
    const waistChange = lastWaist - stats[0].waist;
    const alcoholChange = stats[stats.length - 1].alcohol - stats[0].alcohol;


    res.render('chart', { title: 'Express', stats: stats, weightChange: weightChange, chestChange: chestChange, waistChange: waistChange, alcoholChange: alcoholChange});
  });
  // connection.end();
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
