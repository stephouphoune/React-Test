const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

const createTask = rawTask => ({
  id: rawTask.task_id,
  name: rawTask.name,
  description: rawTask.description,
  projectId: rawTask.project_id,
})

const createTasks = rawTasks => rawTasks.map(createTask)

router.get('/api/task', (req, res) => {
    try {
        executeQuery('SELECT * FROM task', (err,rows) => {
          if (err) {
            console.log(err)
            res.status(500);
            res.end()
            return;
          }
          if (rows.length === 0) {
            res.status(200);
            res.send(JSON.stringify({tasks:[]}));
            res.end()
            return;
          }
          // JSON.parse peut engendrer un crash (donc try / catch)
          try {
            //Constante contenant le résultat de la requête. J'ai mis [0] parce qu'il n'y a que
            //le premier élément du tableau qui nous intéresse
        
            const rawTasks = JSON.parse(JSON.stringify(rows));
            const tasks = createTasks(rawTasks);
            //Pourquoi mettre des accolades autour de activities ?
            const responseBody = JSON.stringify({tasks})
            res.status(200)
            res.send(responseBody)
            res.end()
            return;
      
           } catch (e) {
            console.log(e)
            res.status(500)
            res.end()
            return;
           }
        });
      }
      catch(e) {
        console.log(e)
        res.status(500);
        res.end();
      }
    
    });

router.delete('/api/task/:id', (req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  const { id } = req.params
})

module.exports = router;