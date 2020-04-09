var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node-inventory-mysql',
  debug: false,
  multipleStatements: true,
});
// List all items localhost/items
router.get('/', function (req, res, next) {
  db.query('SELECT * FROM items', function (err, rs) {
    res.render('items', { items: rs });
  });
});

// Create item route (render form view)
router.get('/create', function (req, res, next) {
  // Retrieve all categorys to be displayed in the category options
  db.query('SELECT * FROM categorys', function (err, rs) {
    // passing in categorys to be rendered in option fields
    res.render('item_form', { title: 'Create a item', categorys: rs });
  });
});

// When create item form is submitted
router.post('/create', function (req, res, next) {
  console.log(req.body);
  db.query('INSERT INTO items SET ?', req.body, function (err, rs) {
    if (err) {
      console.log(err);
    }
    // Redirect to show all items page
    res.redirect('/items');
  });
});

// Update item get
router.get('/update', function (req, res, next) {
  // Find the item record where the url id is the same as the url one
  db.query('SELECT * FROM items WHERE id = ?', req.query.id, function (
    err,
    rs
  ) {
    // The first item returned in the array is the name of the item
    res.render('item_update', { item: rs[0], title: 'Update Item' });
  });
});

router.post('/update', function (req, res, next) {
  var param = [
    req.body, // new record object to update with
    req.query.id, // id of record to update in the database
  ];
  db.query('UPDATE items SET ? WHERE id = ?', param, function (err, rs) {
    res.redirect('/items');
    console.log('Update record successful!');
  });
});

module.exports = router;
