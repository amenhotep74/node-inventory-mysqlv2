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

// List all items localhost/categorys

router.get('/', function (req, res, next) {
  db.query('SELECT * FROM categorys', function (err, rs) {
    res.render('categorys', { categorys: rs });
  });
});

module.exports = router;
