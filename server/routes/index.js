var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('It fucking works m9-1');
});

module.exports = router;
