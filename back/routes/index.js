const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const r_username = 'admin'
const r_password = 'admin'

/* GET home page. */
router.get('/api/user', (req, res) => {
  
  const username = req.query.username
  const password = req.query.password
  console.log(req.query)
  // const { username, password } = req.query
  if (username === r_username && password === r_password) {
    res.status(200)
    const token = jwt.sign({ username, password }, 'monsupermotdepasseincracable');
    res.send(token)
    res.end()
    return;
  }

  res.status(401)
  res.end()

});


module.exports = router;
