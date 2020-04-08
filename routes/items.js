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
// List all items localhost/items

router.get('/', function (req, res, next) {
  db.query('SELECT * FROM items', function (err, rs) {
    res.render('items', { items: rs });
  });
});

module.exports = router;
