const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')


router.get('/api/admin', (req, res) => {
        console.log(req.user.isAdmin)
        if (req.user.isAdmin)
        {
            try {
                const { username } = req.query
                executeQuery(`SELECT username, firstName, lastName, url_calendar FROM user WHERE username='${username}'`, (err,rows) => {
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
                const responseBody = JSON.stringify({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    url: user.url_calendar
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