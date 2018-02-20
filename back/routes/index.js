const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const r_email = 'admin'
const r_password = 'admin'

/* GET home page. */
router.get('/api/user', (req, res) => {
  
  const email = req.query.email
  const password = req.query.password
  console.log(req.query)
  // const { email, password } = req.query
  if (email === r_email && password === r_password) {
    res.status(200)
    const token = jwt.sign({ email, password }, 'monsupermotdepasseincracable');
    res.send(token)
    res.end()
    return;
  }

  res.status(401)
  res.end()

});


module.exports = router;
