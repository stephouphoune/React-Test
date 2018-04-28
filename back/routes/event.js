const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const executeQuery = require('../services/executeQuery')


/* POST home page. */
router.post('/api/event', (req, res) => {

  res.end()

})


module.exports = router;