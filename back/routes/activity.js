const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')
const entityManager = require('../services/entityManager')
const asyncHandler = require('../services/asyncHandler')

const createActivity = rawActivity => ({
  id:rawActivity.activity_id,
  name:rawActivity.name,
  isVisible:rawActivity.isVisible,
})

const createActivities = rawActivities => rawActivities.map(createActivity)

/* GET Activity */
router.get('/api/activity', (req, res) => {
    try {
        executeQuery(`SELECT * FROM activity WHERE isDeleted='0'`, (err,rows) => {
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

router.post('/api/activity', (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        res.status(401)
        return res.end()
    }
    try {
      const data = req.body
      executeQuery(`INSERT INTO activity VALUES (NULL, '${data.name}' , 1, 0)`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          const newActivity = {
              name:data.name,
              id:result.insertId
          }
          
          res.send(JSON.stringify({ activity: newActivity }))
          res.end()
      })
  }
  catch(e) {
      res.status(500);
      res.end();
      console.log(e)
    }
});

router.put('/api/activity/:id', (req, res) => {
    try {
        const data = req.body
        const activityId = req.params.id
        executeQuery(`UPDATE activity SET name='${data.name}' WHERE activity_id='${activityId}'`, (err, result) => {
            if (err) {
                res.status(500);
                res.end()
                console.log(err)
                return;
            }
            const newActivity = {
                id: parseInt(activityId, 10),
                name: data.name,
            }
            
            res.send(JSON.stringify({ activity: newActivity }))
            res.end()
        })
    }
    catch(e) {
        res.status(500);
        res.end();
        console.log(e)
      }
    
});


router.delete('/api/activity/:id', asyncHandler(async(req, res) => {
    //Route qui décrit un paramètre d'entrée (c'est du routing)
    const { id } = req.params
  
    await entityManager.deleteActivity(id)
    res.end()
}))

router.patch('/api/activity/:id', asyncHandler(async(req, res) => {
    const data = req.body
    const { id } = req.params
  
    await entityManager.setVisibilityActivity(id, data.checked)
    res.end()
  }))

module.exports = router;