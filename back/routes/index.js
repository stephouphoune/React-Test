const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const executeQuery = require('../services/executeQuery')

/* GET home page. */
router.get('/api/user', (req, res) => {
  
  //ES6 -> const username = req.query.username et
  //const password = req.query.password
  const { username, password } = req.query

  try {
    executeQuery('SELECT username, firstName, lastName, password, url_calendar, isAdmin FROM user WHERE username='+'"'+username+'"', (err,rows) => {
      if (err) {
        res.status(500);
        res.end()
        return;
      }
      
      if (rows.length === 0) {
        res.status(401)
        res.end()
        return;
      }
      
      // JSON.parse peut engendrer un crash (donc try / catch)
      try {
        console.log(rows)
        const user = JSON.parse(JSON.stringify(rows))[0];
        if (user.password===password) {
            const isAdmin = user.isAdmin ? true : false;
            const token = jwt.sign({ username, password, isAdmin }, 'monsupermotdepasseincracable');
            const firstName=user.firstName
            const lastName=user.lastName
            const url = user.url_calendar
            console.log('------------', url)
            const responseBody = JSON.stringify({
              token,
              username, 
              isAdmin, 
              firstName, 
              lastName,
              url
            })
            res.status(200)
            res.send(responseBody)
            res.end()
            return;
        }
  
       } catch (e) {
        res.status(500)
        res.end()
        return;
       }
    });
  }
  catch(e) {
    res.status(500);
    res.end();
  }

});

router.put('/api/user', (req, res) => {
  try {
      const data = req.body
      console.log(data)
      executeQuery(`UPDATE user SET url_calendar='${data.url}' WHERE username='${req.user.username}'`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          res.send(JSON.stringify({ url: data.url }))
          res.end()
      })
  }
  catch(e) {
      res.status(500);
      res.end();
      console.log(e)
    }
});

module.exports = router;