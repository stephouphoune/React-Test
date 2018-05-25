const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const jwt = require('jsonwebtoken')

router.get('/api/admin', (req, res) => {
        console.log(req.user.isAdmin)
        if (req.user.isAdmin)
        {
            try {
                const { username } = req.query
                executeQuery(`SELECT username, firstName, lastName, url_calendar, isAdmin FROM user WHERE username='${username}'`, (err,rows) => {
                if (err) {
                    res.status(500);
                    res.end()
                    return;
                }
                if (rows.length === 0) {
                    res.status(200);
                    res.send(JSON.stringify({user:[]}));
                    res.end()
                    return;
                }
                
                const user = JSON.parse(JSON.stringify(rows))[0];
                const isAdmin = user.isAdmin ? true:false
                const { username, firstName, lastName, url_calendar} = user
                const token = jwt.sign({ username, isAdmin }, 'monsupermotdepasseincracable');
                
                const responseBody = JSON.stringify({
                    username,
                    firstName,
                    lastName,
                    url: url_calendar,
                    isAdmin,
                    token
                  })
                res.status(200)
                res.send(responseBody)
                res.end()
                return;

            })
            }
            catch (e) {

            }
        }
        else {
            res.status(401)
            res.end()
            return;
        }
        
    
    });
  

module.exports = router;