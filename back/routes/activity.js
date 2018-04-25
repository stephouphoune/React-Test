const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

/* GET Projects */
router.get('/api/activity', (req, res) => {
  
    //ES6 -> const username = req.query.username et
    //const password = req.query.password
    const { activity_id, name } = req.query

    try {
        executeQuery('SELECT * FROM activity', (err,rows) => {
          if (err) {
            res.status(500);
            res.end()
            return;
          }
          
          if (rows.length === 0) {
            res.status(200);
            res.send("Aucune activité disponible");
            res.end()
            return;
          }
          
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
            const activity = JSON.parse(JSON.stringify(rows))[0];
            activity_id=activity.activity_id
            name=activity.activity.name
            const responseBody = JSON.stringify({
                activity_id,
                name
            })
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