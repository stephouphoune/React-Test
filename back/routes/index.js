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
    executeQuery('SELECT username FROM USER WHERE username='+'"'+username+'"', (err,rows) => {
      if (err){
        res.status(500);
      }
      //Si il y en a un, alors on vérifie le mot de passe
      if (rows.length>0)
      {
        executeQuery('SELECT password FROM USER WHERE username='+'"'+username+'"', (err,rows) => {
          //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
          //le premier élément du tableau qui nous intéresse
          const jsRows = JSON.parse(JSON.stringify(rows))[0];
          if (jsRows.password===password) {
              res.status(200)
              const token = jwt.sign({ username, password }, 'monsupermotdepasseincracable');
              res.send(token)
              res.end()
              return;
          }
          res.status(401)
          res.end()
        });
      }
      //S'il n'y a rien alors on quitte avec une erreur 401 : identifiants incorrects
      else {
        res.status(401);
        res.end();
      }
    });
    
  }
  
  catch(e) {
    res.status(500);
    res.end();
  }

});

module.exports = router;
