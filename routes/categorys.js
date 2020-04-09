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

// create category route
router.get('/create', function (req, res, next) {
  res.render('category_form', { title: 'Create new Category' });
});

router.post('/create', function (req, res, next) {
  db.query('INSERT INTO categorys SET ?', req.body, function (err, rs) {
    // Redirect to show all categorys page
    res.redirect('/categorys');
  });
});
module.exports = router;
