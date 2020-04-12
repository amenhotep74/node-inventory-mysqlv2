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
  db.query('INSERT INTO items SET ?', function (err, rs) {
    if (err) {
      console.log(err);
    }
    // Redirect to show all items page
    res.redirect('/items');
  });
});

// Update item route
// router.get('/update', function (req, res, next) {
//   // Find the item what was clicked on in the data
//   db.query('SELECT * FROM items WHERE id = ?', req.query.id, function (
//     err,
//     rs
//   ) {
//     res.render('item_update', {
//       title: 'Update item',
//       item: rs[0],
//       categorys: grabCategorys(),
//     });
//   });
// });

router.get('/update', function (req, res, next) {
  var sql = 'SELECT * from items WHERE id = ?; SELECT * from categorys';

  db.query(sql, [req.query.id], async function (error, results, fields) {
    if (error) {
      throw error;
    }
    // Render the view
    res.render('item_update', {
      title: 'Update Item',
      item: results[0][0],
      categorys: results[1],
    });
  });
});

router.post('/update', function (req, res, next) {
  // req.body is the form output
  // req.query.id is the id in the URL
  var param = [req.body, req.query.id];
  db.query('UPDATE items SET ? WHERE id = ?', param, function (err, rs) {
    if (err) {
      console.log(err);
    }
    // Redirect to the show all items page
    res.redirect('/items');
  });
});

module.exports = router;
