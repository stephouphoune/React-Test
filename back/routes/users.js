const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const executeQuery2 = require('../services/executeQuery2')

const createUser = rawUser => ({
  firstName:rawUser.firstName,
  lastName:rawUser.lastName,
  username:rawUser.username,
})

const createUsers = rawUsers => rawUsers.map(createUser)

/* GET Activity */
router.get('/api/users', (req, res) => {
    try {
        
        executeQuery(`SELECT username, firstName, lastName FROM user WHERE isAdmin='0'`, (err,rows) => {
          if (err) {
            res.status(500);
            res.end()
            return;
          }
          if (rows.length === 0) {
            res.status(200);
            res.send(JSON.stringify({users:[]}));
            res.end()
            return;
          }
          
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
            const rawUsers = JSON.parse(JSON.stringify(rows));
            const users = createUsers(rawUsers);
            //Pourquoi mettre des accolades autour de activities ?
            const responseBody = JSON.stringify({users})
        
            res.status(200)
            res.send(responseBody)
            res.end()
            return;
      
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
  

module.exports = router;