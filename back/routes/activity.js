const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

const createActivity = rawActivity => ({
  id:rawActivity.activity_id,
  name:rawActivity.name
})

const createActivities = rawActivities => rawActivities.map(createActivity)

/* GET Activity */
router.get('/api/activity', (req, res) => {
    try {
        executeQuery('SELECT * FROM activity', (err,rows) => {
          if (err) {
            res.status(500);
            res.end()
            return;
          }
          
          if (rows.length === 0) {
            res.status(200);
            res.send(JSON.stringify({activities:[]}));
            res.end()
            return;
          }
          
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
            
            const rawActivities = JSON.parse(JSON.stringify(rows));
            const activities = createActivities(rawActivities);
            //Pourquoi mettre des accolades autour de activities ?
            const responseBody = JSON.stringify({activities})
            console.log('----------------2222222222------', responseBody)
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
    

router.delete('/api/activity/:id', (req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  const { id } = req.params
})

module.exports = router;