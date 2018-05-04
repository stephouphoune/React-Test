const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

/* GET Activity */
router.get('/api/workdays', (req, res) => {
  try {
      executeQuery('SELECT * FROM workday', (err,rows) => {
        if (err) {
          res.status(500);
          res.end()
          return;
        }
        if (rows.length === 0) {
          res.status(200);
          res.send(JSON.stringify({workdays:[]}));
          res.end()
          return;
        }
        
          // JSON.parse peut engendrer un crash (donc try / catch)
        try {
          //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
          //le premier élément du tableau qui nous intéresse
          const workdays = JSON.parse(JSON.stringify(rows));
          //Pourquoi mettre des accolades autour de activities ?
          const responseBody = JSON.stringify({workdays})
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

router.put('/api/workdays/:id', (req, res) => {
  try {
      const data = req.body
      const id = req.params.id
      executeQuery(`UPDATE workday SET duration='${data.duration}' WHERE id='${id}'`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          const workday ={
            id: parseInt(id, 10),
            duration:data.duration
          }
          res.send(JSON.stringify({ workday }))
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