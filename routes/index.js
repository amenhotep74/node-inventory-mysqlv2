var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node-inventory-mysql',
  debug: false,
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnect', function (req, res, next) {
  if (db != null) {
    res.send('Connect Success');
  } else {
    res.send('Connect failed');
  }
});

module.exports = router;
