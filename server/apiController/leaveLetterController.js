var router = require('express').Router();
var moment = require('moment');
var uid = require('rand-token').uid;


let leaveLetterRepo = require('../repo/leaveLetterRepo');
let rejectLetterDetailRepo = require('../repo/rejectedLetterRepo');

router.get('/:id', (req, res) => {
  console.log(req.body);
  res.json({
    msg: 'GET letter with :id worked'
  });
});

router.get('/all', (req, res) => {
  console.log(req.body);
  res.json({
    msg: 'GET all letters with :id worked'
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: 'POST new letter worked'
  });
});

router.patch('/:id', (req, res) => {
  res.json({
    msg: 'PATCH letter\'s info with ID worked'
  });
});

module.exports = router;