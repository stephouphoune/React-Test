const express = require('express');
const router = express.Router();
const executeQuery = require('../services/executeQuery')

const createTask = rawTask => ({
  id: rawTask.task_id,
  name: rawTask.name,
  description: rawTask.description,
  projectId: rawTask.project_id,
  isDiverse: rawTask.isDiverse,
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

router.post('/api/task', (req, res) => {
  if (!req.user || !req.user.isAdmin) {
      res.status(401)
      return res.end()
  }
  try {
    const data = req.body
    executeQuery(`INSERT INTO task VALUES (NULL, '${data.name}','', '${data.projectId}',0 , 1, 0)`, (err, result) => {
        if (err) {
            res.status(500);
            res.end()
            console.log(err)
            return;
        }
        
        res.send(JSON.stringify({ result }))
        res.end()
    })
  }
  catch(e) {
    res.status(500);
    res.end();
    console.log(e)
  }
});

router.put('/api/task/:id', (req, res) => {
  try {
      const data = req.body
      const taskId = req.params.id
      executeQuery(`UPDATE task SET name='${data.name}' WHERE task_id='${taskId}'`, (err, result) => {
          if (err) {
              res.status(500);
              res.end()
              console.log(err)
              return;
          }
          const newTask = {
              id: parseInt(taskId, 10),
              name: data.name
          }
          
          res.send(JSON.stringify({ task: newTask }))
          res.end()
      })
  }
  catch(e) {
      res.status(500);
      res.end();
      console.log(e)
    }
  
});

router.delete('/api/task/:id', (req, res) => {
  //Route qui décrit un paramètre d'entrée (c'est du routing)
  const { id } = req.params
})

module.exports = router;