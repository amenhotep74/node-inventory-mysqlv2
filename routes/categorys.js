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

// update category route
router.get('/update', function (req, res, next) {
  // Find the category that was clicked on in the database from the url
  db.query('SELECT * FROM categorys WHERE id = ?', req.query.id, function (
    err,
    rs
  ) {
    res.render('category_update', {
      title: 'Update Category',
      category: rs[0],
    });
  });
});

// Update form category route
router.post('/update', function (req, res, next) {
  console.log(req.body);
  console.log(req.query.id);
  var param = [req.body, req.query.id];
  db.query('UPDATE categorys SET ? WHERE id = ?', param, function (err, rs) {
    if (err) {
      console.log(err);
    }
    res.redirect('/categorys');
    console.log('Category updated!');
  });
});

// Delete routes
router.get('/delete', function (req, res, next) {
  db.query('SELECT * FROM categorys WHERE id = ?', req.query.id, function (
    err,
    rs
  ) {
    console.log(rs[0]);
    res.render('category_delete', {
      title: 'Delete Category',
      category: rs[0],
    });
  });
});

router.post('/delete', function (req, res, next) {
  db.query('DELETE FROM categorys WHERE id = ?', req.query.id, function (
    err,
    rs
  ) {
    res.redirect('/categorys');
  });
});

module.exports = router;
